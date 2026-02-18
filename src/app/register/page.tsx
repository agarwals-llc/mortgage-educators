'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Shield, Eye, EyeOff, ArrowRight, CheckCircle, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock registration — replace with real Supabase/NextAuth call later
        setTimeout(() => {
            setLoading(false);
            router.push('/portal');
        }, 1500);
    };

    const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    return (
        <div className="min-h-screen flex">
            {/* Left photo panel */}
            <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop')` }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/88 via-[#1B3A6B]/78 to-[#0F172A]/82" />
                <div className="relative z-10 flex flex-col justify-between p-10 w-full">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-[#F5A623] rounded-xl flex items-center justify-center">
                            <Shield size={20} className="text-white" />
                        </div>
                        <span className="font-bold text-xl text-white">Mortgage<span className="text-[#F5A623]">Educators</span></span>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">Start your mortgage<br />career today.</h2>
                        <p className="text-white/70 mb-6">Join 50,000+ licensed mortgage professionals who started with Mortgage Educators.</p>
                        <div className="flex flex-col gap-3">
                            {['Free account — no credit card required', 'Browse all NMLS-approved courses', 'Track your progress and certificates', 'Access study materials instantly'].map((item) => (
                                <div key={item} className="flex items-center gap-2.5 text-white/85">
                                    <CheckCircle size={15} className="text-[#F5A623] shrink-0" />
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                        <div className="flex gap-1 mb-2">{[1, 2, 3, 4, 5].map(i => <span key={i} className="text-[#F5A623] text-sm">★</span>)}</div>
                        <p className="text-white/85 text-sm italic mb-3">"I passed my NMLS exam on the first try thanks to Mortgage Educators. Outstanding exam prep."</p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white font-bold text-sm">J</div>
                            <div>
                                <div className="text-white text-sm font-semibold">James K.</div>
                                <div className="text-white/55 text-xs">New MLO, Florida</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right form panel */}
            <div className="w-full lg:w-7/12 flex items-center justify-center bg-[#F8F9FC] p-6 py-12">
                <div className="w-full max-w-lg">
                    <div className="lg:hidden flex items-center gap-2.5 mb-8">
                        <div className="w-8 h-8 bg-[#1B3A6B] rounded-lg flex items-center justify-center">
                            <Shield size={18} className="text-[#F5A623]" />
                        </div>
                        <span className="font-bold text-lg text-[#0F172A]">Mortgage<span className="text-[#1B3A6B]">Educators</span></span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#E2E8F0] p-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-[#0F172A] mb-1">Create your account</h1>
                            <p className="text-[#64748B]">Free to join — start learning in minutes</p>
                        </div>

                        <button className="w-full h-11 flex items-center justify-center gap-3 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8F9FC] text-[#334155] text-sm font-semibold transition-all shadow-sm mb-5">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign up with Google
                        </button>

                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex-1 h-px bg-[#E2E8F0]" />
                            <span className="text-xs text-[#94A3B8] font-medium">or with email</span>
                            <div className="flex-1 h-px bg-[#E2E8F0]" />
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                {[{ field: 'firstName', label: 'First name', placeholder: 'Jane' }, { field: 'lastName', label: 'Last name', placeholder: 'Smith' }].map(({ field, label, placeholder }) => (
                                    <div key={field}>
                                        <label className="block text-sm font-semibold text-[#334155] mb-1.5">{label}</label>
                                        <div className="relative">
                                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                                            <input type="text" value={form[field as keyof typeof form]} onChange={update(field)} placeholder={placeholder} required
                                                className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#E2E8F0] bg-[#F8F9FC] text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#334155] mb-1.5">Email address</label>
                                <div className="relative">
                                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                                    <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" required
                                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2E8F0] bg-[#F8F9FC] text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#334155] mb-1.5">Password</label>
                                <div className="relative">
                                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                                    <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={update('password')} placeholder="Min. 8 characters" required minLength={8}
                                        className="w-full h-11 pl-10 pr-11 rounded-xl border border-[#E2E8F0] bg-[#F8F9FC] text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition-all" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]">
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>

                            <p className="text-xs text-[#64748B]">
                                By creating an account you agree to our{' '}
                                <Link href="/terms" className="text-[#1B3A6B] font-medium hover:underline">Terms</Link> and{' '}
                                <Link href="/privacy" className="text-[#1B3A6B] font-medium hover:underline">Privacy Policy</Link>.
                            </p>

                            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading} className="font-semibold">
                                Create Account <ArrowRight size={16} />
                            </Button>
                        </form>

                        <p className="text-center text-sm text-[#64748B] mt-5">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-[#1B3A6B] hover:underline">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
