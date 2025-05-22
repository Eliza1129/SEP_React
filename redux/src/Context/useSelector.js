import {useContext, useEffect, useState} from 'react';
import {StoreContext} from "./StoreContext.jsx";


function useSelector(selectorFn) {
    const store = useContext(StoreContext);
    const [selectedState, setSelectedState] = useState(() => selectorFn(store.getState()));

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const newSelected = selectorFn(store.getState());
            setSelectedState(newSelected);
        });

        return unsubscribe;
    }, [store]);

    return selectedState;
}

export default useSelector;


