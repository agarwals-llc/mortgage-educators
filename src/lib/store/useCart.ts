'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    slug: string;
    title: string;
    category: string;
    hours: number;
    price_cents: number;
    thumbnail_color: string;
}

// Valid promo codes — in production these come from the DB
export const PROMO_CODES: Record<string, { discount: number; type: 'percent' | 'fixed'; label: string }> = {
    EARLYBIRD: { discount: 15, type: 'percent', label: '15% Early Bird Discount' },
    SAVE10: { discount: 10, type: 'percent', label: '10% Off' },
    NEWMLO: { discount: 20, type: 'percent', label: '20% New Student Discount' },
    CE2026: { discount: 25, type: 'fixed', label: '$25 Off 2026 CE' },
    BUNDLE50: { discount: 50, type: 'fixed', label: '$50 Bundle Savings' },
};

interface CartState {
    items: CartItem[];
    promoCode: string | null;
    promoValid: boolean | null;
    drawerOpen: boolean;

    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
    applyPromo: (code: string) => boolean;
    removePromo: () => void;

    // Computed helpers (called as functions)
    subtotalCents: () => number;
    discountCents: () => number;
    totalCents: () => number;
    itemCount: () => number;
    isInCart: (id: string) => boolean;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            promoCode: null,
            promoValid: null,
            drawerOpen: false,

            addItem: (item) => {
                const { items } = get();
                if (items.find((i) => i.id === item.id)) return; // already in cart
                set({ items: [...items, item], drawerOpen: true });
            },

            removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

            clearCart: () => set({ items: [], promoCode: null, promoValid: null }),

            openDrawer: () => set({ drawerOpen: true }),
            closeDrawer: () => set({ drawerOpen: false }),

            applyPromo: (code) => {
                const upper = code.trim().toUpperCase();
                const valid = !!PROMO_CODES[upper];
                set({ promoCode: valid ? upper : code.trim(), promoValid: valid });
                return valid;
            },

            removePromo: () => set({ promoCode: null, promoValid: null }),

            subtotalCents: () => get().items.reduce((sum, i) => sum + i.price_cents, 0),

            discountCents: () => {
                const { promoCode, promoValid } = get();
                if (!promoCode || !promoValid) return 0;
                const promo = PROMO_CODES[promoCode];
                if (!promo) return 0;
                const sub = get().subtotalCents();
                if (promo.type === 'percent') return Math.round(sub * promo.discount / 100);
                return Math.min(promo.discount * 100, sub);
            },

            totalCents: () => Math.max(0, get().subtotalCents() - get().discountCents()),

            itemCount: () => get().items.length,

            isInCart: (id) => !!get().items.find((i) => i.id === id),
        }),
        {
            name: 'me-cart',
            partialize: (s) => ({ items: s.items, promoCode: s.promoCode, promoValid: s.promoValid }),
        }
    )
);
