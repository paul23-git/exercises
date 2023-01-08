export interface IDictionaryStore {
    loadedLanguageDict: Map<string, Map<string, string>>;
    currentlyLoading: string;
    mappedLanguages: Map<string, string|null>;
    languageList: Map<string, string>|undefined;
    showDebug: boolean;
    showDebugForced: boolean;
    showDebugDisplay: boolean;
    readonly group: string;

    loadLanguage(key: string): Promise<string|undefined>;
    hasLanguage(key: string): boolean;
    get(languageKey: string, key: string, def?: string): string;
    getFullLanguage(languageKey: string): void|(Map<string, string>);

}
