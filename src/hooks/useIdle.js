import { useState, useEffect } from 'react';
import { throttle } from 'throttle-debounce';

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
const oneMinute = 60e3;

const useIdle = (ms = oneMinute, initialState, events = defaultEvents) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        let mounted = true, timeout, localState = state;
        const set = (newState) => {
            if (mounted) {
                localState = newState;
                setState(newState);
            }
        };

        const onEvent = throttle(50, () => {
            if (localState) {
                set(false);
            }

            clearTimeout(timeout);
            timeout = setTimeout(() => set(true), ms);
        });
        const onVisibility = () => {
            if (!document.hidden) onEvent();
        };

        for (let i = 0; i < events.length; i++) {
            window.addEventListener(events[i], onEvent);
        }
        document.addEventListener('visibilitychange', onVisibility);
        timeout = setTimeout(() => set(true), ms);

        return () => {
            mounted = false;

            for (let i = 0; i < events.length; i++) {
                window.removeEventListener(events[i], onEvent);
            }
            document.removeEventListener('visibilitychange', onVisibility);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events, ms]);

    return state;
};

export default useIdle;