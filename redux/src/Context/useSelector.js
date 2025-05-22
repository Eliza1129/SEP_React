import {useContext, useEffect, useState, useRef} from 'react';
import {StoreContext} from "./StoreContext.jsx";


const useSelector = (selectorFn) => {
    const store = useContext(StoreContext);

    if (!store || typeof store.getState !== "function") {
        throw new Error("useSelector must be used inside a <StoreProvider>");
    }
    const [selectedState, setSelectedState] = useState(() => selectorFn(store.getState()));
    const latestSelectedRef = useRef(selectedState);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const newSelected = selectorFn(store.getState());
            if(newSelected !== latestSelectedRef.current) {
                latestSelectedRef.current = newSelected;
                setSelectedState(newSelected);
            }
        });

        return unsubscribe;
    }, [store]);

    return selectedState;
}

export default useSelector;


