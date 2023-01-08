import {IDictionaryStore} from "./IDictionaryStore";

export interface IDictionaryManager {
    showDebug: boolean;
    showDebugForced: boolean;
    showDebugDisplay: boolean;

    loadLanguage(key: string): Promise<void>;
    loadLangList(): Promise<void>;
    getLanguageList(): undefined|Map<string, string>;
    getLanguageName(key: string): string|undefined;
    addDictionaryGroup(group: string): IDictionaryStore;
    getDictionary(group: string): IDictionaryStore|void;

}
