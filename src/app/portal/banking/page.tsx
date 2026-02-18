'use client';

import { useState } from 'react';
import { CreditCard, Download, Receipt, ChevronRight, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SlideOver } from '@/components/ui/Modal';
import { MOCK_ORDERS, MOCK_SAVED_PAYMENT } from '@/lib/data/mock';
import { formatCurrency, formatDate } from '@/lib/utils/format';

function getStatusBadge(status: string) {
    switch (status) {
        case 'paid': return <Badge variant="success" dot>Paid</Badge>;
        case 'refunded': return <Badge variant="warning" dot>Refunded</Badge>;
        case 'pending': return <Badge variant="info" dot>Pending</Badge>;
        default: return <Badge dot>{status}</Badge>;
    }
}

export default function BankingPage() {
    const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0F172A]">My Banking</h1>
                <p className="text-sm text-[#64748B] mt-0.5">Billing history and payment methods</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Billing history */}
                <div className="lg:col-span-2">
                    <h2 className="text-base font-semibold text-[#0F172A] mb-4">Billing History</h2>

                    {/* Desktop table */}
                    <Card padding="none" className="overflow-hidden hidden md:block">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#F8F9FC] border-b border-[#E2E8F0]">
                                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Date</th>
                                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Description</th>
                                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Amount</th>
                                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Status</th>
                                    <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Receipt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E2E8F0]">
                                {MOCK_ORDERS.map((order) => (
                                    <tr key={order.id} className="hover:bg-[#F8F9FC] transition-colors">
                                        <td className="px-5 py-4 text-sm text-[#64748B]">{formatDate(order.created_at)}</td>
                                        <td className="px-5 py-4">
                                            <div className="text-sm font-medium text-[#0F172A]">{order.description}</div>
                                            <div className="text-xs text-[#94A3B8] font-mono">{order.invoice_number}</div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="text-sm font-semibold text-[#0F172A]">{formatCurrency(order.amount_cents)}</div>
                                            {order.coupon_code && (
                                                <div className="text-xs text-[#16A34A]">Coupon: {order.coupon_code} (-{formatCurrency(order.discount_cents)})</div>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">{getStatusBadge(order.status)}</td>
                                        <td className="px-5 py-4">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="flex items-center gap-1 text-sm text-[#1B3A6B] hover:underline font-medium"
                                            >
                                                <Receipt size={14} />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>

                    {/* Mobile cards */}
                    <div className="md:hidden flex flex-col gap-3">
                        {MOCK_ORDERS.map((order) => (
                            <Card key={order.id}>
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-medium text-sm text-[#0F172A]">{order.description}</p>
                                        <p className="text-xs text-[#94A3B8] font-mono">{order.invoice_number}</p>
                                    </div>
                                    {getStatusBadge(order.status)}
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <div>
                                        <p className="text-lg font-bold text-[#1B3A6B]">{formatCurrency(order.amount_cents)}</p>
                                        <p className="text-xs text-[#64748B]">{formatDate(order.created_at)}</p>
                                    </div>
                                    <button onClick={() => setSelectedOrder(order)}>
                                        <Button variant="secondary" size="sm"><Receipt size={13} />Receipt</Button>
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Payment method */}
                <div>
                    <h2 className="text-base font-semibold text-[#0F172A] mb-4">Payment Method</h2>
                    <Card>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#1B3A6B] to-[#2a5298] rounded-lg flex items-center justify-center">
                                <CreditCard size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-[#0F172A]">{MOCK_SAVED_PAYMENT.brand} ••••{MOCK_SAVED_PAYMENT.last4}</p>
                                <p className="text-xs text-[#64748B]">Expires {MOCK_SAVED_PAYMENT.exp_month}/{MOCK_SAVED_PAYMENT.exp_year}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" fullWidth>Update Card</Button>
                            <Button variant="ghost" size="sm" className="text-[#DC2626] hover:bg-[#FEF2F2]">Remove</Button>
                        </div>
                    </Card>

                    <div className="mt-4 flex items-center gap-2 text-xs text-[#64748B] bg-[#F8F9FC] rounded-lg p-3">
                        <Shield size={14} className="text-[#16A34A] shrink-0" />
                        Payments secured by Stripe. We never store your card details.
                    </div>
                </div>
            </div>

            {/* Invoice slide-over */}
            <SlideOver
                open={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                title="Invoice Details"
            >
                {selectedOrder && (
                    <div className="flex flex-col gap-5">
                        {/* Invoice header */}
                        <div className="bg-[#F8F9FC] rounded-xl p-4">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-[#64748B] font-mono">{selectedOrder.invoice_number}</span>
                                {getStatusBadge(selectedOrder.status)}
                            </div>
                            <div className="text-2xl font-bold text-[#1B3A6B]">{formatCurrency(selectedOrder.amount_cents)}</div>
                            <div className="text-sm text-[#64748B]">{formatDate(selectedOrder.created_at)}</div>
                        </div>

                        {/* Line items */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Line Items</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#334155]">{selectedOrder.description}</span>
                                    <span className="font-medium text-[#0F172A]">{formatCurrency(selectedOrder.amount_cents + selectedOrder.discount_cents)}</span>
                                </div>
                                {selectedOrder.coupon_code && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#16A34A]">Coupon ({selectedOrder.coupon_code})</span>
                                        <span className="text-[#16A34A]">-{formatCurrency(selectedOrder.discount_cents)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm font-bold border-t border-[#E2E8F0] pt-2 mt-1">
                                    <span className="text-[#0F172A]">Total</span>
                                    <span className="text-[#0F172A]">{formatCurrency(selectedOrder.amount_cents)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment info */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Payment</h3>
                            <div className="text-sm text-[#64748B]">
                                <p>Method: {selectedOrder.payment_method}</p>
                                <p className="font-mono text-xs mt-1">Ref: {selectedOrder.stripe_payment_id}</p>
                            </div>
                        </div>

                        <Button variant="primary" fullWidth>
                            <Download size={16} />
                            Download Invoice PDF
                        </Button>
                    </div>
                )}
            </SlideOver>
        </div>
    );
}
