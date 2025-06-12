// store/cart.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';
import { ICartItems } from '@/types/cart';

export interface ICartState {
    isOpen: boolean;
    cartQuantity: number;
    items: ICartItems[];
    isSelectedAll: boolean;
    isLoading: boolean;
    toggleCart: () => void;
    setCartItems: (items: ICartItems[]) => void;
    setSelected: (variantId: string) => void;
    setSelectedAll: () => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const useCartStore = create<ICartState>()(
    devtools(
        persist(
            immer((set, get) => ({
                isOpen: false,
                cartQuantity: 0,
                items: [],
                isSelectedAll: false,
                isLoading: false,
                toggleCart: () => {
                    set((state) => {
                        state.isOpen = !state.isOpen;
                    });
                },
                setCartItems(items) {
                    set((state) => {
                        const newCart = items.map((currItem) => {
                            const isSeleted = state.items.some(
                                (prevItem) => prevItem.variantId._id === currItem.variantId._id && prevItem.isSelected,
                            );
                            return {
                                ...currItem,
                                isSelected: isSeleted,
                            };
                        });
                        state.isSelectedAll = !newCart.length ? false : state.isSelectedAll;
                        state.items = newCart;
                        state.isLoading = false;
                    });
                },
                setIsLoading(isLoading) {
                    set((state) => {
                        state.isLoading = isLoading;
                    });
                },
                setSelected(variantId) {
                    set(
                        (state) => {
                            let isSelectedAll = true;
                            const newCart = state.items.map((item) => {
                                if (item.variantId._id === variantId) {
                                    return {
                                        ...item,
                                        isSelected: !item.isSelected,
                                    };
                                }
                                if (!item.isSelected) {
                                    isSelectedAll = false;
                                }
                                return item;
                            });

                            newCart.forEach((cartItem) => {
                                if (!cartItem.isSelected) {
                                    isSelectedAll = false;
                                }
                            });

                            state.items = newCart;
                            state.isSelectedAll = isSelectedAll;
                        },
                        false,
                        'cart/setSelected',
                    );
                },
                setSelectedAll() {
                    set(
                        (state) => {
                            const newCart = state.items.map((item) => {
                                if (state.isSelectedAll) {
                                    return {
                                        ...item,
                                        isSelected: false,
                                    };
                                }
                                if (!item.isSelected) {
                                    return {
                                        ...item,
                                        isSelected: true,
                                    };
                                }
                                return item;
                            });

                            state.items = newCart;
                            state.isSelectedAll = !state.isSelectedAll;
                        },
                        false,
                        'cart/setSelectedAll',
                    );
                },
            })),
            { name: 'cartStore' },
        ),
        { name: 'CartDevtool' },
    ),
);
