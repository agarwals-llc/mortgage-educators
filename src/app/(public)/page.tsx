import Link from 'next/link';
import { ArrowRight, Shield, Star, CheckCircle, Clock, Award, Users, BookOpen, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_COURSES, MOCK_TESTIMONIALS } from '@/lib/data/mock';
import { formatCurrency } from '@/lib/utils/format';

export default function HomePage() {
    const featuredCourses = MOCK_COURSES.slice(0, 3);

    return (
        <div className="overflow-x-hidden">
            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
                {/* Photo background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=80&auto=format&fit=crop')`
                    }}
                />
                {/* Dark overlay with navy tint */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/90 via-[#1B3A6B]/80 to-[#0F172A]/85" />
                {/* Subtle gold glow bottom-left */}
                <div className="absolute bottom-0 left-0 w-[600px] h-[400px] opacity-20"
                    style={{ background: 'radial-gradient(ellipse at bottom left, #F5A623, transparent 70%)' }}
                />

                <div className="site-container relative z-10 py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-4 py-1.5 text-sm text-white/90 mb-8 backdrop-blur-sm">
                            <Shield size={14} className="text-[#F5A623]" />
                            NMLS-Approved Provider · All 50 States
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
                            Become a Licensed{' '}
                            <span className="text-[#F5A623]">Mortgage Loan Officer</span>
                        </h1>

                        <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
                            State-approved pre-licensing, continuing education, and exam prep — all in one modern platform. Study at your own pace, on any device.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/get-licensed">
                                <Button size="lg" variant="accent" className="shadow-xl shadow-[#F5A623]/25 font-semibold">
                                    Get Licensed Now
                                    <ArrowRight size={18} />
                                </Button>
                            </Link>
                            <Link href="/courses">
                                <button className="h-12 px-6 text-base font-semibold rounded-xl border-2 border-white/40 text-white hover:bg-white/15 hover:border-white/70 transition-all duration-200 backdrop-blur-sm">
                                    Browse Courses
                                </button>
                            </Link>
                            <Link href="/login">
                                <button className="h-12 px-6 text-base font-semibold rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200">
                                    Student Login →
                                </button>
                            </Link>
                        </div>

                        {/* Social proof strip */}
                        <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
                            {[
                                { value: '50,000+', label: 'Students Licensed' },
                                { value: '4.9★', label: 'Average Rating' },
                                { value: 'All 50', label: 'States Covered' },
                            ].map((stat) => (
                                <div key={stat.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-2">
                                    <span className="text-lg font-extrabold text-[#F5A623]">{stat.value}</span>
                                    <span className="text-sm text-white/70">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 80L1440 80L1440 20C1200 70 960 0 720 30C480 60 240 10 0 40L0 80Z" fill="#F8F9FC" />
                    </svg>
                </div>
            </section>

            {/* ── TRUST BAR ──────────────────────────────────────────── */}
            <section className="bg-[#F8F9FC] py-10 border-b border-[#E2E8F0]">
                <div className="site-container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Shield, value: 'NMLS Approved', label: 'All 50 States' },
                            { icon: Users, value: '50,000+', label: 'Students Licensed' },
                            { icon: Star, value: '4.9★', label: 'Average Rating' },
                            { icon: Award, value: '100%', label: 'Online & Self-Paced' },
                        ].map((item) => (
                            <div key={item.value} className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 bg-[#EEF2F7] rounded-xl flex items-center justify-center">
                                    <item.icon size={20} className="text-[#1B3A6B]" />
                                </div>
                                <div className="font-bold text-xl text-[#0F172A]">{item.value}</div>
                                <div className="text-sm text-[#64748B]">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ───────────────────────────────────────── */}
            <section className="site-section bg-white">
                <div className="site-container">
                    <div className="text-center mb-14">
                        <Badge variant="info" className="mb-4">Simple Process</Badge>
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Get Licensed in 3 Steps</h2>
                        <p className="text-[#64748B] text-lg max-w-xl mx-auto">
                            From enrollment to license — our streamlined process gets you there faster.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                step: 1,
                                icon: BookOpen,
                                title: 'Choose Your Course',
                                desc: 'Select from NMLS-approved pre-licensing, CE, or exam prep courses for your state.',
                                color: '#1B3A6B',
                            },
                            {
                                step: 2,
                                icon: Clock,
                                title: 'Complete Online',
                                desc: 'Study at your own pace with our interactive platform. Progress and seat time tracked automatically.',
                                color: '#2a5298',
                            },
                            {
                                step: 3,
                                icon: Award,
                                title: 'Get Licensed',
                                desc: 'Download your certificate, submit to NMLS, and launch your mortgage career.',
                                color: '#F5A623',
                            },
                        ].map((item, i) => (
                            <div key={i} className="relative bg-[#F8F9FC] rounded-2xl p-8 border border-[#E2E8F0] flex flex-col gap-5">
                                {/* Step number badge */}
                                <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white border-2 border-[#E2E8F0] flex items-center justify-center">
                                    <span className="text-xs font-black text-[#94A3B8]">0{item.step}</span>
                                </div>
                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                                    style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)` }}
                                >
                                    <item.icon size={26} className="text-white" />
                                </div>
                                {/* Text */}
                                <div>
                                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">{item.title}</h3>
                                    <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
                                </div>
                                {/* Arrow connector (not on last) */}
                                {i < 2 && (
                                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-[#E2E8F0] rounded-full items-center justify-center shadow-sm">
                                        <ArrowRight size={14} className="text-[#94A3B8]" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href="/get-licensed">
                            <Button variant="primary" size="lg">
                                Start Your Journey <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FEATURED COURSES ───────────────────────────────────── */}
            <section className="site-section bg-[#F8F9FC]">
                <div className="site-container">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <Badge variant="success" className="mb-3">Popular Courses</Badge>
                            <h2 className="text-4xl font-bold text-[#0F172A]">Start Learning Today</h2>
                        </div>
                        <Link href="/courses" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#1B3A6B] hover:text-[#122850] transition-colors">
                            View All Courses <ChevronRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCourses.map((course) => (
                            <Link key={course.id} href={`/courses/${course.slug}`}>
                                <Card hover className="h-full flex flex-col overflow-hidden p-0">
                                    {/* Thumbnail */}
                                    <div
                                        className="h-40 flex items-center justify-center relative overflow-hidden"
                                        style={{ background: `linear-gradient(135deg, ${course.thumbnail_color}, ${course.thumbnail_color}cc)` }}
                                    >
                                        <BookOpen size={48} className="text-white/30" />
                                        <Badge
                                            className="absolute top-3 left-3"
                                            variant={course.category === 'Pre-Licensing' ? 'info' : course.category === 'Exam Prep' ? 'accent' : 'success'}
                                        >
                                            {course.category}
                                        </Badge>
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <p className="text-xs text-[#64748B] mb-1">{course.category_path}</p>
                                        <h3 className="font-semibold text-[#0F172A] mb-2 leading-snug">{course.title}</h3>

                                        <div className="flex items-center gap-3 text-xs text-[#64748B] mb-4">
                                            <span className="flex items-center gap-1"><Clock size={12} />{course.hours} hours</span>
                                            <span className="flex items-center gap-1"><Star size={12} className="text-[#F5A623]" />{course.rating} ({course.review_count.toLocaleString()})</span>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-xl font-bold text-[#1B3A6B]">{formatCurrency(course.price_cents)}</span>
                                            <span className="text-sm font-medium text-[#1B3A6B] flex items-center gap-1">
                                                View Course <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-8 sm:hidden">
                        <Link href="/courses">
                            <Button variant="outline">View All Courses</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ───────────────────────────────────────── */}
            <section className="site-section bg-white">
                <div className="site-container">
                    <div className="text-center mb-12">
                        <Badge variant="accent" className="mb-4">Student Success</Badge>
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Trusted by 50,000+ Students</h2>
                        <p className="text-[#64748B] text-lg">Real results from real mortgage professionals.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {MOCK_TESTIMONIALS.map((t) => (
                            <Card key={t.id} className="flex flex-col gap-4">
                                <div className="flex gap-0.5">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} size={16} className="text-[#F5A623] fill-[#F5A623]" />
                                    ))}
                                </div>
                                <p className="text-[#334155] leading-relaxed italic">"{t.text}"</p>
                                <div className="mt-auto pt-4 border-t border-[#E2E8F0]">
                                    <div className="font-semibold text-[#0F172A]">{t.name}</div>
                                    <div className="text-sm text-[#64748B]">{t.role}</div>
                                    <div className="text-xs text-[#94A3B8] mt-0.5">{t.state}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRICING SNAPSHOT ───────────────────────────────────── */}
            <section className="site-section bg-[#F8F9FC]">
                <div className="site-container">
                    <div className="text-center mb-12">
                        <Badge variant="info" className="mb-4">Simple Pricing</Badge>
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Transparent, No Hidden Fees</h2>
                        <p className="text-[#64748B] text-lg">Pay per course or save with bundles.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { name: 'Pre-Licensing', price: 'From $299', desc: '20-hour NMLS-approved course for new MLOs', popular: false },
                            { name: 'CE Bundle', price: 'From $149', desc: 'Annual 8-hour continuing education for licensed MLOs', popular: true },
                            { name: 'Exam Prep', price: 'From $199', desc: '1,200+ practice questions + mock exams', popular: false },
                        ].map((plan) => (
                            <Card key={plan.name} className={`relative text-center ${plan.popular ? 'border-[#1B3A6B] ring-2 ring-[#1B3A6B]' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <Badge variant="default" className="bg-[#1B3A6B] text-white">Most Popular</Badge>
                                    </div>
                                )}
                                <h3 className="font-bold text-lg text-[#0F172A] mb-1">{plan.name}</h3>
                                <div className="text-3xl font-extrabold text-[#1B3A6B] my-3">{plan.price}</div>
                                <p className="text-sm text-[#64748B] mb-6">{plan.desc}</p>
                                <Link href="/courses">
                                    <Button variant={plan.popular ? 'primary' : 'outline'} fullWidth>Browse Courses</Button>
                                </Link>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/pricing" className="text-sm font-medium text-[#1B3A6B] hover:underline flex items-center gap-1 justify-center">
                            View full pricing & bundles <ChevronRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FAQ PREVIEW ────────────────────────────────────────── */}
            <section className="site-section bg-white">
                <div className="site-container max-w-3xl">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Common Questions</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        {[
                            { q: 'How long do I have access to a course?', a: 'Pre-licensing courses include 180 days of access. CE courses include 90 days. Exam prep includes 365 days.' },
                            { q: 'Are your courses NMLS-approved?', a: 'Yes. All courses are approved by the NMLS and meet state-specific requirements for mortgage loan originators.' },
                            { q: 'Can I study on my phone or tablet?', a: 'Absolutely. Our platform is fully mobile-responsive. Study anywhere, anytime.' },
                        ].map((item, i) => (
                            <Card key={i} className="flex flex-col gap-2">
                                <h4 className="font-semibold text-[#0F172A] flex items-start gap-2">
                                    <CheckCircle size={18} className="text-[#16A34A] mt-0.5 shrink-0" />
                                    {item.q}
                                </h4>
                                <p className="text-sm text-[#64748B] pl-6">{item.a}</p>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/faq">
                            <Button variant="outline">View All FAQs</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ──────────────────────────────────────────── */}
            <section className="site-section bg-gradient-to-br from-[#1B3A6B] to-[#0F172A]">
                <div className="site-container text-center">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        Ready to Get Licensed?
                    </h2>
                    <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
                        Join 50,000+ mortgage professionals who launched their careers with Mortgage Educators.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button size="lg" variant="accent" className="shadow-lg shadow-[#F5A623]/30">
                                Start Today — It's Fast
                                <ArrowRight size={18} />
                            </Button>
                        </Link>
                        <Link href="/courses">
                            <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                                Browse All Courses
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
