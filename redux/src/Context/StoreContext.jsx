import React, {createContext, useContext} from "react";

const StoreContext = createContext(null);

const StoreProvider = ({ store, children }) => (
    <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>
);

export {StoreContext, StoreProvider};