// @flow

import {HTTPStatusError} from "../errors";
import {FetcherBase} from "./FetcherBase"
import {ProtoFetchOptions} from "../interfaces/IFetcherBase";

export class FetcherUrl extends FetcherBase {
    fetchData = async (base_url: string, options: Readonly<ProtoFetchOptions>): Promise<{[p: string]: any}|any[]> => {
        const outputOptions = FetcherBase.buildOptions(options);
        const url = this.buildUrl(base_url, options);
        const response = await fetch(url.toString(), outputOptions);
        if (response.ok) {
            const content_type = response.headers.get('content-type');
            if (!content_type) {
                return {};
            } else if (content_type.startsWith('application/json')) {
                const txt = await response.text();
                if (txt) {
                    return JSON.parse(txt);
                } else {
                    return {};
                }
            } else {
                throw new HTTPStatusError({url, options: {...options}, responseBlob: await response.blob()},
                    'Bad content type', 415)
            }
        } else {
            throw new HTTPStatusError({url: url, options: {...options}}, await response.text(), response.status)
        }
    };

    fetchImageData = async (base_url: string, options: Readonly<ProtoFetchOptions>): Promise<Blob> => {
        const outputOptions = FetcherBase.buildOptions(options);
        const url = this.buildUrl(base_url, options);
        const response = await fetch(url.toString(), outputOptions);
        if (response.ok) {
            const content_type = response.headers.get('content-type');
            if (content_type && content_type.startsWith('image')) {
                return await response.blob();
            } else {
                throw new HTTPStatusError({url, options: {...options}, responseBlob: await response.blob()},
                    'Bad content type', 415)
            }
        } else {
            throw new HTTPStatusError({url: url, options: {...options}}, await response.text(), response.status)
        }
    };
}
