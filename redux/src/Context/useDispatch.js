import { useContext } from "react";
import {StoreContext} from "./StoreContext.jsx"

const useDispatch = () => {
    const store = useContext(StoreContext);
    return store.dispatch;
};

export default useDispatch;