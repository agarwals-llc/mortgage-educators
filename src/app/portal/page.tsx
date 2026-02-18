'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LayoutGrid, List, Filter, BookOpen, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { MOCK_ENROLLMENTS } from '@/lib/data/mock';
import { cn } from '@/lib/utils/cn';
import { formatTimeRemaining } from '@/lib/utils/format';

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'active' | 'completed';

function getStatusBadge(status: string) {
    switch (status) {
        case 'active': return <Badge variant="success" dot>Active</Badge>;
        case 'completed': return <Badge variant="accent" dot>Completed</Badge>;
        case 'expired': return <Badge variant="danger" dot>Expired</Badge>;
        default: return <Badge variant="info" dot>Not Started</Badge>;
    }
}

function getCTALabel(enrollment: typeof MOCK_ENROLLMENTS[0]) {
    if (enrollment.status === 'completed') return { label: 'View Certificate', variant: 'accent' as const };
    const isExpired = new Date(enrollment.access_expires_at) < new Date();
    if (isExpired) return { label: 'Renew Access', variant: 'outline' as const };
    if (enrollment.progress_percent === 0) return { label: 'Start Course', variant: 'primary' as const };
    return { label: 'Resume Course', variant: 'primary' as const };
}

function TimeRemainingChip({ expiresAt }: { expiresAt: string }) {
    const time = formatTimeRemaining(new Date(expiresAt));
    if (time.expired) return <span className="text-xs font-medium text-[#DC2626] flex items-center gap-1"><Clock size={11} />Access Expired</span>;
    const color = time.urgent ? 'text-[#DC2626]' : time.warning ? 'text-[#D97706]' : 'text-[#64748B]';
    return (
        <span className={cn('text-xs font-medium flex items-center gap-1', color)}>
            <Clock size={11} />
            {time.days}d {time.hours}h remaining
        </span>
    );
}

export default function MyCourses() {
    const [view, setView] = useState<ViewMode>('grid');
    const [filter, setFilter] = useState<FilterType>('all');

    const filtered = filter === 'all'
        ? MOCK_ENROLLMENTS
        : MOCK_ENROLLMENTS.filter((e) => e.status === filter);

    return (
        <div>
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">My Courses</h1>
                    <p className="text-sm text-[#64748B] mt-0.5">{MOCK_ENROLLMENTS.length} enrolled courses</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Filter */}
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as FilterType)}
                        className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] text-[#334155]"
                    >
                        <option value="all">All Courses</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>

                    {/* View toggle */}
                    <div className="flex items-center bg-white border border-[#E2E8F0] rounded-lg p-1">
                        <button
                            onClick={() => setView('grid')}
                            className={cn('p-1.5 rounded-md transition-colors', view === 'grid' ? 'bg-[#1B3A6B] text-white' : 'text-[#64748B] hover:text-[#334155]')}
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={cn('p-1.5 rounded-md transition-colors', view === 'list' ? 'bg-[#1B3A6B] text-white' : 'text-[#64748B] hover:text-[#334155]')}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
                <div className="text-center py-20">
                    <BookOpen size={48} className="text-[#CBD5E1] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#334155] mb-2">No courses found</h3>
                    <p className="text-[#64748B] mb-6">You haven't enrolled in any courses yet.</p>
                    <Link href="/courses"><Button variant="primary">Browse Courses</Button></Link>
                </div>
            )}

            {/* Grid view */}
            {view === 'grid' && filtered.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map((enrollment) => {
                        const cta = getCTALabel(enrollment);
                        return (
                            <Card key={enrollment.id} className="flex flex-col overflow-hidden p-0">
                                {/* Thumbnail */}
                                <div
                                    className="h-36 flex items-center justify-center relative"
                                    style={{ background: `linear-gradient(135deg, ${enrollment.course.thumbnail_color}, ${enrollment.course.thumbnail_color}aa)` }}
                                >
                                    <BookOpen size={40} className="text-white/20" />
                                    <div className="absolute top-3 left-3">{getStatusBadge(enrollment.status)}</div>
                                </div>

                                <div className="p-4 flex flex-col flex-1 gap-3">
                                    {/* Category path + course ID */}
                                    <div>
                                        <p className="text-xs text-[#94A3B8]">{enrollment.course.category_path}</p>
                                        <p className="text-xs text-[#94A3B8] font-mono">ID: {enrollment.course.nmls_course_id}</p>
                                    </div>

                                    <h3 className="font-semibold text-[#0F172A] text-sm leading-snug">{enrollment.course.title}</h3>

                                    {/* Progress */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-xs text-[#64748B]">
                                                {enrollment.chapters_completed} of {enrollment.chapters_total} chapters
                                            </span>
                                            <span className={cn('text-xs font-bold', enrollment.progress_percent === 100 ? 'text-[#F5A623]' : 'text-[#1B3A6B]')}>
                                                {enrollment.progress_percent}%
                                            </span>
                                        </div>
                                        <ProgressBar value={enrollment.progress_percent} size="md" />
                                    </div>

                                    {/* Time remaining */}
                                    <TimeRemainingChip expiresAt={enrollment.access_expires_at} />

                                    {/* CTA */}
                                    <Link href={`/course/${enrollment.course_id}`} className="mt-auto">
                                        <Button variant={cta.variant} fullWidth size="sm">
                                            {cta.label} <ArrowRight size={14} />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* List view */}
            {view === 'list' && filtered.length > 0 && (
                <div className="flex flex-col gap-3">
                    {filtered.map((enrollment) => {
                        const cta = getCTALabel(enrollment);
                        return (
                            <Card key={enrollment.id} className="flex items-center gap-4 p-4">
                                {/* Thumbnail */}
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: `linear-gradient(135deg, ${enrollment.course.thumbnail_color}, ${enrollment.course.thumbnail_color}aa)` }}
                                >
                                    <BookOpen size={24} className="text-white/40" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-[#94A3B8]">{enrollment.course.category_path} · {enrollment.course.nmls_course_id}</p>
                                    <h3 className="font-semibold text-[#0F172A] text-sm truncate">{enrollment.course.title}</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-2 flex-1 max-w-xs">
                                            <ProgressBar value={enrollment.progress_percent} size="sm" className="flex-1" />
                                            <span className="text-xs font-bold text-[#1B3A6B] shrink-0">{enrollment.progress_percent}%</span>
                                        </div>
                                        <TimeRemainingChip expiresAt={enrollment.access_expires_at} />
                                        {getStatusBadge(enrollment.status)}
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link href={`/course/${enrollment.course_id}`} className="shrink-0">
                                    <Button variant={cta.variant} size="sm">
                                        {cta.label} <ArrowRight size={14} />
                                    </Button>
                                </Link>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Browse more */}
            <div className="mt-8 text-center">
                <Link href="/courses">
                    <Button variant="outline">
                        Browse More Courses <ChevronRight size={16} />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
