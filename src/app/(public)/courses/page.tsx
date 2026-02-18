'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Clock, Star, Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MOCK_COURSES } from '@/lib/data/mock';
import { formatCurrency } from '@/lib/utils/format';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

const categories = ['All', 'Pre-Licensing', 'Continuing Education', 'Exam Prep'];
const stateFilters = ['All States', 'Florida', 'Texas', 'California', 'New York', 'Other'];

export default function CoursesPage() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedState, setSelectedState] = useState('All States');

    const filtered = MOCK_COURSES.filter((c) => {
        const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
        const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
        const matchState = selectedState === 'All States' || c.state === selectedState || (selectedState === 'Other' && !['Florida', 'Texas', 'California', 'New York'].includes(c.state));
        return matchSearch && matchCat && matchState;
    });

    return (
        <div className="pt-16 min-h-screen bg-[#F8F9FC]">
            {/* Header */}
            <div className="bg-white border-b border-[#E2E8F0]">
                <div className="site-container py-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <Badge variant="info" className="mb-3">NMLS Approved</Badge>
                            <h1 className="text-4xl font-bold text-[#0F172A]">All Courses</h1>
                            <p className="text-[#64748B] mt-2">{filtered.length} course{filtered.length !== 1 ? 's' : ''} available</p>
                        </div>
                        {/* Search */}
                        <div className="relative max-w-sm w-full">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search courses..."
                                className="w-full h-10 pl-9 pr-4 text-sm rounded-lg border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-container py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar filters */}
                    <aside className="lg:w-56 shrink-0">
                        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 sticky top-24">
                            <h3 className="font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                                <Filter size={16} /> Filters
                            </h3>

                            <div className="mb-6">
                                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">Category</p>
                                <div className="flex flex-col gap-2">
                                    {categories.map((cat) => (
                                        <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === cat}
                                                onChange={() => setSelectedCategory(cat)}
                                                className="accent-[#1B3A6B]"
                                            />
                                            <span className="text-sm text-[#334155] group-hover:text-[#1B3A6B] transition-colors">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">State</p>
                                <div className="flex flex-col gap-2">
                                    {stateFilters.map((state) => (
                                        <label key={state} className="flex items-center gap-2.5 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="state"
                                                checked={selectedState === state}
                                                onChange={() => setSelectedState(state)}
                                                className="accent-[#1B3A6B]"
                                            />
                                            <span className="text-sm text-[#334155] group-hover:text-[#1B3A6B] transition-colors">{state}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {(selectedCategory !== 'All' || selectedState !== 'All States' || search) && (
                                <button
                                    onClick={() => { setSelectedCategory('All'); setSelectedState('All States'); setSearch(''); }}
                                    className="text-xs text-[#1B3A6B] font-semibold hover:underline"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* Course grid */}
                    <div className="flex-1">
                        {/* Sort bar */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-[#64748B]">Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
                            <select className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]">
                                <option>Sort: Relevance</option>
                                <option>Sort: Price (Low–High)</option>
                                <option>Sort: Price (High–Low)</option>
                                <option>Sort: Rating</option>
                                <option>Sort: Hours</option>
                            </select>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-[#64748B] text-lg">No courses match your filters.</p>
                                <button onClick={() => { setSelectedCategory('All'); setSelectedState('All States'); setSearch(''); }} className="mt-3 text-[#1B3A6B] font-semibold hover:underline">
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                {filtered.map((course) => (
                                    <div key={course.id} className="group relative">
                                        <Link href={`/courses/${course.slug}`}>
                                            <Card hover className="h-full flex flex-col overflow-hidden p-0 cursor-pointer">
                                                {/* Thumbnail */}
                                                <div
                                                    className="h-36 flex items-center justify-center relative overflow-hidden"
                                                    style={{ background: `linear-gradient(135deg, ${course.thumbnail_color}, ${course.thumbnail_color}aa)` }}
                                                >
                                                    <BookOpen size={40} className="text-white/30 group-hover:scale-110 transition-transform duration-300" />
                                                    <Badge
                                                        className="absolute top-3 left-3"
                                                        variant={course.category === 'Pre-Licensing' ? 'info' : course.category === 'Exam Prep' ? 'accent' : 'success'}
                                                    >
                                                        {course.category}
                                                    </Badge>
                                                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg">
                                                        {course.hours}h
                                                    </div>
                                                </div>

                                                <div className="p-4 flex flex-col flex-1">
                                                    <p className="text-xs text-[#94A3B8] mb-1">{course.category_path}</p>
                                                    <h3 className="font-semibold text-[#0F172A] text-sm leading-snug mb-2">{course.title}</h3>
                                                    <p className="text-xs text-[#64748B] mb-3 line-clamp-2">{course.description}</p>

                                                    <div className="flex items-center gap-3 text-xs text-[#64748B] mb-4">
                                                        <span className="flex items-center gap-1"><Clock size={11} />{course.hours}h</span>
                                                        <span className="flex items-center gap-1">
                                                            <Star size={11} className="text-[#F5A623] fill-[#F5A623]" />
                                                            {course.rating} ({course.review_count.toLocaleString()})
                                                        </span>
                                                        <span>{course.enrollment_count.toLocaleString()} enrolled</span>
                                                    </div>

                                                    <div className="mt-auto flex items-center justify-between gap-2">
                                                        <span className="text-lg font-bold text-[#1B3A6B]">{formatCurrency(course.price_cents)}</span>
                                                        <AddToCartButton
                                                            course={{
                                                                id: course.id,
                                                                slug: course.slug,
                                                                title: course.title,
                                                                category: course.category,
                                                                hours: course.hours,
                                                                price_cents: course.price_cents,
                                                                thumbnail_color: course.thumbnail_color,
                                                            }}
                                                            size="sm"
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
