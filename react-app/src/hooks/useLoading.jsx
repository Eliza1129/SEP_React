import { useState } from "react";

function useLoading(initial = false) {
    const [isLoading, setIsLoading] = useState(initial);
    return [isLoading, setIsLoading];
}

export default useLoading;