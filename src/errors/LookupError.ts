export class LookupError extends Error{
    string_cause: unknown;
    constructor(msg?:string|undefined, cause?:unknown|undefined) {
        super(msg);
        this.string_cause = cause;
    }
}
