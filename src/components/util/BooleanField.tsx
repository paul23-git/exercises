import * as React from "react";
import {observer} from "mobx-react-lite";
import CheckIcon from "@mui/icons-material/Check";

export const BooleanField = observer(function (props: { value: boolean }) {
    const v = props.value
    return <>
        {v ? <CheckIcon/> : <></>}
    </>
});