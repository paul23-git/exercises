import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {GridRenderCellParams} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {styled, Typography} from "@mui/material";


type PropTy = {}


const StyledFlexBox = styled('div')(({ theme }) => `
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`);
const StyledUrlDiv = styled('div')(({ theme }) => `
  flex: 1 1 100px;
`);

const StyledUrlTypography = styled(Typography)(({ theme }) => `
  flex: 1 1 100px;
  width: 20px;
`);
const StyledIconDiv = styled('div')(({ theme }) => `
  flex: 0 0 40px;
`);
const StyledParagraph = styled('p')(({ theme }) => `
  flex: 1 1 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`);
export const CopyableCell = observer(function CopyableCell(props: {value: string}) {
    const v = props.value;
    function setClipboard(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (v) {
            navigator.clipboard.writeText(v).then(()=>{});
        }
    }
    return <><StyledFlexBox>
        <><StyledUrlTypography noWrap={true}>{v}</StyledUrlTypography></>
        <StyledIconDiv><IconButton onClick={e => setClipboard(e)}>
            <ContentCopyIcon/>
        </IconButton></StyledIconDiv>
    </StyledFlexBox></>
});