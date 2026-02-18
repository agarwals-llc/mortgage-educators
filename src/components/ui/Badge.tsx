import { cn } from '@/lib/utils/cn';
import { HTMLAttributes } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-[#F1F5F9] text-[#475569]',
    success: 'bg-[#F0FDF4] text-[#16A34A]',
    warning: 'bg-[#FFFBEB] text-[#D97706]',
    danger: 'bg-[#FEF2F2] text-[#DC2626]',
    info: 'bg-[#EFF6FF] text-[#2563EB]',
    accent: 'bg-[#FFF7ED] text-[#F5A623]',
    outline: 'border border-[#E2E8F0] text-[#64748B] bg-white',
};

const dotColors: Record<BadgeVariant, string> = {
    default: 'bg-[#94A3B8]',
    success: 'bg-[#16A34A]',
    warning: 'bg-[#D97706]',
    danger: 'bg-[#DC2626]',
    info: 'bg-[#2563EB]',
    accent: 'bg-[#F5A623]',
    outline: 'bg-[#94A3B8]',
};

export function Badge({ variant = 'default', dot, className, children, ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
                variantClasses[variant],
                className
            )}
            {...props}
        >
            {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
            {children}
        </span>
    );
}
