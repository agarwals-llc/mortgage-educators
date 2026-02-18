'use client';

import { useState } from 'react';
import { ClipboardList, Clock, ArrowRight, RotateCcw, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_ASSIGNMENTS } from '@/lib/data/mock';
import { formatDateShort } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

type StatusFilter = 'all' | 'pending' | 'submitted' | 'graded' | 'overdue';

function getStatusBadge(status: string) {
    switch (status) {
        case 'pending': return <Badge variant="info" dot>Pending</Badge>;
        case 'submitted': return <Badge variant="warning" dot>Submitted</Badge>;
        case 'graded': return <Badge variant="success" dot>Graded</Badge>;
        case 'overdue': return <Badge variant="danger" dot>Overdue</Badge>;
        case 'returned': return <Badge variant="warning" dot>Returned</Badge>;
        default: return <Badge dot>Unknown</Badge>;
    }
}

function getCTA(status: string) {
    switch (status) {
        case 'pending': return { label: 'Start', icon: ArrowRight, variant: 'primary' as const };
        case 'submitted': return { label: 'View', icon: Eye, variant: 'secondary' as const };
        case 'graded': return { label: 'View', icon: Eye, variant: 'secondary' as const };
        case 'overdue': return { label: 'Retry', icon: RotateCcw, variant: 'danger' as const };
        case 'returned': return { label: 'Revise', icon: ArrowRight, variant: 'outline' as const };
        default: return { label: 'View', icon: Eye, variant: 'secondary' as const };
    }
}

export default function AssignmentsPage() {
    const [filter, setFilter] = useState<StatusFilter>('all');

    const filtered = filter === 'all'
        ? MOCK_ASSIGNMENTS
        : MOCK_ASSIGNMENTS.filter((a) => a.status === filter);

    const tabs: { label: string; value: StatusFilter }[] = [
        { label: 'All', value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Graded', value: 'graded' },
        { label: 'Overdue', value: 'overdue' },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0F172A]">Assignments</h1>
                <p className="text-sm text-[#64748B] mt-0.5">{MOCK_ASSIGNMENTS.length} total assignments</p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 mb-6 bg-white border border-[#E2E8F0] rounded-xl p-1 w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setFilter(tab.value)}
                        className={cn(
                            'px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150',
                            filter === tab.value
                                ? 'bg-[#1B3A6B] text-white shadow-sm'
                                : 'text-[#64748B] hover:text-[#334155]'
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block">
                <Card padding="none" className="overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#F8F9FC] border-b border-[#E2E8F0]">
                                <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Assignment</th>
                                <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Course</th>
                                <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Due Date</th>
                                <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Status</th>
                                <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Attempts</th>
                                <th className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide px-5 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0]">
                            {filtered.map((assignment) => {
                                const cta = getCTA(assignment.status);
                                const isMaxAttempts = assignment.attempts >= assignment.max_attempts;
                                return (
                                    <tr key={assignment.id} className="hover:bg-[#F8F9FC] transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="font-medium text-sm text-[#0F172A]">{assignment.title}</div>
                                            {assignment.grade !== undefined && (
                                                <div className="text-xs text-[#16A34A] font-semibold mt-0.5">Score: {assignment.grade}%</div>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-sm text-[#64748B]">{assignment.course_title}</td>
                                        <td className="px-5 py-4">
                                            <span className={cn('text-sm flex items-center gap-1', assignment.status === 'overdue' ? 'text-[#DC2626]' : 'text-[#64748B]')}>
                                                <Clock size={12} />
                                                {formatDateShort(assignment.due_date)}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">{getStatusBadge(assignment.status)}</td>
                                        <td className="px-5 py-4">
                                            <span className={cn('text-sm font-medium', isMaxAttempts ? 'text-[#DC2626]' : 'text-[#64748B]')}>
                                                {assignment.attempts}/{assignment.max_attempts}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <Button variant={cta.variant} size="sm" disabled={isMaxAttempts && assignment.status !== 'graded'}>
                                                <cta.icon size={14} />
                                                {cta.label}
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-[#64748B]">
                            <ClipboardList size={32} className="mx-auto mb-3 text-[#CBD5E1]" />
                            <p>No assignments found.</p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden flex flex-col gap-3">
                {filtered.map((assignment) => {
                    const cta = getCTA(assignment.status);
                    return (
                        <Card key={assignment.id}>
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-sm text-[#0F172A] flex-1 mr-3">{assignment.title}</h3>
                                {getStatusBadge(assignment.status)}
                            </div>
                            <p className="text-xs text-[#64748B] mb-3">{assignment.course_title}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-xs text-[#64748B]">
                                    <span className="flex items-center gap-1"><Clock size={11} />{formatDateShort(assignment.due_date)}</span>
                                    <span>{assignment.attempts}/{assignment.max_attempts} attempts</span>
                                </div>
                                <Button variant={cta.variant} size="sm">
                                    <cta.icon size={13} />{cta.label}
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
