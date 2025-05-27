import { useEffect, useState } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
    });

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;
