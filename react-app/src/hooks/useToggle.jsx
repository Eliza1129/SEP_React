import { useState } from "react";

function useToggle(initial = false) {
    const [isToggled, setIsToggled] = useState(initial);
    const toggle = () => setIsToggled((prev) => !prev);
    return [isToggled, toggle];
}
export default useToggle;