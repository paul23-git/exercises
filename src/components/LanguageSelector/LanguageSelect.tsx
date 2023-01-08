// @flow

import * as React from "react";
import {observer} from "mobx-react-lite";
import {SyntheticEvent} from "react";
import {DictionaryManagerCtx} from "../../stores/DictionaryManagerCtx";
import {Input, Popover, styled} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {LanguageSelectPaper} from "./LanguageSelectPaper";



const StyledInput = styled(Input)({
    '&:focus-within': {
        '&:after': {
            transform: 'scaleX(1)',
        }
    },
})
const Styledinput = styled('input')(({ theme }) => ({
    left: 0,
    bottom: 0,
    opacity: 0,
    width: '100%',
    position: 'absolute',
    pointerEvents: 'none',
}));
const StyledSelectDiv = styled('div')(({ theme }) => ({
    fontSize: '0.75rem',
    paddingRight: theme.spacing(1.5),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    minWidth: theme.spacing(3),
    paddingTop: 6,
    paddingBottom: 7,
    userSelect: 'none',
    minHeight: 'calc(0.75 * 1.1876em)',
    borderRadius: 0,
    border: 0,
    margin: 0,
    display: 'block',
    background: 'none',
    boxSizing: 'content-box',
    '-webkit-tap-highlight-color': 'transparent',
    '&:focus': {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 0,
        outline: 0,
    },
    //color: theme.palette.getContrastText(theme.palette.primary.main),
}));
const StyledSelectAdornment = styled(ArrowDropDownIcon)(({ theme }) => ({
    top: 'calc(50% - 12px)',
    //color: theme.palette.getContrastText(theme.palette.primary.main),
    right: 0,
    position: 'absolute',
    pointerEvents: 'none',
    width: '0.75em'
}));

// const styles = (theme: ThemeTy) => ({
//     root: {
//         '&:focus-within': {
//             '&:after': {
//                 transform: 'scaleX(1)',
//             }
//         },
//     },
//     rootLight: {
//         color: theme.palette.getContrastText(theme.palette.primary.main),
//
//     },
//     input: {
//         left: 0,
//         bottom: 0,
//         opamunicipality: 0,
//         width: '100%',
//         position: 'absolute',
//         pointerEvents: 'none',
//     },
//     selectDiv: {
//         fontSize: '0.75rem',
//         paddingRight: theme.spacing(1.5),
//         whiteSpace: 'nowrap',
//         textOverflow: 'ellipsis',
//         cursor: 'pointer',
//         minWidth: theme.spacing(3),
//         paddingTop: 6,
//         paddingBottom: 7,
//         userSelect: 'none',
//         minHeight: 'calc(0.75 * 1.1876em)',
//         borderRadius: 0,
//         border: 0,
//         margin: 0,
//         display: 'block',
//         background: 'none',
//         boxSizing: 'content-box',
//         '-webkit-tap-highlight-color': 'transparent',
//         '&:focus': {
//             backgroundColor: 'rgba(0,0,0,0.05)',
//             borderRadius: 0,
//             outline: 0,
//         },
//         //color: theme.palette.getContrastText(theme.palette.primary.main),
//     },
//     selectAdornment: {
//         top: 'calc(50% - 12px)',
//         //color: theme.palette.getContrastText(theme.palette.primary.main),
//         right: 0,
//         position: 'absolute',
//         pointerEvents: 'none',
//         width: '0.75em'
//     },
//
//     underlineAfterLight: {
//         '&:hover:not(.MuiDisabled):before': {
//             borderBottomColor: theme.palette.getContrastText(theme.palette.primary.main),
//         },
//         '&:before': {
//             borderBottomColor: theme.palette.getContrastText(theme.palette.primary.main),
//         },
//         '&:after': {
//             borderBottomColor: theme.palette.getContrastText(theme.palette.primary.main),
//         }
//     },
//
// });
export type LanguageButtonPropTy = {
    value: string,
    name: string,
    onSelect: (e: SyntheticEvent<HTMLButtonElement>, value: string) => void,
}

type PropTy = {
    value: string,
    onChange: ((event: SyntheticEvent<HTMLButtonElement>, value: string) => void),
    shortDisplay?: boolean,
    contrastMain?: boolean,
}
//const useLocalStyles = makeStyles(styles);


export const LanguageSelect = observer(function LanguageSelect(props: PropTy) {
    const {value, onChange, shortDisplay, contrastMain} = props;
    const [open, setOpen] = React.useState(false);
    const dictionaryManager = React.useContext(DictionaryManagerCtx);
    const inputRef = React.useRef();
    function splitLanguageShortName(locName: string): string[] {
        return locName.split('-');
    }
    const displayValue = !shortDisplay ? (
            dictionaryManager.getLanguageName(value) ||
            (splitLanguageShortName(value)[0]).toUpperCase()) :
        (splitLanguageShortName(value)[0]).toUpperCase();

    return <>
        <StyledInput
            value={displayValue}
            disableUnderline={false}
            readOnly={true}
            inputProps={{
                sx: {
                    left: 0,
                    bottom: 0,
                    opamunicipality: 0,
                    width: '100%',
                    position: 'absolute',
                    pointerEvents: 'none',
                },
                tabIndex: -1,
                style: {cursor: 'pointer'},
                "aria-hidden": true,
            }}
            startAdornment={
                <StyledSelectDiv
                    tabIndex={0}
                    role={"button"}
                    onClick={() => {
                        setOpen(o => !o)
                    }}
                >
                    {displayValue}
                    <StyledSelectAdornment
                        transform={open ? "scale(1,-1)" : "scale(1,1)"}
                    />
                </StyledSelectDiv>
            }
            style={{cursor: 'pointer'}}
            inputRef={inputRef}
        />
        <Popover open={open}
                 anchorEl={inputRef.current}
                 onClose={() => setOpen(false)}
        >
            <LanguageSelectPaper
                onChange={(e: SyntheticEvent<HTMLButtonElement>, v: string) => {
                    if (onChange) {
                        onChange(e, v);
                    }
                    setOpen(false);
                }}
            />
        </Popover>

    </>;
});
