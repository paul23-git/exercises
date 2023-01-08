import {HTTPStatusError} from "./FetchError";
import {KeyError} from "./KeyError";
import {IDictionaryStore} from "../interfaces/IDictionaryStore";
import {strf} from "../util/string-format";

export function buildErrorText(err: Error, what: string, dictionaryStore: IDictionaryStore, language: string): string {
    // if (err.status === 403 || err.status === 401) {
    //     return `Not enough rights updating ${what}`;
    // } else if (err.status === 409) {
    //     try {
    //         const detail = JSON.parse(err.response);
    //         return`Error updating ${what}, ${detail.message}`;
    //     } catch (err) {
    //         throw new KeyError('JSON return in error code invalid', {internalError: err});
    //     }
    // } else if (err.status >= 400 && err.status < 500) {
    //     return `Error updating ${what}`;
    // } else if (err.status >= 500 && err.status < 600) {
    //     return `Server error, while updating ${what}. Try again later.`;
    // } else {
    //     throw err;
    // }

    if (err instanceof HTTPStatusError) {
        if (err.status === 403 || err.status === 401) {
            return strf(
                dictionaryStore.get(language, 'err-update-rights', 'Not enough rights updating {0}'),
                what);
        } else if (err.status === 409) {
            try {
                const detail = JSON.parse(err.response);
                return strf(
                    dictionaryStore.get(language, 'err-update-generic', 'Error updating {0}'),
                    `${what}, ${detail.message}`);
            } catch (err) {
                throw new KeyError('JSON return in error code invalid', {internalError: err});
            }
        } else if (err.status >= 400 && err.status < 500) {
            return strf(
                dictionaryStore.get(language, 'err-update-generic', 'Error updating {0}'),
                `${what}`);
        } else if (err.status >= 500 && err.status < 600) {
            return strf(
                dictionaryStore.get(language, 'err-update-generic', 'Server error, while updating {0}. Try again later.'),
                `${what}`);
        } else {
            throw err;
        }
    } else {
        return strf(
            dictionaryStore.get(language, 'err-update-generic', 'Error updating {0}'),
            `${what}`);
    }
}
