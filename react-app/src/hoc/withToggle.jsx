import { useState } from "react";

const withToggle = (WrappedComponent) => {
    return function WithToggle(props) {
        const [isToggled, setIsToggled] = useState(false)
        const toggle = () => setIsTpggled((prev) => !prev);
        return (
            <>
               <button onClick={toggle}>Toggle Component</button>
               {isToggled && <WrappedComponent {...props} />}
            </>
        );
    };
};
export default withToggle;