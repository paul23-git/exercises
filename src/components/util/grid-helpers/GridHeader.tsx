import {observer} from "mobx-react-lite";
import * as React from "react";
import {StyledHeaderCell} from "./styles";


export type HeaderMetaType = {id: string|number, node: React.ReactNode};

type PropTy = {
    styledHeaderCell?: React.ElementType,
    cells: HeaderMetaType[],
};

export const GridHeader = observer(function (props: PropTy) {
    const {cells, styledHeaderCell:TheCell=StyledHeaderCell} = props;
    return <>
        {cells.map((c) => (
            <TheCell key={c.id}>
                {c.node}
            </TheCell>
        ))}
    </>
});