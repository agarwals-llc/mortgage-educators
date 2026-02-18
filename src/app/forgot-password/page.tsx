'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Shield, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); setSent(true); }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
                        <div className="w-10 h-10 bg-[#1B3A6B] rounded-xl flex items-center justify-center">
                            <Shield size={22} className="text-[#F5A623]" />
                        </div>
                        <span className="font-bold text-xl text-[#0F172A]">Mortgage<span className="text-[#1B3A6B]">Educators</span></span>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#E2E8F0] p-8">
                    {!sent ? (
                        <>
                            <div className="w-14 h-14 bg-[#EEF2F7] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <Mail size={26} className="text-[#1B3A6B]" />
                            </div>
                            <h1 className="text-2xl font-bold text-[#0F172A] mb-2 text-center">Forgot your password?</h1>
                            <p className="text-[#64748B] text-center mb-8">Enter your email and we'll send you a reset link.</p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#334155] mb-1.5">Email address</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2E8F0] bg-[#F8F9FC] text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" variant="primary" fullWidth size="lg" loading={loading} className="font-semibold">
                                    Send Reset Link <ArrowRight size={16} />
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="w-14 h-14 bg-[#DCFCE7] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <CheckCircle size={26} className="text-[#16A34A]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Check your email</h2>
                            <p className="text-[#64748B] mb-6">
                                We sent a password reset link to <strong className="text-[#0F172A]">{email}</strong>. Check your inbox and follow the instructions.
                            </p>
                            <p className="text-sm text-[#94A3B8]">Didn't receive it? Check your spam folder or{' '}
                                <button onClick={() => setSent(false)} className="text-[#1B3A6B] font-medium hover:underline">try again</button>.
                            </p>
                        </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-[#F1F5F9] text-center">
                        <Link href="/login" className="text-sm font-semibold text-[#1B3A6B] hover:underline">
                            ← Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
