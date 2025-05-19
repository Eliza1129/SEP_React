import { useMemo } from "react"

function useTimestamp() {
    return useMemo(() => new Date().toLocaleTimeString(), []);
}
export default useTimestamp;