import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
    value: number; // 0–100
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    label?: string;
    className?: string;
}

const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
};

export function ProgressBar({ value, size = 'md', showLabel, label, className }: ProgressBarProps) {
    const clamped = Math.min(100, Math.max(0, value));
    const isComplete = clamped === 100;

    return (
        <div className={cn('w-full', className)}>
            {(showLabel || label) && (
                <div className="flex items-center justify-between mb-1.5">
                    {label && <span className="text-xs text-[#64748B]">{label}</span>}
                    {showLabel && (
                        <span className={cn('text-xs font-semibold', isComplete ? 'text-[#F5A623]' : 'text-[#1B3A6B]')}>
                            {clamped}%
                        </span>
                    )}
                </div>
            )}
            <div className={cn('w-full bg-[#E2E8F0] rounded-full overflow-hidden', sizeClasses[size])}>
                <div
                    className={cn(
                        'h-full rounded-full transition-all duration-700 ease-out',
                        isComplete
                            ? 'bg-gradient-to-r from-[#d4891a] to-[#F5A623]'
                            : 'bg-gradient-to-r from-[#1B3A6B] to-[#2a5298]'
                    )}
                    style={{ width: `${clamped}%` }}
                />
            </div>
        </div>
    );
}
