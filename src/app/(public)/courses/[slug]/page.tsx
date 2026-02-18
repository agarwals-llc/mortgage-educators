import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Clock, Star, Shield, Award, CheckCircle, ChevronRight, Users, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_COURSES } from '@/lib/data/mock';
import { formatCurrency } from '@/lib/utils/format';

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return MOCK_COURSES.map((c) => ({ slug: c.slug }));
}

export default function CourseDetailPage({ params }: Props) {
    const course = MOCK_COURSES.find((c) => c.slug === params.slug);
    if (!course) notFound();

    const whatYouLearn = [
        'Federal mortgage law and SAFE Act requirements',
        'Ethical standards and professional responsibility',
        'Loan origination process from application to closing',
        'Mortgage products, programs, and underwriting basics',
        'State-specific licensing laws and regulations',
        'Fair lending, consumer protection, and fraud prevention',
    ];

    return (
        <div className="pt-16 min-h-screen bg-[#F8F9FC]">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-[#E2E8F0]">
                <div className="site-container py-3">
                    <nav className="flex items-center gap-1.5 text-sm text-[#64748B]">
                        <Link href="/" className="hover:text-[#1B3A6B] transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/courses" className="hover:text-[#1B3A6B] transition-colors">Courses</Link>
                        <ChevronRight size={14} />
                        <Link href={`/courses?category=${course.category}`} className="hover:text-[#1B3A6B] transition-colors">{course.category}</Link>
                        <ChevronRight size={14} />
                        <span className="text-[#0F172A] font-medium truncate max-w-xs">{course.title}</span>
                    </nav>
                </div>
            </div>

            <div className="site-container py-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        <Badge
                            variant={course.category === 'Pre-Licensing' ? 'info' : course.category === 'Exam Prep' ? 'accent' : 'success'}
                            className="mb-4"
                        >
                            {course.category_path}
                        </Badge>

                        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">{course.title}</h1>
                        <p className="text-sm text-[#64748B] mb-4">NMLS Course ID: <span className="font-mono font-medium text-[#334155]">{course.nmls_course_id}</span></p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B] mb-6">
                            <span className="flex items-center gap-1.5">
                                <Star size={14} className="text-[#F5A623] fill-[#F5A623]" />
                                <strong className="text-[#0F172A]">{course.rating}</strong> ({course.review_count.toLocaleString()} reviews)
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Users size={14} />
                                {course.enrollment_count.toLocaleString()} students enrolled
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {course.hours} NMLS credit hours
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Shield size={14} className="text-[#16A34A]" />
                                NMLS Approved
                            </span>
                        </div>

                        {/* Description */}
                        <Card className="mb-6">
                            <h2 className="text-lg font-semibold text-[#0F172A] mb-3">About This Course</h2>
                            <p className="text-[#334155] leading-relaxed">{course.description}</p>
                            <p className="text-[#334155] leading-relaxed mt-3">
                                Our expert-designed curriculum follows the latest NMLS content outline and is regularly updated to reflect regulatory changes. You'll have {course.access_window_days} days of access from enrollment to complete the course at your own pace.
                            </p>
                        </Card>

                        {/* What you'll learn */}
                        <Card className="mb-6">
                            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">What You'll Learn</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {whatYouLearn.map((item, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                        <CheckCircle size={16} className="text-[#16A34A] mt-0.5 shrink-0" />
                                        <span className="text-sm text-[#334155]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Syllabus */}
                        {course.chapters.length > 0 && (
                            <Card className="mb-6">
                                <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Course Syllabus</h2>
                                <div className="flex flex-col divide-y divide-[#E2E8F0]">
                                    {course.chapters.map((ch, i) => (
                                        <div key={ch.id} className="flex items-center justify-between py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-[#EEF2F7] text-[#1B3A6B] text-xs font-bold flex items-center justify-center shrink-0">
                                                    {i + 1}
                                                </span>
                                                <span className="text-sm text-[#334155]">{ch.title}</span>
                                            </div>
                                            <span className="text-xs text-[#64748B] shrink-0 ml-4">{ch.duration}m</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Instructor */}
                        <Card>
                            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Your Instructor</h2>
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#2a5298] flex items-center justify-center text-white font-bold text-lg shrink-0">
                                    ME
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#0F172A]">Mortgage Educators Faculty</h3>
                                    <p className="text-sm text-[#64748B] mb-2">NMLS-Certified Mortgage Education Specialists</p>
                                    <p className="text-sm text-[#334155] leading-relaxed">
                                        Our instructors are licensed mortgage professionals with decades of combined industry experience. All course content is reviewed by NMLS compliance experts to ensure accuracy and regulatory compliance.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Purchase card — sticky */}
                    <div className="lg:w-80 shrink-0">
                        <div className="sticky top-24">
                            <Card className="border-2 border-[#1B3A6B]">
                                <div className="text-center mb-6">
                                    <div className="text-4xl font-extrabold text-[#1B3A6B] mb-1">{formatCurrency(course.price_cents)}</div>
                                    <p className="text-sm text-[#64748B]">One-time payment · Instant access</p>
                                </div>

                                {/* Coupon */}
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Coupon code"
                                        className="flex-1 h-9 px-3 text-sm rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]"
                                    />
                                    <Button variant="secondary" size="sm">Apply</Button>
                                </div>

                                <Link href="/register">
                                    <Button variant="primary" size="lg" fullWidth className="mb-3">
                                        Enroll Now
                                        <ChevronRight size={18} />
                                    </Button>
                                </Link>

                                <p className="text-xs text-center text-[#64748B] mb-5">30-day money-back guarantee</p>

                                <div className="flex flex-col gap-2.5 text-sm text-[#334155]">
                                    {[
                                        { icon: Clock, text: `${course.hours} NMLS credit hours` },
                                        { icon: Shield, text: `NMLS Course ID: ${course.nmls_course_id}` },
                                        { icon: Award, text: 'Certificate of completion' },
                                        { icon: BookOpen, text: `${course.access_window_days} days of access` },
                                        { icon: Lock, text: 'Secure, encrypted platform' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2.5">
                                            <item.icon size={15} className="text-[#1B3A6B] shrink-0" />
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
