import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import {LocalEditComponent} from "../LocalEditComponent";
import { StreetAddressElement } from "./StreetAddressElement";
import { ChangeCountryElement } from "./ChangeCountryElement";


type PropTy = {
    onChange: ((key: string, e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, value: string) => void),
    onBlur?: ((key: string, e: React.FocusEvent<HTMLElement>) => Promise<void>),
    zipcode: string,
    address: string,
    house_number: string,
    house_number_suffix: string,
    municipality: string,
    country: string,
}

export const FullAddress = observer(function ({
                                                  onChange,
                                                  onBlur,
                                                  zipcode,
                                                  address,
                                                  house_number,
                                                  house_number_suffix,
                                                  municipality,
                                                  country,
                                              }: PropTy) {
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    return <>
        <LocalEditComponent
            name={'zipcode'}
            label={dictionaryStore.get(language, 'cust-zipcode', 'Zipcode')}
            inputProps={{
                name: 'postal',
                autoComplete: 'postal-code',
            }}
            value={zipcode}
            onChange={onChange}
            onBlur={onBlur}
        />
        <StreetAddressElement
            onChange={onChange}
            onBlur={onBlur}
            address={address}
            house_number={house_number}
            house_number_suffix={house_number_suffix}
        />
        <LocalEditComponent
            name={'municipality'}
            label={dictionaryStore.get(language, 'cust-municipality', 'municipality')}
            inputProps={{
                name: 'municipality',
                autoComplete: 'address-level2',
            }}
            value={municipality}
            onChange={onChange}
            onBlur={onBlur}
        />
        <ChangeCountryElement
            value={country}
            onChange={onChange}
            onBlur={onBlur}
            label={dictionaryStore.get(language, 'cust-country', 'Country')}
        />
    </>
});