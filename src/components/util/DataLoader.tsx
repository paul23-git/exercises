import * as React from "react";

type DataLoaderPropTy = {
    children: React.ReactNode,
    fallback: React.ReactNode,
    onfail: React.ReactNode,
    loadFunction: () => Promise<void>
}

export const DataLoader = function(props: DataLoaderPropTy): JSX.Element {
    const {children, fallback, onfail, loadFunction} = props;
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadSuccess, setLoadSuccess] = React.useState<boolean|null>(null);
    React.useEffect(() => {
        setIsLoading(true);
        loadFunction()
            .then(() => {
                setLoadSuccess(true);
            })
            .catch((e) => {
                setLoadSuccess(false);
                throw e;
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [loadFunction])
    return <>
        {isLoading ? fallback : (loadSuccess ? children : onfail)}
    </>
}