'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Shield, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import { useCart } from '@/lib/store/useCart';

const navLinks = [
    { label: 'Get Licensed', href: '/get-licensed' },
    { label: '2026 CE', href: '/ce-2026' },
    { label: 'Courses', href: '/courses' },
    { label: 'Exam Prep', href: '/exam-prep' },
    { label: 'States', href: '/states' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { itemCount, openDrawer } = useCart();
    const count = itemCount();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
                    scrolled
                        ? 'bg-white shadow-[0_1px_8px_rgba(0,0,0,0.10)] border-b border-[#E2E8F0]'
                        : 'bg-[#0F172A]/70 backdrop-blur-md'
                )}
            >
                <div className="site-container">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                            <div className="w-8 h-8 bg-[#1B3A6B] rounded-lg flex items-center justify-center group-hover:bg-[#122850] transition-colors">
                                <Shield size={18} className="text-[#F5A623]" />
                            </div>
                            <span className={cn('font-bold text-lg leading-tight transition-colors', scrolled ? 'text-[#0F172A]' : 'text-white')}>
                                Mortgage<span className={scrolled ? 'text-[#1B3A6B]' : 'text-[#F5A623]'}>Educators</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-0.5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150',
                                        scrolled
                                            ? 'text-[#334155] hover:text-[#1B3A6B] hover:bg-[#F1F5F9]'
                                            : 'text-white/85 hover:text-white hover:bg-white/10'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-2">
                            {/* Cart icon */}
                            <button
                                onClick={openDrawer}
                                className={cn(
                                    'relative p-2 rounded-lg transition-all duration-150',
                                    scrolled ? 'text-[#334155] hover:bg-[#F1F5F9]' : 'text-white hover:bg-white/10'
                                )}
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart size={20} />
                                {count > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1B3A6B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {count}
                                    </span>
                                )}
                            </button>
                            <Link href="/login">
                                <button className={cn(
                                    'px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-150',
                                    scrolled
                                        ? 'border-[#1B3A6B] text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white'
                                        : 'border-white/50 text-white hover:bg-white/15 hover:border-white'
                                )}>
                                    Log In
                                </button>
                            </Link>
                            <Link href="/register">
                                <Button variant="accent" size="sm" className="font-semibold shadow-md">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile cart + hamburger */}
                        <div className="flex items-center gap-1 lg:hidden">
                            <button
                                onClick={openDrawer}
                                className={cn('relative p-2 rounded-lg transition-colors', scrolled ? 'text-[#334155] hover:bg-[#F1F5F9]' : 'text-white hover:bg-white/10')}
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart size={20} />
                                {count > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1B3A6B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {count}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className={cn('p-2 rounded-lg transition-colors', scrolled ? 'text-[#334155] hover:bg-[#F1F5F9]' : 'text-white hover:bg-white/10')}
                            >
                                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-30 lg:hidden">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
                    <div className="absolute top-16 left-0 right-0 bg-white border-b border-[#E2E8F0] shadow-xl animate-fade-in">
                        <div className="site-container py-4 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-4 py-3 text-sm font-medium text-[#334155] hover:text-[#1B3A6B] hover:bg-[#F8F9FC] rounded-lg transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex gap-3 pt-3 border-t border-[#E2E8F0] mt-2">
                                <Link href="/login" className="flex-1">
                                    <Button variant="outline" fullWidth>Log In</Button>
                                </Link>
                                <Link href="/register" className="flex-1">
                                    <Button variant="accent" fullWidth>Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
