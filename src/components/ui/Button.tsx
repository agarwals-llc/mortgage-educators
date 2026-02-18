'use client';

import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    fullWidth?: boolean;
}

const variantClasses = {
    primary: 'bg-[#1B3A6B] text-white hover:bg-[#122850] active:bg-[#0e1f3d] shadow-sm',
    secondary: 'bg-[#F8F9FC] text-[#1B3A6B] border border-[#E2E8F0] hover:bg-[#EEF2F7] hover:border-[#CBD5E1]',
    ghost: 'text-[#1B3A6B] hover:bg-[#EEF2F7]',
    outline: 'border border-[#1B3A6B] text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white',
    danger: 'bg-[#DC2626] text-white hover:bg-[#b91c1c] shadow-sm',
    accent: 'bg-[#F5A623] text-white hover:bg-[#d4891a] shadow-sm',
};

const sizeClasses = {
    sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
    md: 'h-10 px-4 text-sm rounded-lg gap-2',
    lg: 'h-12 px-6 text-base rounded-xl gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', loading, fullWidth, className, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B] focus-visible:ring-offset-2',
                    variantClasses[variant],
                    sizeClasses[size],
                    fullWidth && 'w-full',
                    className
                )}
                {...props}
            >
                {loading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 16} />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
