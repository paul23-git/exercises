import {ValueError} from "./ValueError";

export class TypeError extends ValueError{
    constructor(msg?:string|undefined, cause?:string|undefined) {
        super(msg, cause);
    }
}
