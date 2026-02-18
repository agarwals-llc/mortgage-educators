'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ClipboardList, Award, CreditCard, Shield, Bell, ChevronDown, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const portalTabs = [
    { label: 'My Courses', href: '/portal', icon: BookOpen },
    { label: 'Assignments', href: '/portal/assignments', icon: ClipboardList },
    { label: 'Certificates', href: '/portal/certificates', icon: Award },
    { label: 'My Banking', href: '/portal/banking', icon: CreditCard },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[#F8F9FC]">
            {/* Portal Header */}
            <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30">
                <div className="site-container">
                    <div className="flex items-center justify-between h-14">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 mr-8">
                            <div className="w-7 h-7 bg-[#1B3A6B] rounded-lg flex items-center justify-center">
                                <Shield size={14} className="text-[#F5A623]" />
                            </div>
                            <span className="font-bold text-[#0F172A] text-base hidden sm:block">
                                Mortgage<span className="text-[#1B3A6B]">Educators</span>
                            </span>
                        </Link>

                        {/* Tabs */}
                        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1">
                            {portalTabs.map((tab) => {
                                const isActive = pathname === tab.href || (tab.href !== '/portal' && pathname.startsWith(tab.href));
                                return (
                                    <Link
                                        key={tab.href}
                                        href={tab.href}
                                        className={cn(
                                            'flex items-center gap-1.5 px-3 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-150',
                                            isActive
                                                ? 'border-[#1B3A6B] text-[#1B3A6B]'
                                                : 'border-transparent text-[#64748B] hover:text-[#334155] hover:border-[#CBD5E1]'
                                        )}
                                    >
                                        <tab.icon size={15} />
                                        <span className="hidden sm:block">{tab.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User menu */}
                        <div className="flex items-center gap-2 ml-4">
                            <button className="p-2 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] transition-colors relative">
                                <Bell size={18} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />
                            </button>
                            <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#2a5298] flex items-center justify-center text-white text-xs font-bold">
                                    JD
                                </div>
                                <span className="text-sm font-medium text-[#334155] hidden sm:block">John Doe</span>
                                <ChevronDown size={14} className="text-[#64748B] hidden sm:block" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main className="site-container py-8">
                {children}
            </main>
        </div>
    );
}
