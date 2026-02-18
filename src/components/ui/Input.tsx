'use client';

import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helper?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helper, leftIcon, rightIcon, className, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label htmlFor={inputId} className="text-sm font-medium text-[#334155]">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full h-10 px-3 text-sm rounded-lg border bg-white text-[#0F172A]',
                            'placeholder:text-[#94A3B8]',
                            'transition-colors duration-150',
                            'focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent',
                            error
                                ? 'border-[#DC2626] focus:ring-[#DC2626]'
                                : 'border-[#E2E8F0] hover:border-[#CBD5E1]',
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <p className="text-xs text-[#DC2626]">{error}</p>}
                {helper && !error && <p className="text-xs text-[#64748B]">{helper}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
