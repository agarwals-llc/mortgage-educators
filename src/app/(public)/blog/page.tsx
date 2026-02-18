import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const POSTS = [
    {
        slug: 'nmls-ce-requirements-2026',
        category: 'Continuing Education',
        categoryVariant: 'info' as const,
        title: '2026 NMLS CE Requirements: Everything You Need to Know',
        excerpt: 'The 2026 CE renewal season is here. Here\'s a complete breakdown of what hours you need, state-specific requirements, and how to complete your CE before the deadline.',
        date: 'Feb 10, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop',
        featured: true,
    },
    {
        slug: 'how-to-pass-nmls-exam',
        category: 'Exam Prep',
        categoryVariant: 'accent' as const,
        title: 'How to Pass the NMLS SAFE Exam on Your First Try',
        excerpt: 'With a 94% first-time pass rate among our students, we know what works. Here are the study strategies and resources that make the difference.',
        date: 'Jan 28, 2026',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop',
        featured: false,
    },
    {
        slug: 'mortgage-industry-trends-2026',
        category: 'Industry News',
        categoryVariant: 'success' as const,
        title: 'Mortgage Industry Trends to Watch in 2026',
        excerpt: 'From interest rate shifts to new CFPB regulations, here\'s what mortgage professionals need to know heading into 2026.',
        date: 'Jan 15, 2026',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop',
        featured: false,
    },
    {
        slug: 'pre-licensing-guide',
        category: 'Getting Licensed',
        categoryVariant: 'info' as const,
        title: 'The Complete Guide to Getting Your MLO License in 2026',
        excerpt: 'Step-by-step guide to becoming a licensed Mortgage Loan Originator — from pre-licensing education to passing the NMLS exam and getting your state license.',
        date: 'Jan 5, 2026',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80&auto=format&fit=crop',
        featured: false,
    },
    {
        slug: 'ce-deadline-tips',
        category: 'Continuing Education',
        categoryVariant: 'info' as const,
        title: '5 Tips to Complete Your CE Before the Deadline',
        excerpt: 'Don\'t wait until the last minute. Here are five proven strategies to get your CE done efficiently and avoid the holiday rush.',
        date: 'Dec 20, 2025',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
        featured: false,
    },
    {
        slug: 'nmls-renewal-checklist',
        category: 'Compliance',
        categoryVariant: 'accent' as const,
        title: 'NMLS License Renewal Checklist for 2026',
        excerpt: 'A complete checklist to ensure your NMLS license renewal goes smoothly — CE hours, background checks, fees, and more.',
        date: 'Dec 10, 2025',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop',
        featured: false,
    },
];

export default function BlogPage() {
    const [featured, ...rest] = POSTS;

    return (
        <div className="overflow-x-hidden">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#0F172A] via-[#1B3A6B] to-[#0F172A] pt-28 pb-16">
                <div className="site-container text-center">
                    <Badge variant="info" className="mb-5">Mortgage Educators Blog</Badge>
                    <h1 className="text-5xl font-extrabold text-white mb-5">
                        Insights for <span className="text-[#F5A623]">Mortgage Professionals</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Industry news, licensing guides, CE tips, and exam prep strategies — written by mortgage education experts.
                    </p>
                </div>
                <div className="mt-8">
                    <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60L1440 15C1200 50 960 0 720 20C480 40 240 5 0 30L0 60Z" fill="#F8F9FC" /></svg>
                </div>
            </section>

            {/* Featured post */}
            <section className="site-section bg-[#F8F9FC]">
                <div className="site-container">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#0F172A]">Featured Article</h2>
                    </div>
                    <Link href={`/blog/${featured.slug}`} className="group block">
                        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="h-64 lg:h-auto overflow-hidden">
                                    <img
                                        src={featured.image}
                                        alt={featured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <Badge variant={featured.categoryVariant} className="self-start mb-4">{featured.category}</Badge>
                                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-[#1B3A6B] transition-colors">{featured.title}</h3>
                                    <p className="text-[#64748B] mb-6 leading-relaxed">{featured.excerpt}</p>
                                    <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
                                        <span className="flex items-center gap-1.5"><Calendar size={13} />{featured.date}</span>
                                        <span className="flex items-center gap-1.5"><Clock size={13} />{featured.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* All posts */}
            <section className="pb-20 bg-[#F8F9FC]">
                <div className="site-container">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#0F172A]">Recent Articles</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rest.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <Badge variant={post.categoryVariant} className="self-start mb-3">{post.category}</Badge>
                                        <h3 className="font-bold text-[#0F172A] mb-2 group-hover:text-[#1B3A6B] transition-colors leading-snug">{post.title}</h3>
                                        <p className="text-sm text-[#64748B] mb-4 leading-relaxed flex-1">{post.excerpt}</p>
                                        <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                                            <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                                            <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="site-section bg-gradient-to-br from-[#1B3A6B] to-[#0F172A]">
                <div className="site-container text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-3">Stay Up to Date</h2>
                    <p className="text-white/70 mb-8 max-w-lg mx-auto">Get the latest mortgage licensing news, CE deadline reminders, and industry insights delivered to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 h-12 px-4 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-sm"
                        />
                        <Button variant="accent" className="font-semibold shrink-0">
                            Subscribe <ArrowRight size={16} />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
