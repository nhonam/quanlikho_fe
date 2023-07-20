import i18next from 'i18next'
import { useRef, useState, useEffect, useCallback } from 'react'

const TimingFunction = () => {
    const [dates, setDates] = useState("")
    const _isMounted = useRef(false);

    const tick = useCallback(() => {
        const date = new Date()
        if (date.getDay() !== dates) {
            setDates(`${date.toLocaleDateString(i18next.language, { weekday: "long", day: 'numeric', month: 'numeric', year: "numeric" })}`);
        }
    }, [dates])

    useEffect(() => {
        let timeId
        _isMounted.current = true;

        if (_isMounted.current) {
            timeId = setInterval(tick, 1000)
        }

        return () => {
            clearInterval(timeId)
            _isMounted.current = false
        }
    }, [tick])

    return <span>{dates}</span>
}

export default TimingFunction