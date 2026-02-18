'use client';

import { cn } from '@/lib/utils/cn';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
};

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (open) document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />
            <div
                className={cn(
                    'relative w-full bg-white rounded-2xl shadow-xl animate-fade-in',
                    sizeClasses[size]
                )}
            >
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
                        <h2 className="text-lg font-semibold text-[#0F172A]">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

// Slide-over panel (right side drawer)
interface SlideOverProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    width?: 'sm' | 'md' | 'lg';
}

const slideOverWidths = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };

export function SlideOver({ open, onClose, title, children, width = 'md' }: SlideOverProps) {
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
            <div className={cn(
                'relative w-full bg-white shadow-xl flex flex-col animate-slide-in-right',
                slideOverWidths[width]
            )}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
                    <h2 className="text-lg font-semibold text-[#0F172A]">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </div>
        </div>
    );
}
