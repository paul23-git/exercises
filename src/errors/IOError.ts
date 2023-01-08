export class IOError extends Error {
    string_cause: string|undefined;
    constructor(msg?:string|undefined, cause?:string|undefined) {
        super(msg);
        this.string_cause=cause;
    }
}
