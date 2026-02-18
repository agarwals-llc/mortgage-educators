import Link from 'next/link';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
    Company: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog & Resources', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support', href: '/support' },
    ],
    Courses: [
        { label: 'Pre-Licensing', href: '/courses?category=pre-licensing' },
        { label: 'Continuing Education', href: '/courses?category=ce' },
        { label: 'Exam Prep', href: '/exam-prep' },
        { label: 'Corporate Training', href: '/corporate' },
        { label: 'Browse All Courses', href: '/courses' },
    ],
    Resources: [
        { label: 'State Requirements', href: '/states' },
        { label: 'NMLS Guide', href: '/blog/nmls-guide' },
        { label: 'Licensing FAQ', href: '/faq' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Student Portal', href: '/portal' },
    ],
};

export function Footer() {
    return (
        <footer className="bg-[#0F172A] text-white">
            <div className="site-container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 bg-[#1B3A6B] rounded-lg flex items-center justify-center">
                                <Shield size={18} className="text-[#F5A623]" />
                            </div>
                            <span className="font-bold text-white text-lg">
                                Mortgage<span className="text-[#F5A623]">Educators</span>
                            </span>
                        </Link>
                        <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 max-w-xs">
                            NMLS-approved mortgage licensing education for loan originators across all 50 states. Fast, flexible, and fully online.
                        </p>
                        {/* NMLS badge */}
                        <div className="inline-flex items-center gap-2 bg-[#1B3A6B]/40 border border-[#1B3A6B] rounded-lg px-3 py-2 text-xs text-[#93C5FD]">
                            <Shield size={14} className="text-[#F5A623]" />
                            NMLS Approved Provider
                        </div>
                        <div className="mt-6 flex flex-col gap-2 text-sm text-[#64748B]">
                            <div className="flex items-center gap-2">
                                <Mail size={14} />
                                <span>support@mortgageeducators.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={14} />
                                <span>1-800-555-0199</span>
                            </div>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[#64748B] hover:text-[#F5A623] transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#475569]">
                    <p>© {new Date().getFullYear()} Mortgage Educators. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/terms" className="hover:text-[#94A3B8] transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="hover:text-[#94A3B8] transition-colors">Privacy Policy</Link>
                        <Link href="/refund-policy" className="hover:text-[#94A3B8] transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
