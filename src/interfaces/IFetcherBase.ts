export type ProtoFetchOptions = {
    method?: string,
    credentials?: RequestCredentials,
    body?: Readonly<FormData | Record<string, string|null|undefined>>,
    query?: Record<string, string>,
}

export interface IFetcherBase {
    fetchData(base_url: string, options: Readonly<ProtoFetchOptions>): Promise<{[p: string]: any}|any[]>;
    fetchImageData(base_url: string, options: Readonly<ProtoFetchOptions>): Promise<Blob>;
}
