import Link from 'next/link';
import { ArrowRight, CheckCircle, Users, Award, BarChart3, Shield, Building2, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const FEATURES = [
    { icon: Users, title: 'Team Enrollment', desc: 'Enroll your entire team at once with bulk pricing discounts. Manage all seats from one admin dashboard.' },
    { icon: BarChart3, title: 'Progress Reporting', desc: 'Real-time dashboards showing completion rates, seat time, and compliance status for every team member.' },
    { icon: Award, title: 'Certificate Management', desc: 'Automatically track and store all certificates. Export compliance reports for audits in one click.' },
    { icon: Shield, title: 'NMLS Compliance', desc: 'All courses are NMLS-approved and automatically reported. Stay compliant across all 50 states.' },
];

const PLANS = [
    { name: 'Team', seats: '5–24 seats', discount: '10% off', price: 'From $85/seat', features: ['Bulk enrollment', 'Admin dashboard', 'Progress reports', 'Email support'] },
    { name: 'Business', seats: '25–99 seats', discount: '20% off', price: 'From $76/seat', features: ['Everything in Team', 'Priority support', 'Custom branding', 'API access'], popular: true },
    { name: 'Enterprise', seats: '100+ seats', discount: 'Custom pricing', price: 'Contact us', features: ['Everything in Business', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee'] },
];

export default function CorporatePage() {
    return (
        <div className="overflow-x-hidden">
            {/* Hero */}
            <section className="relative pt-16 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop')` }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/90 via-[#1B3A6B]/82 to-[#0F172A]/88" />
                <div className="site-container relative z-10 py-20">
                    <div className="max-w-3xl">
                        <Badge variant="info" className="mb-5">Corporate & Teams</Badge>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] mb-5">
                            License Your Entire<br /><span className="text-[#F5A623]">Team at Scale</span>
                        </h1>
                        <p className="text-xl text-white/75 mb-8 max-w-2xl">
                            Bulk enrollment, compliance dashboards, and dedicated support for mortgage companies, banks, and credit unions.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="#plans">
                                <Button size="lg" variant="accent" className="font-semibold shadow-xl shadow-[#F5A623]/25">
                                    View Team Plans <ArrowRight size={18} />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <button className="h-12 px-6 text-base font-semibold rounded-xl border-2 border-white/40 text-white hover:bg-white/10 transition-all">
                                    Talk to Sales
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative z-10">
                    <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60L1440 15C1200 50 960 0 720 20C480 40 240 5 0 30L0 60Z" fill="#F8F9FC" /></svg>
                </div>
            </section>

            {/* Features */}
            <section className="site-section bg-[#F8F9FC]">
                <div className="site-container">
                    <div className="text-center mb-12">
                        <Badge variant="success" className="mb-4">Platform Features</Badge>
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Everything Your Team Needs</h2>
                        <p className="text-[#64748B] text-lg max-w-2xl mx-auto">One platform to manage licensing and compliance for your entire organization.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {FEATURES.map((f) => (
                            <Card key={f.title} className="flex gap-4">
                                <div className="w-12 h-12 bg-[#EEF2F7] rounded-xl flex items-center justify-center shrink-0">
                                    <f.icon size={22} className="text-[#1B3A6B]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#0F172A] mb-1">{f.title}</h3>
                                    <p className="text-sm text-[#64748B] leading-relaxed">{f.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans */}
            <section id="plans" className="site-section bg-white">
                <div className="site-container">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Team Pricing</h2>
                        <p className="text-[#64748B] text-lg">Volume discounts for teams of all sizes.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {PLANS.map((plan) => (
                            <div key={plan.name} className={`relative bg-white rounded-2xl border flex flex-col p-6 ${plan.popular ? 'border-[#1B3A6B] ring-2 ring-[#1B3A6B] shadow-xl shadow-[#1B3A6B]/10' : 'border-[#E2E8F0] shadow-sm'}`}>
                                {plan.popular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                        <span className="bg-[#1B3A6B] text-white text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</span>
                                    </div>
                                )}
                                <div className="mb-2">
                                    <Badge variant={plan.popular ? 'info' : 'default'}>{plan.name}</Badge>
                                </div>
                                <div className="text-sm text-[#64748B] mb-1">{plan.seats}</div>
                                <div className="text-3xl font-extrabold text-[#1B3A6B] mb-1">{plan.price}</div>
                                <div className="text-sm font-semibold text-[#16A34A] mb-5">{plan.discount}</div>
                                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-sm text-[#334155]">
                                            <CheckCircle size={15} className="text-[#16A34A] mt-0.5 shrink-0" />{f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contact">
                                    <Button variant={plan.popular ? 'primary' : 'outline'} fullWidth>
                                        {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="site-section bg-gradient-to-br from-[#1B3A6B] to-[#0F172A]">
                <div className="site-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Get Your Team Licensed?</h2>
                            <p className="text-white/70 text-lg mb-6">Talk to our team about custom pricing and implementation for your organization.</p>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-white/80">
                                    <Phone size={16} className="text-[#F5A623]" />
                                    <span>1-800-555-0123</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                    <Mail size={16} className="text-[#F5A623]" />
                                    <span>corporate@mortgageeducators.com</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact">
                                <Button size="lg" variant="accent" className="font-semibold shadow-xl shadow-[#F5A623]/25">
                                    Contact Sales <ArrowRight size={18} />
                                </Button>
                            </Link>
                            <Link href="#plans">
                                <button className="h-12 px-6 text-base font-semibold rounded-xl border-2 border-white/40 text-white hover:bg-white/10 transition-all">
                                    View Plans
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
