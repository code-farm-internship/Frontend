import { IUserInfo } from '@/types/user';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface IUserState {
    isAuthenticate: boolean;
    user: IUserInfo;
    setAuthenicate: (isAuth: boolean) => void;
    setUserInfo: (userData: IUserInfo) => void;
    clearUserData: () => void;
}

const initialUserInfo = {
    avatar: '',
    email: '',
    username: '',
};

export const useUserStore = create<IUserState>()(
    devtools(
        persist(
            immer((set) => ({
                isAuthenticate: false,
                user: initialUserInfo,
                setAuthenicate: (isAuth) => {
                    set((state) => {
                        state.isAuthenticate = isAuth;
                    });
                },
                setUserInfo: (userData) => {
                    set((state) => {
                        state.user = userData;
                    });
                },
                clearUserData: () => {
                    set((state) => {
                        state.isAuthenticate = false;
                        state.user = initialUserInfo;
                    });
                },
            })),
            { name: 'userStore' },
        ),
        { name: 'userDevtool' },
    ),
);
