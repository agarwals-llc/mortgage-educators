import Link from 'next/link';
import { ArrowRight, CheckCircle, BookOpen, Target, Clock, Award, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const EXAM_PACKAGES = [
    {
        title: 'NMLS Exam Prep — Essential',
        price: 199,
        features: ['500+ practice questions', 'Full-length mock exams', 'Detailed answer explanations', '90-day access'],
        popular: false,
    },
    {
        title: 'NMLS Exam Prep — Ultimate',
        price: 299,
        features: ['1,200+ practice questions', '5 full-length mock exams', 'Video review lessons', 'Flashcard system', '365-day access', 'Pass guarantee'],
        popular: true,
    },
    {
        title: 'Exam Prep + Pre-Licensing Bundle',
        price: 449,
        features: ['Everything in Ultimate', '20-hour pre-licensing course', 'Best value for new MLOs', '365-day access'],
        popular: false,
    },
];

const TOPICS = [
    { title: 'Federal Mortgage Laws', pct: 23, color: '#1B3A6B' },
    { title: 'General Mortgage Knowledge', pct: 23, color: '#2a5298' },
    { title: 'Mortgage Loan Origination', pct: 25, color: '#F5A623' },
    { title: 'Ethics', pct: 16, color: '#16A34A' },
    { title: 'Uniform State Content', pct: 13, color: '#DC2626' },
];

export default function ExamPrepPage() {
    return (
        <div className="overflow-x-hidden">
            {/* Hero */}
            <section className="relative pt-16 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80&auto=format&fit=crop')` }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/90 via-[#1B3A6B]/82 to-[#0F172A]/88" />
                <div className="site-container relative z-10 py-20">
                    <div className="max-w-3xl">
                        <Badge variant="accent" className="mb-5">NMLS Exam Prep</Badge>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] mb-5">
                            Pass the NMLS Exam<br /><span className="text-[#F5A623]">On Your First Try</span>
                        </h1>
                        <p className="text-xl text-white/75 mb-8 max-w-2xl">
                            1,200+ practice questions, 5 full-length mock exams, and video lessons — everything you need to ace the SAFE MLO exam.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="#packages">
                                <Button size="lg" variant="accent" className="font-semibold shadow-xl shadow-[#F5A623]/25">
                                    View Packages <ArrowRight size={18} />
                                </Button>
                            </Link>
                            <Link href="/courses">
                                <button className="h-12 px-6 text-base font-semibold rounded-xl border-2 border-white/40 text-white hover:bg-white/10 transition-all">
                                    Browse All Courses
                                </button>
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-6 mt-10">
                            {[{ v: '94%', l: 'First-time pass rate' }, { v: '1,200+', l: 'Practice questions' }, { v: '4.9★', l: 'Student rating' }].map(s => (
                                <div key={s.l} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-2">
                                    <span className="text-lg font-extrabold text-[#F5A623]">{s.v}</span>
                                    <span className="text-sm text-white/70">{s.l}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative z-10">
                    <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60L1440 15C1200 50 960 0 720 20C480 40 240 5 0 30L0 60Z" fill="#F8F9FC" /></svg>
                </div>
            </section>

            {/* Exam breakdown */}
            <section className="site-section bg-[#F8F9FC]">
                <div className="site-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="info" className="mb-4">What's on the Exam</Badge>
                            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">NMLS SAFE Exam Breakdown</h2>
                            <p className="text-[#64748B] mb-8">The NMLS SAFE exam has 120 questions (115 scored + 5 unscored). You need a 75% to pass. Here's the topic breakdown:</p>
                            <div className="flex flex-col gap-4">
                                {TOPICS.map((t) => (
                                    <div key={t.title}>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="font-medium text-[#334155]">{t.title}</span>
                                            <span className="font-bold text-[#0F172A]">{t.pct}%</span>
                                        </div>
                                        <div className="h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                                            <div className="h-full rounded-full" style={{ width: `${t.pct * 4}%`, backgroundColor: t.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Target, title: '120 Questions', sub: '115 scored + 5 unscored' },
                                { icon: Clock, title: '190 Minutes', sub: '3 hours 10 minutes' },
                                { icon: TrendingUp, title: '75% to Pass', sub: '86 correct answers' },
                                { icon: Award, title: 'Instant Results', sub: 'Know your score immediately' },
                            ].map((s) => (
                                <Card key={s.title} className="flex flex-col gap-3">
                                    <s.icon size={22} className="text-[#1B3A6B]" />
                                    <div>
                                        <div className="font-bold text-[#0F172A]">{s.title}</div>
                                        <div className="text-sm text-[#64748B]">{s.sub}</div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section id="packages" className="site-section bg-white">
                <div className="site-container">
                    <div className="text-center mb-12">
                        <Badge variant="success" className="mb-4">Exam Prep Packages</Badge>
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Choose Your Study Package</h2>
                        <p className="text-[#64748B] text-lg">All packages include our pass guarantee on Ultimate tier.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {EXAM_PACKAGES.map((pkg) => (
                            <div key={pkg.title} className={`relative bg-white rounded-2xl border flex flex-col p-6 ${pkg.popular ? 'border-[#1B3A6B] ring-2 ring-[#1B3A6B] shadow-xl shadow-[#1B3A6B]/10' : 'border-[#E2E8F0] shadow-sm'}`}>
                                {pkg.popular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                        <span className="bg-[#1B3A6B] text-white text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</span>
                                    </div>
                                )}
                                <h3 className="font-bold text-[#0F172A] mb-2">{pkg.title}</h3>
                                <div className="text-4xl font-extrabold text-[#1B3A6B] mb-5">${pkg.price}</div>
                                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                                    {pkg.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-sm text-[#334155]">
                                            <CheckCircle size={15} className="text-[#16A34A] mt-0.5 shrink-0" />{f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/courses">
                                    <Button variant={pkg.popular ? 'primary' : 'outline'} fullWidth>Enroll Now</Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="site-section bg-gradient-to-br from-[#1B3A6B] to-[#0F172A]">
                <div className="site-container text-center">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Pass Your NMLS Exam?</h2>
                    <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Join thousands of MLOs who passed on their first try with Mortgage Educators.</p>
                    <Link href="/courses">
                        <Button size="lg" variant="accent" className="font-semibold shadow-xl shadow-[#F5A623]/25">
                            Start Studying Now <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
