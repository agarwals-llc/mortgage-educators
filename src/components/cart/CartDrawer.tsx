'use client';

import Link from 'next/link';
import { X, ShoppingCart, Trash2, BookOpen, ArrowRight, Tag } from 'lucide-react';
import { useCart, PROMO_CODES } from '@/lib/store/useCart';
import { formatCurrency } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export function CartDrawer() {
    const { items, drawerOpen, closeDrawer, removeItem, promoCode, promoValid, applyPromo, removePromo, subtotalCents, discountCents, totalCents } = useCart();
    const [promoInput, setPromoInput] = useState('');
    const [promoError, setPromoError] = useState('');

    const handleApplyPromo = () => {
        if (!promoInput.trim()) return;
        const valid = applyPromo(promoInput);
        if (!valid) setPromoError('Invalid promo code. Try EARLYBIRD, SAVE10, or CE2026.');
        else setPromoError('');
    };

    if (!drawerOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                onClick={closeDrawer}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-2.5">
                        <ShoppingCart size={20} className="text-[#1B3A6B]" />
                        <h2 className="font-bold text-[#0F172A] text-lg">Your Cart</h2>
                        {items.length > 0 && (
                            <span className="w-5 h-5 rounded-full bg-[#1B3A6B] text-white text-xs font-bold flex items-center justify-center">
                                {items.length}
                            </span>
                        )}
                    </div>
                    <button onClick={closeDrawer} className="p-2 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                            <div className="w-16 h-16 bg-[#F1F5F9] rounded-2xl flex items-center justify-center">
                                <ShoppingCart size={28} className="text-[#94A3B8]" />
                            </div>
                            <div>
                                <p className="font-semibold text-[#334155] mb-1">Your cart is empty</p>
                                <p className="text-sm text-[#94A3B8]">Browse our courses and add them here</p>
                            </div>
                            <Link href="/courses" onClick={closeDrawer}>
                                <Button variant="primary" size="sm">Browse Courses</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-3 bg-[#F8F9FC] rounded-xl p-3 border border-[#E2E8F0]">
                                    {/* Color thumbnail */}
                                    <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: `linear-gradient(135deg, ${item.thumbnail_color}, ${item.thumbnail_color}aa)` }}
                                    >
                                        <BookOpen size={18} className="text-white/70" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-[#94A3B8] mb-0.5">{item.category}</p>
                                        <p className="text-sm font-semibold text-[#0F172A] leading-snug line-clamp-2">{item.title}</p>
                                        <p className="text-xs text-[#64748B] mt-1">{item.hours}h course</p>
                                    </div>
                                    <div className="flex flex-col items-end justify-between shrink-0">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-1 text-[#94A3B8] hover:text-[#DC2626] transition-colors"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                        <span className="text-sm font-bold text-[#1B3A6B]">{formatCurrency(item.price_cents)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Promo + Summary */}
                {items.length > 0 && (
                    <div className="px-6 py-4 border-t border-[#E2E8F0] bg-white">
                        {/* Promo code */}
                        <div className="mb-4">
                            {promoCode && promoValid ? (
                                <div className="flex items-center justify-between bg-[#F0FDF4] border border-[#86EFAC] rounded-xl px-3 py-2.5">
                                    <div className="flex items-center gap-2">
                                        <Tag size={14} className="text-[#16A34A]" />
                                        <span className="text-sm font-semibold text-[#16A34A]">{promoCode}</span>
                                        <span className="text-xs text-[#16A34A]">— {PROMO_CODES[promoCode]?.label}</span>
                                    </div>
                                    <button onClick={removePromo} className="text-[#94A3B8] hover:text-[#DC2626] transition-colors">
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                                            <input
                                                type="text"
                                                value={promoInput}
                                                onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }}
                                                onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                                                placeholder="Promo code"
                                                className="w-full h-9 pl-8 pr-3 text-sm rounded-lg border border-[#E2E8F0] bg-[#F8F9FC] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent"
                                            />
                                        </div>
                                        <button
                                            onClick={handleApplyPromo}
                                            className="px-3 h-9 text-sm font-semibold text-[#1B3A6B] border border-[#1B3A6B] rounded-lg hover:bg-[#1B3A6B] hover:text-white transition-all"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {promoError && <p className="text-xs text-[#DC2626] mt-1.5">{promoError}</p>}
                                </div>
                            )}
                        </div>

                        {/* Price breakdown */}
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="flex justify-between text-sm text-[#64748B]">
                                <span>Subtotal ({items.length} course{items.length !== 1 ? 's' : ''})</span>
                                <span>{formatCurrency(subtotalCents())}</span>
                            </div>
                            {discountCents() > 0 && (
                                <div className="flex justify-between text-sm text-[#16A34A] font-medium">
                                    <span>Promo discount</span>
                                    <span>−{formatCurrency(discountCents())}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-[#0F172A] text-base pt-2 border-t border-[#E2E8F0]">
                                <span>Total</span>
                                <span>{formatCurrency(totalCents())}</span>
                            </div>
                        </div>

                        <Link href="/cart" onClick={closeDrawer}>
                            <Button variant="primary" fullWidth size="lg" className="font-semibold">
                                Proceed to Checkout <ArrowRight size={16} />
                            </Button>
                        </Link>
                        <button onClick={closeDrawer} className="w-full text-center text-sm text-[#64748B] hover:text-[#334155] mt-3 transition-colors">
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
