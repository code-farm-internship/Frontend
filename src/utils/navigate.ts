let navigateFn: (to: string) => void;

export const setNavigate = (navigate: (to: string) => void) => {
    navigateFn = navigate;
};

export const navigate = (to: string) => {
    if (typeof navigateFn === 'function') {
        navigateFn(to);
    } else {
        console.warn('Navigate function not set yet!');
    }
};
