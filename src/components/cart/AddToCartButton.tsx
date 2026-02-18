'use client';

import { ShoppingCart, Check } from 'lucide-react';
import { useCart, CartItem } from '@/lib/store/useCart';
import { cn } from '@/lib/utils/cn';

interface AddToCartButtonProps {
    course: CartItem;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    className?: string;
}

export function AddToCartButton({ course, size = 'md', fullWidth = false, className }: AddToCartButtonProps) {
    const { addItem, isInCart, openDrawer } = useCart();
    const inCart = isInCart(course.id);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // prevent Link navigation when nested inside a Link
        e.stopPropagation();
        if (inCart) {
            openDrawer();
        } else {
            addItem(course);
        }
    };

    const sizeClasses = {
        sm: 'h-8 px-3 text-xs gap-1.5',
        md: 'h-10 px-4 text-sm gap-2',
        lg: 'h-12 px-5 text-base gap-2',
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200',
                sizeClasses[size],
                fullWidth && 'w-full',
                inCart
                    ? 'bg-[#F0FDF4] border border-[#86EFAC] text-[#16A34A] hover:bg-[#DCFCE7]'
                    : 'bg-[#1B3A6B] text-white hover:bg-[#122850] shadow-md shadow-[#1B3A6B]/20',
                className
            )}
        >
            {inCart ? (
                <>
                    <Check size={size === 'sm' ? 13 : 15} />
                    In Cart — View
                </>
            ) : (
                <>
                    <ShoppingCart size={size === 'sm' ? 13 : 15} />
                    Add to Cart
                </>
            )}
        </button>
    );
}
