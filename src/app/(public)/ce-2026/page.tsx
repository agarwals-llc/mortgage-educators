import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, Star, Shield, AlertCircle, Calendar, ChevronDown, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const CE_PACKAGES = [
    {
        id: 'national-state',
        title: 'NMLS National + State-Specific CE',
        subtitle: 'Most Popular — Complete your full renewal in one bundle',
        price: 94.99,
        originalPrice: 149,
        hours: 8,
        includes: ['3 hours Federal Law', '2 hours Ethics', '2 hours Non-Traditional Mortgage', '1 hour State-Specific Elective'],
        badge: 'Best Value',
        badgeVariant: 'accent' as const,
        popular: true,
    },
    {
        id: 'national-only',
        title: 'NMLS National CE Only',
        subtitle: '7-hour core requirement for all licensed MLOs',
        price: 74.99,
        originalPrice: 109,
        hours: 7,
        includes: ['3 hours Federal Law', '2 hours Ethics', '2 hours Non-Traditional Mortgage'],
        badge: null,
        badgeVariant: 'default' as const,
        popular: false,
    },
    {
        id: 'state-elective',
        title: 'State-Specific CE Electives Only',
        subtitle: 'Add state hours to your existing national CE',
        price: 29.99,
        originalPrice: 49,
        hours: 1,
        includes: ['State-approved elective content', 'Counts toward state renewal', 'Instant certificate on completion'],
        badge: 'Add-On',
        badgeVariant: 'info' as const,
        popular: false,
    },
];

const DEADLINE_TIMELINE = [
    { date: 'Oct 31', month: 'OCT', states: ['Georgia'], color: '#60A5FA', urgency: 'normal' },
    { date: 'Nov 1', month: 'NOV', states: ['West Virginia', 'Washington D.C.'], color: '#60A5FA', urgency: 'normal' },
    { date: 'Nov 30', month: 'NOV', states: ['Kentucky', 'South Carolina-DCA'], color: '#60A5FA', urgency: 'normal' },
    { date: 'Dec 1', month: 'DEC', states: ['Oklahoma', 'Delaware', 'Idaho', 'Iowa', 'Kansas', 'Vermont', 'Puerto Rico'], color: '#1B3A6B', urgency: 'smart' },
    { date: 'Dec 4', month: 'DEC', states: ['(Smart CE Deadline)'], color: '#22C55E', urgency: 'smart' },
    { date: 'Dec 11', month: 'DEC', states: ['Utah DRE', 'Washington'], color: '#F59E0B', urgency: 'warning' },
    { date: 'Dec 25', month: 'DEC', states: ['(Guaranteed to Miss Renewal)'], color: '#EF4444', urgency: 'danger' },
];

const STANDARD_DEC31_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California DFPI', 'California DRE',
    'Colorado', 'Connecticut', 'Florida', 'Guam', 'Hawaii', 'Illinois', 'Indiana DFI',
    'Indiana SOS', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina BFI', 'South Dakota', 'Tennessee', 'Texas SML', 'Utah DFI',
    'Virginia', 'Virgin Islands', 'Wisconsin', 'Wyoming',
];

const WHY_REASONS = [
    {
        title: 'Flexible & Valuable',
        desc: 'Industry-leading pricing with a price match guarantee. Complete your CE in-person, live webinar, or online self-study — all formats include engaging, relevant content.',
    },
    {
        title: 'Well-Reviewed & Dependable',
        desc: 'Thousands of MLOs trust Mortgage Educators every year. Our courses are NMLS-approved, regularly updated, and designed by industry experts.',
    },
    {
        title: 'Fast Certificate Delivery',
        desc: 'Complete your course and receive your NMLS-reportable certificate immediately. We report completions to NMLS within 24 hours.',
    },
    {
        title: 'Expert Support',
        desc: 'Our team is available by phone, email, and chat to help you choose the right course and answer any compliance questions.',
    },
];

export default function CE2026Page() {
    return (
        <div className="overflow-x-hidden">
            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative pt-16 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/92 via-[#1B3A6B]/85 to-[#0F172A]/90" />

                <div className="site-container relative z-10 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-[#F5A623]/20 border border-[#F5A623]/40 rounded-full px-4 py-1.5 text-sm text-[#F5A623] font-medium mb-6">
                                <Shield size={14} />
                                NMLS-Approved · 2026 Renewal Season
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-5">
                                NMLS Continuing<br />
                                <span className="text-[#F5A623]">Education 2026</span>
                            </h1>
                            <p className="text-xl text-white/75 mb-4 leading-relaxed">
                                Online Self-Study · Complete at your own pace
                            </p>
                            <p className="text-lg font-semibold text-[#F5A623] mb-8">
                                Get your CE for as low as $94.99 — use code <span className="bg-[#F5A623]/20 border border-[#F5A623]/40 rounded px-2 py-0.5 font-mono">EARLYBIRD</span> at checkout!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="#packages">
                                    <Button size="lg" variant="accent" className="font-semibold shadow-xl shadow-[#F5A623]/25">
                                        Browse CE Packages <ArrowRight size={18} />
                                    </Button>
                                </Link>
                                <Link href="#deadlines">
                                    <button className="h-12 px-6 text-base font-semibold rounded-xl border-2 border-white/40 text-white hover:bg-white/10 transition-all">
                                        View Deadlines
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: BookOpen, value: '8 Hours', label: 'Full CE Bundle', sub: 'National + State' },
                                { icon: Clock, value: 'Self-Paced', label: 'Study Anytime', sub: 'No live sessions required' },
                                { icon: Award, value: 'Instant', label: 'Certificate', sub: 'NMLS-reportable' },
                                { icon: Star, value: '4.9★', label: 'Student Rating', sub: '50,000+ reviews' },
                            ].map((s) => (
                                <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                                    <s.icon size={22} className="text-[#F5A623] mb-3" />
                                    <div className="text-2xl font-extrabold text-white">{s.value}</div>
                                    <div className="text-sm font-semibold text-white/90">{s.label}</div>
                                    <div className="text-xs text-white/55 mt-0.5">{s.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Wave */}
                <div className="relative z-10">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 60L1440 60L1440 15C1200 50 960 0 720 20C480 40 240 5 0 30L0 60Z" fill="#F8F9FC" />
                    </svg>
                </div>
            </section>

            {/* ── COURSE PACKAGES ─────────────────────────────────── */}
            <section id="packages" className="site-section bg-[#F8F9FC]">
                <div className="site-container">
                    <div className="text-center mb-12">
                        <Badge variant="info" className="mb-4">2026 CE Packages</Badge>
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Choose Your CE Package</h2>
                        <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
                            All packages are NMLS-approved and include instant certificate delivery upon completion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {CE_PACKAGES.map((pkg) => (
                            <div
                                key={pkg.id}
                                className={`relative bg-white rounded-2xl border flex flex-col ${pkg.popular ? 'border-[#1B3A6B] shadow-xl shadow-[#1B3A6B]/10 ring-2 ring-[#1B3A6B]' : 'border-[#E2E8F0] shadow-sm'}`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                        <span className="bg-[#1B3A6B] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">Most Popular</span>
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-1">
                                    {pkg.badge && (
                                        <Badge variant={pkg.badgeVariant} className="self-start mb-3">{pkg.badge}</Badge>
                                    )}
                                    <h3 className="text-lg font-bold text-[#0F172A] mb-1">{pkg.title}</h3>
                                    <p className="text-sm text-[#64748B] mb-5">{pkg.subtitle}</p>

                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-4xl font-extrabold text-[#1B3A6B]">${pkg.price}</span>
                                        <span className="text-lg text-[#94A3B8] line-through">${pkg.originalPrice}</span>
                                    </div>
                                    <p className="text-xs text-[#64748B] mb-6">{pkg.hours}-hour NMLS-approved course</p>

                                    <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                                        {pkg.includes.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-[#334155]">
                                                <CheckCircle size={15} className="text-[#16A34A] mt-0.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/courses">
                                        <Button variant={pkg.popular ? 'primary' : 'outline'} fullWidth size="lg">
                                            Enroll Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-sm text-[#64748B] mt-6">
                        Use code <strong className="text-[#1B3A6B] font-mono">EARLYBIRD</strong> at checkout for an additional discount.
                    </p>
                </div>
            </section>

            {/* ── CE DEADLINE TIMELINE ─────────────────────────────── */}
            <section id="deadlines" className="site-section bg-white">
                <div className="site-container">
                    <div className="text-center mb-12">
                        <Badge variant="warning" className="mb-4">Don't Miss Your Deadline</Badge>
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-2">
                            CE Deadline Dates <span className="text-[#1B3A6B]">2026</span>
                        </h2>
                        <p className="text-[#64748B] text-lg">Know your state's deadline and complete your CE on time.</p>
                    </div>

                    {/* Timeline */}
                    <div className="overflow-x-auto pb-4 mb-10">
                        <div className="min-w-[700px]">
                            {/* Month labels */}
                            <div className="flex mb-2">
                                <div className="w-1/4 text-center">
                                    <span className="text-sm font-bold text-[#64748B] bg-[#F1F5F9] px-4 py-1 rounded-full">OCT</span>
                                </div>
                                <div className="w-1/4 text-center">
                                    <span className="text-sm font-bold text-[#64748B] bg-[#F1F5F9] px-4 py-1 rounded-full">NOV</span>
                                </div>
                                <div className="w-1/2 text-center">
                                    <span className="text-sm font-bold text-white bg-[#1B3A6B] px-4 py-1 rounded-full">DEC</span>
                                </div>
                            </div>

                            {/* Track */}
                            <div className="relative flex items-center h-16 mb-6">
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 rounded-full"
                                    style={{ background: 'linear-gradient(to right, #93C5FD 0%, #93C5FD 25%, #60A5FA 25%, #60A5FA 50%, #1B3A6B 50%, #22C55E 65%, #F59E0B 80%, #EF4444 100%)' }}
                                />
                                {/* Milestone dots */}
                                {[
                                    { pos: '12%', label: '31', color: '#60A5FA' },
                                    { pos: '22%', label: '1', color: '#60A5FA' },
                                    { pos: '38%', label: '30', color: '#60A5FA' },
                                    { pos: '52%', label: '1', color: '#1B3A6B' },
                                    { pos: '63%', label: '4', color: '#22C55E' },
                                    { pos: '76%', label: '11', color: '#F59E0B' },
                                    { pos: '90%', label: '25', color: '#EF4444' },
                                ].map((dot, i) => (
                                    <div key={i} className="absolute flex flex-col items-center" style={{ left: dot.pos, transform: 'translateX(-50%)' }}>
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white"
                                            style={{ backgroundColor: dot.color }}
                                        >
                                            {dot.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap gap-4 justify-center text-xs font-semibold">
                                {[
                                    { color: '#22C55E', label: 'Smart CE Deadline' },
                                    { color: '#F59E0B', label: 'At Risk to Miss Renewal' },
                                    { color: '#EF4444', label: 'Guaranteed to Miss Renewal' },
                                ].map((l) => (
                                    <div key={l.label} className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
                                        <span className="text-[#475569]">{l.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* State deadline cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {DEADLINE_TIMELINE.slice(0, 4).map((item, i) => (
                            <div key={i} className="flex items-start gap-4 bg-[#F8F9FC] rounded-xl p-4 border border-[#E2E8F0]">
                                <div
                                    className="w-14 h-14 rounded-xl flex flex-col items-center justify-center text-white shrink-0 shadow"
                                    style={{ backgroundColor: item.color }}
                                >
                                    <span className="text-xs font-semibold opacity-80">{item.month}</span>
                                    <span className="text-xl font-black leading-none">{item.date.split(' ')[1] || item.date}</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-[#0F172A] mb-1">Deadline: {item.date}</div>
                                    <div className="text-sm text-[#64748B]">{item.states.join(', ')}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Standard Dec 31 box */}
                    <div className="bg-[#F8F9FC] rounded-2xl border border-[#E2E8F0] p-6">
                        <div className="flex items-start gap-5">
                            <div className="bg-[#1B3A6B] text-white rounded-xl p-4 text-center shrink-0 min-w-[80px]">
                                <div className="text-xs font-semibold opacity-70 uppercase">December</div>
                                <div className="text-4xl font-black leading-none">31</div>
                                <div className="text-xs font-semibold mt-1">Standard</div>
                                <div className="text-xs opacity-70">Deadline</div>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0F172A] mb-3 text-lg">December 31 — Standard Deadline (Most States)</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-1">
                                    {STANDARD_DEC31_STATES.map((state) => (
                                        <div key={state} className="text-sm text-[#475569] flex items-center gap-1">
                                            <div className="w-1 h-1 rounded-full bg-[#94A3B8] shrink-0" />
                                            {state}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHY CHOOSE US ────────────────────────────────────── */}
            <section className="site-section bg-[#F8F9FC]">
                <div className="site-container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#0F172A] mb-3">
                            Why MLOs Choose Mortgage Educators for CE
                        </h2>
                        <p className="text-[#64748B] text-lg">Trusted by 50,000+ mortgage professionals nationwide.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {WHY_REASONS.map((r) => (
                            <Card key={r.title} className="flex gap-4">
                                <CheckCircle size={22} className="text-[#16A34A] shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-[#0F172A] mb-1">{r.title}</h3>
                                    <p className="text-sm text-[#64748B] leading-relaxed">{r.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ────────────────────────────────────────── */}
            <section className="site-section bg-gradient-to-br from-[#1B3A6B] to-[#0F172A]">
                <div className="site-container text-center">
                    <AlertCircle size={40} className="text-[#F5A623] mx-auto mb-4" />
                    <h2 className="text-4xl font-extrabold text-white mb-4">Don't Wait — Complete Your 2026 CE Today</h2>
                    <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                        Deadlines are approaching. Most states require completion by December 31, 2026.
                    </p>
                    <Link href="/courses">
                        <Button size="lg" variant="accent" className="shadow-xl shadow-[#F5A623]/25 font-semibold">
                            Start My CE Now <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
