'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Trash2, BookOpen, Tag, X, ArrowRight, Shield, Lock, CheckCircle } from 'lucide-react';
import { useCart, PROMO_CODES } from '@/lib/store/useCart';
import { formatCurrency } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function CartPage() {
    const { items, removeItem, clearCart, promoCode, promoValid, applyPromo, removePromo, subtotalCents, discountCents, totalCents } = useCart();
    const [promoInput, setPromoInput] = useState('');
    const [promoError, setPromoError] = useState('');
    const [promoSuccess, setPromoSuccess] = useState('');

    const handleApplyPromo = () => {
        if (!promoInput.trim()) return;
        const valid = applyPromo(promoInput);
        if (valid) {
            const upper = promoInput.trim().toUpperCase();
            setPromoSuccess(`✓ ${PROMO_CODES[upper]?.label} applied!`);
            setPromoError('');
            setPromoInput('');
        } else {
            setPromoError('Invalid promo code. Try: EARLYBIRD, SAVE10, NEWMLO, CE2026, or BUNDLE50');
            setPromoSuccess('');
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#F8F9FC] pt-24 pb-16">
                <div className="site-container max-w-2xl mx-auto text-center">
                    <div className="w-20 h-20 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <ShoppingCart size={36} className="text-[#94A3B8]" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#0F172A] mb-3">Your cart is empty</h1>
                    <p className="text-[#64748B] mb-8">Browse our NMLS-approved courses and add them to your cart.</p>
                    <Link href="/courses">
                        <Button variant="primary" size="lg" className="font-semibold">
                            Browse Courses <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FC] pt-24 pb-16">
            <div className="site-container">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#0F172A] mb-1">Your Cart</h1>
                    <p className="text-[#64748B]">{items.length} course{items.length !== 1 ? 's' : ''} selected</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Items */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {/* Clear cart */}
                        <div className="flex justify-end">
                            <button onClick={clearCart} className="text-sm text-[#94A3B8] hover:text-[#DC2626] transition-colors flex items-center gap-1">
                                <Trash2 size={13} /> Clear all
                            </button>
                        </div>

                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 flex gap-4">
                                {/* Thumbnail */}
                                <div
                                    className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: `linear-gradient(135deg, ${item.thumbnail_color}, ${item.thumbnail_color}aa)` }}
                                >
                                    <BookOpen size={28} className="text-white/60" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <Badge variant={item.category === 'Pre-Licensing' ? 'info' : item.category === 'Exam Prep' ? 'accent' : 'success'} className="mb-1.5">
                                                {item.category}
                                            </Badge>
                                            <h3 className="font-semibold text-[#0F172A] leading-snug">{item.title}</h3>
                                            <p className="text-sm text-[#64748B] mt-1">{item.hours}-hour NMLS-approved course</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-all shrink-0"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                                            <Shield size={12} className="text-[#1B3A6B]" />
                                            <span>NMLS Approved · Instant Access</span>
                                        </div>
                                        <span className="text-lg font-bold text-[#1B3A6B]">{formatCurrency(item.price_cents)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Promo codes hint */}
                        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4">
                            <p className="text-sm text-[#1D4ED8] font-medium mb-1">🎉 Have a promo code?</p>
                            <p className="text-xs text-[#3B82F6]">Enter it in the order summary on the right. Try <strong>EARLYBIRD</strong> for 15% off or <strong>CE2026</strong> for $25 off.</p>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sticky top-24">
                            <h2 className="font-bold text-[#0F172A] text-lg mb-5">Order Summary</h2>

                            {/* Price lines */}
                            <div className="flex flex-col gap-3 mb-5">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-[#64748B] truncate mr-2 flex-1">{item.title}</span>
                                        <span className="text-[#334155] font-medium shrink-0">{formatCurrency(item.price_cents)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-[#E2E8F0] pt-4 mb-5 flex flex-col gap-2">
                                <div className="flex justify-between text-sm text-[#64748B]">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(subtotalCents())}</span>
                                </div>
                                {discountCents() > 0 && (
                                    <div className="flex justify-between text-sm text-[#16A34A] font-semibold">
                                        <span className="flex items-center gap-1"><Tag size={12} /> Promo ({promoCode})</span>
                                        <span>−{formatCurrency(discountCents())}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-[#0F172A] text-lg pt-2 border-t border-[#E2E8F0]">
                                    <span>Total</span>
                                    <span>{formatCurrency(totalCents())}</span>
                                </div>
                            </div>

                            {/* Promo code */}
                            <div className="mb-5">
                                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">Promo Code</p>
                                {promoCode && promoValid ? (
                                    <div className="flex items-center justify-between bg-[#F0FDF4] border border-[#86EFAC] rounded-xl px-3 py-2.5">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle size={14} className="text-[#16A34A]" />
                                            <span className="text-sm font-semibold text-[#16A34A]">{promoCode}</span>
                                        </div>
                                        <button onClick={() => { removePromo(); setPromoSuccess(''); }} className="text-[#94A3B8] hover:text-[#DC2626] transition-colors">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                                                <input
                                                    type="text"
                                                    value={promoInput}
                                                    onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoError(''); setPromoSuccess(''); }}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                                                    placeholder="Enter code"
                                                    className="w-full h-10 pl-8 pr-3 text-sm rounded-xl border border-[#E2E8F0] bg-[#F8F9FC] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent uppercase font-mono tracking-wider"
                                                />
                                            </div>
                                            <button
                                                onClick={handleApplyPromo}
                                                className="px-3 h-10 text-sm font-semibold text-[#1B3A6B] border border-[#1B3A6B] rounded-xl hover:bg-[#1B3A6B] hover:text-white transition-all"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {promoError && <p className="text-xs text-[#DC2626] mt-1.5">{promoError}</p>}
                                        {promoSuccess && <p className="text-xs text-[#16A34A] font-medium mt-1.5">{promoSuccess}</p>}
                                    </div>
                                )}
                            </div>

                            {/* Checkout button */}
                            <Link href="/register">
                                <Button variant="primary" fullWidth size="lg" className="font-semibold mb-3">
                                    <Lock size={16} /> Secure Checkout
                                </Button>
                            </Link>
                            <p className="text-xs text-center text-[#94A3B8]">
                                🔒 256-bit SSL encryption · Instant access after payment
                            </p>

                            {/* Trust badges */}
                            <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex flex-col gap-2">
                                {['NMLS-approved courses', '30-day money-back guarantee', 'Instant certificate delivery'].map((t) => (
                                    <div key={t} className="flex items-center gap-2 text-xs text-[#64748B]">
                                        <CheckCircle size={13} className="text-[#16A34A] shrink-0" />
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
