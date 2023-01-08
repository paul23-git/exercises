import {IUser} from "../interfaces/IUser";
import {KeyError} from "../errors";



export class User implements IUser {
    id: string;
    verified: boolean = true;
    language: null|string = null;
    username: string;
    constructor(dat: IUser) {
        this.id = dat.id;
        this.verified = !!dat.verified;
        this.language = dat.language;
        this.username = dat.username;
    }
    static buildUser(data: {[p: string]: any}) {
        const id = data.id;
        if (typeof id !== "string") {
            throw new KeyError("Bad parameter, id");
        }
        const username = data.username;
        if (typeof username !== "string") {
            throw new KeyError("Bad parameter, username");
        }
        const verified = true;
        const language = data.langauge || null;
        return new User({id, verified, language, username});
    }

}