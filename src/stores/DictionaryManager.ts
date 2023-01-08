// @flow

import {observable, computed, makeObservable, action} from "mobx";
import {DictionaryStore} from "./DictionaryStore";
import {IDictionaryStore} from "../interfaces/IDictionaryStore";
import {IFetcherBase} from "../interfaces/IFetcherBase";
import {IDictionaryManager} from "../interfaces/IDictionaryManager";
const BASE_URL = process.env.REACT_APP_DYNAMIC_PATH || '';

export class DictionaryManager implements IDictionaryManager{
    loadedLanguageDict: Map<string, Map<string, string>> = observable.map(new Map(), {deep: false});
    languageList: undefined|Map<string, string> = undefined;
    allDictionaries: Map<string, IDictionaryStore> = observable.map(new Map());
    static get_lang_list: string = '/dictionary/language-list';
    conn: IFetcherBase;

    constructor(conn: IFetcherBase) {
        this.conn = conn;
        makeObservable(this, {
            showDebug: computed,
            showDebugForced: computed,
            showDebugDisplay: computed,
            allDictionaries: observable,
            addDictionaryGroup: action,
        })
    }
    get showDebug(): boolean {
        // $FlowFixMe
        return this.allDictionaries.size > 0 && this.allDictionaries.values().next().value.showDebug;
    }
    set showDebug(v: boolean) {
        for (const d of this.allDictionaries.values()) {
            d.showDebug = v;
        }
    }
    get showDebugForced(): boolean {
        // $FlowFixMe
        return this.allDictionaries.size > 0 && this.allDictionaries.values().next().value.showDebugForced;
    }
    set showDebugForced(v: boolean) {
        for (const d of this.allDictionaries.values()) {
            d.showDebugForced = v;
        }
    }
    get showDebugDisplay(): boolean {
        // $FlowFixMe
        return this.allDictionaries.size > 0 && this.allDictionaries.values().next().value.showDebugDisplay;
    }
    set showDebugDisplay(v: boolean) {
        for (const d of this.allDictionaries.values()) {
            d.showDebugDisplay = v;
        }
    }

    addDictionaryGroup(group: string): IDictionaryStore {
        const o = this.allDictionaries.get(group);
        if (o === undefined) {
            const n = new DictionaryStore(this.conn, group);
            this.allDictionaries.set(group, n);
            return n;
        } else {
            return o;
        }
    }

    async loadLanguage(key: string) {
        const p: Array<Promise<unknown>> = [];
        for (const d of this.allDictionaries.values()) {
            if (!d.hasLanguage(key)) {
                p.push(d.loadLanguage(key));
            }
        }
        await Promise.all(p);
    }

    getDictionary(group: string): IDictionaryStore | void {
        return this.allDictionaries.get(group);
    }

    async loadLangList() {
        const lanList = await this.conn.fetchData(
            BASE_URL + DictionaryManager.get_lang_list,
            {method: 'Get',}
        );
        if (lanList && typeof lanList === 'object' && !Array.isArray(lanList)) {
            this.languageList = observable.map(lanList);
        }
    }

    getLanguageList(): undefined|Map<string, string> {
        return this.languageList;
    }

    getLanguageName(key: string): string|undefined {
        return this.languageList ? this.languageList.get(key) : undefined;
    }
}
