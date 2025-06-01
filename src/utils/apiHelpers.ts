export const setAccessToken = (token: string) => {
    window.localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
    return window.localStorage.getItem('accessToken') || '';
};
