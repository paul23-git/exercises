import * as React from "react";

export type ActionType = "pointer" | "add" | "erase";
export type ContextType = {
    maxWidth: number,
    maxHeight: number,
    canvasScale: number,
    action: ActionType,
    setAction: (newkey: ActionType) => void,
    additionKey: string|null,
    setAdditionKey: (newkey: string|null) => void,
    setDetailView: (newView: [string|number|null, string|number|null]) => void,
    detailView: [string|number|null, string|number|null],
}
export const FieldCtx = React.createContext<ContextType>({
    maxWidth: 0,
    maxHeight: 0,
    canvasScale: 1,
    action:"pointer",
    additionKey: null,
    setAdditionKey: () => {},
    setAction: () => {},
    detailView: ['overview', null],
    setDetailView: () => {},
})