import { cn } from '@/lib/utils/cn';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ hover, padding = 'md', className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-xl border border-[#E2E8F0]',
                'shadow-[0_1px_4px_rgba(0,0,0,0.08)]',
                hover && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer',
                padding === 'none' && 'p-0',
                padding === 'sm' && 'p-4',
                padding === 'md' && 'p-6',
                padding === 'lg' && 'p-8',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('flex items-center justify-between mb-4', className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={cn('text-lg font-semibold text-[#0F172A]', className)} {...props}>
            {children}
        </h3>
    );
}
