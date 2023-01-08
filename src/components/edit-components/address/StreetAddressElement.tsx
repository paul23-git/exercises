import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import Typography from "@mui/material/Typography";
import {StyledFormLabelDiv} from "../LocalEditComponent";
import {css, styled, TextField, Theme} from "@mui/material";


type PropTy = {
    onChange: ((key: string, e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, value: string) => void),
    onBlur?: ((key: string, e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => Promise<void>),
    address: string,
    house_number: string,
    house_number_suffix: string,
    address_err?: string,
    house_number_err?: string,
    house_number_suffix_err?: string,
}




const StyledAddressForm = styled('div')(({theme}: {theme:Theme}) => css`
  display: flex;
  grid-column-start: auto;
`);
const StyledStreetDiv = styled('div')(({theme}: {theme:Theme}) => css`
  flex: 4 1 auto;
  margin-right: 4ch;
  min-width: 12ch;
  ${theme.breakpoints.down('sm')} {
    margin-right: 2ch;
  }
  ${theme.breakpoints.down('xs')} {
    margin-right: 1ch;
  }
`);
const StyledHouseNumberDiv = styled('div')(({theme}: {theme:Theme}) => css`
  flex: 1 6 auto;
  margin-right: 2ch;
  min-width: 3ch;
  max-width: 10ch;
  ${theme.breakpoints.down('sm')} {
    margin-right: 1ch;
  }
`);
const StyledHouseNumberSuffixDiv = styled('div')(({theme}: {theme:Theme}) => css`
  flex: 1 6 auto;
  min-width: 3ch;
  max-width: 10ch;
`);


export const StreetAddressElement = observer(function (props: PropTy) {
    const {onChange, onBlur, address, house_number, house_number_suffix,
        address_err, house_number_err, house_number_suffix_err} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    return <>
        <StyledFormLabelDiv><Typography>{dictionaryStore.get(language, 'acc-address', "Address")}</Typography></StyledFormLabelDiv>
        <StyledAddressForm>
            <StyledStreetDiv>
                <TextField
                    variant={"standard"}
                    label={dictionaryStore.get(language, 'acc-address', "Street")}
                    name={'street'}
                    type={'text'}
                    autoComplete={'street-address'}
                    id={'street'}
                    onChange={(e) => {
                        const t: HTMLInputElement|HTMLTextAreaElement = e.target;
                        onChange('address', e, t.value)
                    }}
                    onBlur={onBlur ? (e) => onBlur('address', e) : undefined}
                    value={address || ''}
                    error={!!address_err}
                    fullWidth
                />
            </StyledStreetDiv>
            <StyledHouseNumberDiv>
                <TextField
                    variant={"standard"}
                    label={dictionaryStore.get(language, 'acc-house-number', "Number")}
                    name={'house-number'}
                    type={'text'}
                    autoComplete={'house-number'}
                    id={'house-number'}
                    onChange={(e) => {
                        const t: HTMLInputElement|HTMLTextAreaElement = e.target;
                        onChange('house_number', e, t.value)
                    }}
                    onBlur={onBlur ? (e) => onBlur('house_number', e) : undefined}
                    value={house_number || ''}
                    error={!!house_number_err}
                    fullWidth
                />
            </StyledHouseNumberDiv>
            <StyledHouseNumberSuffixDiv>
                <TextField
                    variant={"standard"}
                    label={dictionaryStore.get(language, 'acc-house-number-suffix', "Suffix")}
                    name={'hhouse-suffix'}
                    type={'text'}
                    autoComplete={'house-number-suffix'}
                    id={'house-suffix'}
                    onChange={(e) => {
                        const t: HTMLInputElement|HTMLTextAreaElement = e.target;
                        onChange('house_number_suffix', e, t.value)
                    }}
                    onBlur={onBlur ? (e) => onBlur('house_number_suffix', e) : undefined}
                    value={house_number_suffix || ''}
                    error={!!house_number_suffix_err}
                    fullWidth
                />
            </StyledHouseNumberSuffixDiv>
        </StyledAddressForm>
    </>
});
