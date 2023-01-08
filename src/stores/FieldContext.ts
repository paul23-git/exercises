import * as React from "react";

export type ActionType = "pointer" | "add" | "erase";
export type ContextType = {
    maxWidth: number,
    maxHeight: number,
    canvasScale: number,
    action: ActionType,
}
export const FieldCtx = React.createContext<ContextType>({
    maxWidth: 0,
    maxHeight: 0,
    canvasScale: 1,
    action:"pointer",
})