import { useState, useEffect } from "react";

export default function useDebounce(initial, delay = 1000) {
    const [value, setValue] = useState(initial);
    const [valueDelay, setValueDelay] = useState(initial);

    useEffect(() => {
        const delayFn = setTimeout(() => setValue(valueDelay), delay);
        return () => clearTimeout(delayFn);
    }, [valueDelay, delay]);

    return [value, setValueDelay];
}