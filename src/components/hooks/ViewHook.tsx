
import * as React from 'react';
import {PopupState, usePopupState} from "material-ui-popup-state/hooks";
import {nullOrUndefined} from "../../util/NullOrUndefined";

export type ErrHandlerFun<T> = (err: Error, key?: T|undefined) => string|undefined|null;
export type WrappedHandlerFun<T> = (err: Error,elem: HTMLElement|undefined|null,key?: T|undefined) => string|undefined|null;


export function useHandleErrors<T>(handleErrors: ErrHandlerFun<T>): [(err: Error, elem: HTMLElement|undefined|null, key?: T|undefined) => string|undefined|null, string, PopupState] {
    const [errorPopAnchorEl, setErrorPopAnchorEl] = React.useState<[HTMLElement|undefined|null, string]>([undefined, '']);
    const popupState: PopupState = usePopupState({variant: 'popper', popupId: 'error-popper'});
    const target = errorPopAnchorEl[0];

    React.useEffect(() => {
        if (target && !popupState.isOpen) {
            popupState.open(target);
        } else if (!target && popupState.isOpen) {
            popupState.close();
        }
    }, [target, popupState]);

    React.useEffect(() => {
        if (!popupState.isOpen) {
            setErrorPopAnchorEl([null, ''])
        }
    }, [popupState.isOpen]);

    function wrappedHandleErrors(err: Error,
                                 desiredAnchor: HTMLElement|undefined|null,
                                 key?:T): string|undefined|null {
        const popUpErrorMsg = handleErrors(err, key);
        if (!nullOrUndefined(popUpErrorMsg)) {
            setErrorPopAnchorEl([desiredAnchor, popUpErrorMsg]);
        }
        return popUpErrorMsg;
    }
    return [wrappedHandleErrors, errorPopAnchorEl[1], popupState];
}
