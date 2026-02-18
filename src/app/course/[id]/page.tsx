'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRight, Clock, BookOpen, CheckCircle, PlayCircle, Circle, ArrowRight, AlertTriangle, RotateCcw, Award } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { MOCK_ENROLLMENTS } from '@/lib/data/mock';
import { formatTimeRemaining } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

export function generateStaticParams() {
    return MOCK_ENROLLMENTS.map((e) => ({ id: e.course_id }));
}

interface Props {
    params: { id: string };
}

function useCountdown(expiresAt: Date) {
    const [time, setTime] = useState(() => formatTimeRemaining(expiresAt));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatTimeRemaining(expiresAt));
        }, 60000); // update every minute
        return () => clearInterval(interval);
    }, [expiresAt]);

    return time;
}

function CountdownDisplay({ expiresAt }: { expiresAt: string }) {
    const time = useCountdown(new Date(expiresAt));

    if (time.expired) {
        return (
            <div className="flex items-center gap-2 bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3">
                <AlertTriangle size={18} className="text-[#DC2626] shrink-0" />
                <div>
                    <p className="text-sm font-bold text-[#DC2626]">Access Expired</p>
                    <p className="text-xs text-[#DC2626]/70">Renew to continue learning</p>
                </div>
            </div>
        );
    }

    const colorClass = time.urgent
        ? 'text-[#DC2626] bg-[#FEF2F2] border-[#FECACA]'
        : time.warning
            ? 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]'
            : 'text-[#1B3A6B] bg-[#EEF2F7] border-[#BFDBFE]';

    return (
        <div className={cn('flex items-center gap-3 rounded-xl px-4 py-3 border', colorClass)}>
            <Clock size={18} className="shrink-0" />
            <div>
                <p className="text-xs font-medium opacity-70">Access Remaining</p>
                <p className="text-lg font-bold font-mono tracking-wider">
                    {String(time.days).padStart(2, '0')}d {String(time.hours).padStart(2, '0')}h {String(time.minutes).padStart(2, '0')}m
                </p>
            </div>
        </div>
    );
}

function ChapterIcon({ status }: { status: 'completed' | 'in_progress' | 'not_started' }) {
    if (status === 'completed') return <CheckCircle size={18} className="text-[#16A34A] shrink-0" />;
    if (status === 'in_progress') return <PlayCircle size={18} className="text-[#1B3A6B] shrink-0" />;
    return <Circle size={18} className="text-[#CBD5E1] shrink-0" />;
}

export default function CourseDetailPortalPage({ params }: Props) {
    const enrollment = MOCK_ENROLLMENTS.find((e) => e.course_id === params.id);

    if (!enrollment) {
        return (
            <div className="text-center py-20">
                <p className="text-[#64748B]">Course not found.</p>
                <Link href="/portal"><Button variant="primary" className="mt-4">Back to My Courses</Button></Link>
            </div>
        );
    }

    const { course } = enrollment;
    const isExpired = new Date(enrollment.access_expires_at) < new Date();
    const isComplete = enrollment.status === 'completed';

    // Determine chapter statuses
    const chapters = course.chapters.map((ch, i) => {
        const completedCount = enrollment.chapters_completed;
        if (i < completedCount) return { ...ch, status: 'completed' as const };
        if (i === completedCount && !isComplete) return { ...ch, status: 'in_progress' as const };
        return { ...ch, status: 'not_started' as const };
    });

    function getCTAButton() {
        if (isComplete) return <Link href={`/portal/certificates`}><Button variant="accent" size="lg"><Award size={18} />View Certificate</Button></Link>;
        if (isExpired) return <Button variant="danger" size="lg"><RotateCcw size={18} />Renew Access</Button>;
        if (enrollment!.progress_percent === 0) return <Link href={`/course/${params.id}/identity-check`}><Button variant="primary" size="lg"><ArrowRight size={18} />Start Course</Button></Link>;
        return <Link href={`/course/${params.id}/identity-check`}><Button variant="primary" size="lg"><PlayCircle size={18} />Resume Course</Button></Link>;
    }

    return (
        <div>
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-6">
                <Link href="/portal" className="hover:text-[#1B3A6B] transition-colors">My Courses</Link>
                <ChevronRight size={14} />
                <span className="text-[#0F172A] font-medium truncate">{course.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main content */}
                <div className="flex-1 min-w-0">
                    {/* Course hero */}
                    <Card className="mb-6 overflow-hidden p-0">
                        <div
                            className="h-40 flex items-center justify-center"
                            style={{ background: `linear-gradient(135deg, ${course.thumbnail_color}, ${course.thumbnail_color}aa)` }}
                        >
                            <BookOpen size={56} className="text-white/20" />
                        </div>
                        <div className="p-6">
                            <Badge
                                variant={course.category === 'Pre-Licensing' ? 'info' : course.category === 'Exam Prep' ? 'accent' : 'success'}
                                className="mb-3"
                            >
                                {course.category_path}
                            </Badge>
                            <h1 className="text-2xl font-bold text-[#0F172A] mb-1">{course.title}</h1>
                            <p className="text-sm text-[#64748B] font-mono mb-4">NMLS ID: {course.nmls_course_id}</p>

                            {/* Progress */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-[#64748B]">
                                        {enrollment.chapters_completed} of {enrollment.chapters_total} chapters complete
                                    </span>
                                    <span className={cn('text-sm font-bold', isComplete ? 'text-[#F5A623]' : 'text-[#1B3A6B]')}>
                                        {enrollment.progress_percent}%
                                    </span>
                                </div>
                                <ProgressBar value={enrollment.progress_percent} size="lg" />
                            </div>

                            {/* CTA */}
                            <div className="flex items-center gap-3 flex-wrap">
                                {getCTAButton()}
                                {!isComplete && !isExpired && (
                                    <span className="text-sm text-[#64748B]">
                                        {enrollment.progress_percent > 0 ? `Last chapter: ${chapters.find(c => c.status === 'in_progress')?.title || 'In progress'}` : 'Ready to start'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Chapter list */}
                    <Card>
                        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Course Chapters</h2>
                        <div className="flex flex-col divide-y divide-[#E2E8F0]">
                            {chapters.map((ch, i) => (
                                <div
                                    key={ch.id}
                                    className={cn(
                                        'flex items-center gap-3 py-3.5',
                                        ch.status === 'in_progress' && 'bg-[#EEF2F7] -mx-6 px-6 rounded-lg'
                                    )}
                                >
                                    <ChapterIcon status={ch.status} />
                                    <div className="flex-1 min-w-0">
                                        <p className={cn(
                                            'text-sm font-medium',
                                            ch.status === 'completed' ? 'text-[#64748B] line-through' : 'text-[#0F172A]',
                                            ch.status === 'in_progress' && 'no-underline text-[#1B3A6B]'
                                        )}>
                                            {i + 1}. {ch.title}
                                        </p>
                                    </div>
                                    <span className="text-xs text-[#94A3B8] shrink-0">{ch.duration}m</span>
                                    {ch.status === 'in_progress' && (
                                        <Badge variant="info" className="shrink-0">In Progress</Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sticky sidebar */}
                <div className="lg:w-72 shrink-0">
                    <div className="sticky top-20 flex flex-col gap-4">
                        {/* Countdown */}
                        <CountdownDisplay expiresAt={enrollment.access_expires_at} />

                        {/* Quick links */}
                        <Card>
                            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Quick Links</h3>
                            <div className="flex flex-col gap-1">
                                {[
                                    { label: 'Course Syllabus', href: '#chapters' },
                                    { label: 'My Assignments', href: '/portal/assignments' },
                                    { label: 'My Certificates', href: '/portal/certificates' },
                                    { label: 'Contact Support', href: '/support' },
                                ].map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#334155] hover:bg-[#F8F9FC] hover:text-[#1B3A6B] transition-colors"
                                    >
                                        {link.label}
                                        <ChevronRight size={14} className="text-[#94A3B8]" />
                                    </Link>
                                ))}
                            </div>
                        </Card>

                        {/* Course info */}
                        <Card>
                            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Course Info</h3>
                            <div className="flex flex-col gap-2 text-sm text-[#64748B]">
                                <div className="flex justify-between">
                                    <span>Total Hours</span>
                                    <span className="font-medium text-[#334155]">{course.hours}h</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Chapters</span>
                                    <span className="font-medium text-[#334155]">{enrollment.chapters_total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Access Window</span>
                                    <span className="font-medium text-[#334155]">{course.access_window_days} days</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Identity Check</span>
                                    <span className="font-medium text-[#334155]">{course.identity_check_enabled ? 'Required' : 'Not Required'}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
