
import {HTTPStatusError, ProtoFetchOptions} from "./FetchError";

export class HTTPStatusErrorOnData extends HTTPStatusError {
    data: {[key: string]: unknown};
    constructor(request: {url: URL, options: ProtoFetchOptions},
                response: string,
                status: number,
                data?: {[key: string]: unknown}|undefined) {
        super(request, response, status);
        this.data = data || {};
    }
}
