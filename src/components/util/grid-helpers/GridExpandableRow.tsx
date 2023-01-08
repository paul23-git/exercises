import * as React from "react";
import {observer} from "mobx-react-lite";
import {StyledGridMainCell, StyledGridRowSpanner, StyledGridRowWrapper} from "./styles";
import {HeaderMetaType} from "./GridHeader";


type PropTy = {
    styledGridMainCell?: React.ElementType,
    cells: HeaderMetaType[],
    open: boolean,
    setOpen: (open: boolean) => unknown,
    expand?: React.ReactNode,
}

export const GridExpandableRow = observer(function (props: PropTy) {
    const {cells, styledGridMainCell:TheCell=StyledGridMainCell, open, expand, setOpen} = props;
    //const [open, setOpen] = React.useState(false);

    return <>
        <StyledGridRowWrapper onClick={(e) => {setOpen(!open)}}>
            {cells.map((c) => (
                <TheCell key={c.id}>
                    {c.node}
                </TheCell>
            ))}
        </StyledGridRowWrapper>
        {open && expand &&
            <StyledGridRowSpanner>
                {expand}
            </StyledGridRowSpanner>
        }

    </>
});