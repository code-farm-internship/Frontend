// store/cart.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { ICartItems } from '@/types/cart';

export interface ICartState {
    isOpen: boolean;
    cartQuantity: number;
    items: ICartItems[];
    toggleCart: () => void;
    setCartQuantity: (quantity: number) => void;
}

export const useCartStore = create<ICartState>()(
    devtools(
        immer((set) => ({
            isOpen: false,
            cartQuantity: 0,
            items: [],
            toggleCart: () => {
                set((state) => {
                    state.isOpen = !state.isOpen;
                });
            },
            setCartQuantity: (quantity) => {
                set((state) => {
                    state.cartQuantity = quantity;
                });
            },
        })),
        { name: 'CartStore' },
    ),
);
