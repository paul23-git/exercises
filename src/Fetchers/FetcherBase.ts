import {ProtoFetchOptions} from "../interfaces/IFetcherBase";
import {IFetcherBase} from "../interfaces/IFetcherBase";



export abstract class FetcherBase implements IFetcherBase {

    static buildFormData(body: Readonly<{[p: string]: string|null|undefined}>): FormData {
        const newbody = new FormData();
        for (const prop in body) {
            if (body.hasOwnProperty(prop)) {
                const dat = body[prop];
                if (dat !== undefined && dat !== null) {
                    newbody.append(prop, dat);
                }
            }
        }
        return newbody;
    }

    static buildOptions(options: Readonly<ProtoFetchOptions>={}): RequestInit {
        /*if (!options) {
            options = {};
        }*/

        const exportOpt: RequestInit = {
            method: options.method || 'GET',
            credentials: options.credentials || (process.env.NODE_ENV === 'production' ? 'same-origin' : 'include')
        };

        const body = options.body;
        if (body && typeof body === 'object') {
            exportOpt.body = (body instanceof FormData) ? body : FetcherBase.buildFormData(body as {[p: string]: string|null|undefined});
        }

        return exportOpt;
    }
    buildUrl(base_url: string, options:Readonly<ProtoFetchOptions>={}): URL {
        const url = new URL(base_url, window.location.href);
        if (options.query) {
            const q = options.query;
            Object.keys(options.query).forEach(key => url.searchParams.append(key, q[key]));
        }
        return url;
    }

    abstract fetchData(base_url: string, options: Readonly<ProtoFetchOptions>): Promise<{[p: string]: any}|any[]>;

    abstract fetchImageData(base_url: string, options: Readonly<ProtoFetchOptions>): Promise<Blob>;
}
