import {makeObservable, observable} from "mobx";
import {IDictionaryStore} from "../interfaces/IDictionaryStore";
import {IFetcherBase} from "../interfaces/IFetcherBase";

const BASE_URL = process.env.REACT_APP_DYNAMIC_PATH || '';

export class DictionaryStore implements IDictionaryStore {
    loadedLanguageDict: Map<string, Map<string, string>> = observable.map(new Map(), {deep: false});
    currentlyLoading: string = '';
    mappedLanguages: Map<string, string|null> = observable.map(new Map(), {deep: false});
    showDebug: boolean = false;
    languageList = undefined;
    showDebugForced: boolean = false;
    showDebugDisplay: boolean = false;
    mygroup: string;

    get group() {
        return this.mygroup;
    }

    static dictionary_url = '/dictionary';
    conn: IFetcherBase;

    constructor(conn: IFetcherBase, group: string) {
        this.conn = conn;
        this.mygroup = group;
        makeObservable(this, {
            loadedLanguageDict: observable,
            languageList: observable,
            currentlyLoading: observable,
            mappedLanguages: observable,
            showDebug: observable,
            showDebugForced: observable,
            showDebugDisplay: observable,
        });
    }

    transformLanguageData(data: {[key: string]: any}) {
        const dict = new Map<string, string>();
        for (const [key, val] of Object.entries(data)) {
            if (typeof val === 'string') {
                dict.set(key, val);
            }
        }
        return dict;
    }

    async loadLanguage(key: string): Promise<string|undefined> {
        if (!this.currentlyLoading) {
            this.currentlyLoading = key;
            try {
                const url = BASE_URL + DictionaryStore.dictionary_url + '/' + key;
                const languageData = await this.conn.fetchData(
                    url,
                    {
                        method: 'GET',
                        query: {
                            group: this.group,
                        }
                    }
                );
                this.mappedLanguages.set(key, null);
                if (typeof languageData === 'object' && languageData && !Array.isArray(languageData)) {
                    const {language, dictionary} = languageData;
                    if (typeof language === 'string' && typeof dictionary === 'object' && dictionary && !Array.isArray(dictionary)) {
                        const langMap = this.transformLanguageData(dictionary);
                        this.loadedLanguageDict.set(language, langMap);
                        this.mappedLanguages.set(key, language);
                        return language;
                        //return language;
                    }
                }
            } catch (err) {
                console.log(err);
            } finally {
                this.currentlyLoading = '';
            }
        }
    }

    hasLanguage(key: string): boolean {
        const k = this.mappedLanguages.get(key);
        if (!k) {
            return false;
        }
        return !!this.loadedLanguageDict.get(k ? k : key);
    }

    get(languageKey: string, key: string, def: string = ""): string {
        if (this.showDebug) {
            return `[${this.group}] ${key}`;
        }
        const langMap: Map<string, string>|undefined = this.loadedLanguageDict.get(languageKey);
        if (!langMap) {
            return def;
        } else {
            return langMap.get(key) || def;
        }
    }

    getFullLanguage(languageKey: string): void|(Map<string, string>) {
        const k = this.mappedLanguages.get(languageKey);
        if (!k) {
            return undefined;
        }
        return this.loadedLanguageDict.get(k ? k : languageKey);
    }

}
