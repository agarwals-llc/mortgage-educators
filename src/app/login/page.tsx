'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Shield, Eye, EyeOff, ArrowRight, CheckCircle, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock auth — replace with real Supabase/NextAuth call later
        setTimeout(() => {
            setLoading(false);
            router.push('/portal');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left — Photo panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/85 via-[#1B3A6B]/75 to-[#0F172A]/80" />
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-[#F5A623] rounded-xl flex items-center justify-center">
                            <Shield size={20} className="text-white" />
                        </div>
                        <span className="font-bold text-xl text-white">
                            Mortgage<span className="text-[#F5A623]">Educators</span>
                        </span>
                    </Link>

                    {/* Tagline */}
                    <div>
                        <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
                            Your mortgage career<br />starts here.
                        </h2>
                        <p className="text-white/70 text-lg mb-8">
                            NMLS-approved courses for pre-licensing, continuing education, and exam prep — all in one place.
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                'NMLS-approved in all 50 states',
                                'Self-paced online learning',
                                'Instant certificate delivery',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2.5 text-white/85">
                                    <CheckCircle size={16} className="text-[#F5A623] shrink-0" />
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                        <p className="text-white/85 text-sm italic mb-3">
                            "Mortgage Educators made getting my license so easy. The platform is intuitive and the content is excellent."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center text-white font-bold text-sm">S</div>
                            <div>
                                <div className="text-white text-sm font-semibold">Sarah M.</div>
                                <div className="text-white/55 text-xs">Licensed MLO, Texas</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right — Form panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#F8F9FC] p-6">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2.5 mb-8">
                        <div className="w-8 h-8 bg-[#1B3A6B] rounded-lg flex items-center justify-center">
                            <Shield size={18} className="text-[#F5A623]" />
                        </div>
                        <span className="font-bold text-lg text-[#0F172A]">
                            Mortgage<span className="text-[#1B3A6B]">Educators</span>
                        </span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#E2E8F0] p-8">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-[#0F172A] mb-1">Welcome back</h1>
                            <p className="text-[#64748B]">Sign in to your student account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* Email */}
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

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-sm font-semibold text-[#334155]">Password</label>
                                    <Link href="/forgot-password" className="text-xs font-medium text-[#1B3A6B] hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full h-11 pl-10 pr-11 rounded-xl border border-[#E2E8F0] bg-[#F8F9FC] text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading} className="mt-1 font-semibold">
                                Sign In <ArrowRight size={16} />
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-[#E2E8F0]" />
                            <span className="text-xs text-[#94A3B8] font-medium">or continue with</span>
                            <div className="flex-1 h-px bg-[#E2E8F0]" />
                        </div>

                        {/* Google SSO */}
                        <button className="w-full h-11 flex items-center justify-center gap-3 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8F9FC] text-[#334155] text-sm font-semibold transition-all shadow-sm">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        <p className="text-center text-sm text-[#64748B] mt-6">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-semibold text-[#1B3A6B] hover:underline">
                                Create one free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
