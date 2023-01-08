// @flow
import {IOError} from "./IOError";

export type CredentialsType = 'omit' | 'same-origin' | 'include';
export type ProtoFetchOptions = {
    method?: string,
    credentials?: CredentialsType,
    body?: Readonly<FormData | {[key: string]: string|undefined|null}>,
    query?: {[key: string]: string},
}
export class HTTPStatusError extends IOError {
    request: {url: URL, options: ProtoFetchOptions};
    response: string;
    status: number;
    constructor(request: {url: URL, options: ProtoFetchOptions, responseBlob?: Blob}, response: string, status: number) {
        super(`Erroneous status (${status}) while processing request (${request.url.toString()})`);
        this.request = request;
        this.response = response;
        this.status = status;
    }
}
