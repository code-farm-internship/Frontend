import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { combine } from 'zustand/middleware';
import { ICartItems } from '@/types/cart';

interface ICartStore {
    isOpen: boolean;
    items: ICartItems[];
    cartQuantity: number;
    setToggleCart: () => void;
    setCartQuantity: (quantity: number) => void;
}

export const useCartStore = create<ICartStore>()(
    devtools(
        immer(
            combine({ isOpen: false, cartQuantity: 0, items: [] as ICartItems[] }, (set) => ({
                setToggleCart: () => {
                    set(
                        (state) => {
                            state.isOpen = !state.isOpen;
                        },
                        false,
                        { type: 'setToggleCart' },
                    );
                },
                setCartQuantity: (quantity: number) => {
                    set((state) => {
                        state.cartQuantity = quantity;
                    });
                },
            })),
        ),
        { name: 'CartStore' },
    ),
);
