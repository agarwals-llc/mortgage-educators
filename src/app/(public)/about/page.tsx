import Link from 'next/link';
import { Shield, Users, Award, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_TESTIMONIALS } from '@/lib/data/mock';

export const metadata = { title: 'About Us', description: 'Learn about Mortgage Educators — NMLS-approved mortgage licensing education.' };

export default function AboutPage() {
    return (
        <div className="pt-16 min-h-screen bg-[#F8F9FC]">
            {/* Hero */}
            <div className="bg-gradient-to-br from-[#1B3A6B] to-[#0F172A] text-white py-20">
                <div className="site-container text-center max-w-3xl mx-auto">
                    <Badge className="bg-white/10 text-white border-white/20 mb-6">Our Story</Badge>
                    <h1 className="text-5xl font-bold mb-4">Empowering Mortgage Professionals</h1>
                    <p className="text-white/70 text-lg">
                        For over a decade, Mortgage Educators has been the trusted source for NMLS-approved mortgage licensing education. We've helped more than 50,000 students get licensed and advance their careers.
                    </p>
                </div>
            </div>

            <div className="site-container py-16">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: Users, value: '50,000+', label: 'Students Licensed' },
                        { icon: BookOpen, value: '100+', label: 'Courses Offered' },
                        { icon: Award, value: '4.9★', label: 'Average Rating' },
                        { icon: Shield, value: '50', label: 'States Covered' },
                    ].map((stat) => (
                        <Card key={stat.label} className="text-center">
                            <stat.icon size={28} className="text-[#1B3A6B] mx-auto mb-3" />
                            <div className="text-3xl font-extrabold text-[#0F172A]">{stat.value}</div>
                            <div className="text-sm text-[#64748B] mt-1">{stat.label}</div>
                        </Card>
                    ))}
                </div>

                {/* Mission */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Our Mission</h2>
                    <p className="text-[#64748B] text-lg leading-relaxed">
                        We believe that getting your mortgage license should be straightforward, affordable, and accessible. Our platform combines NMLS-approved content with a modern learning experience — so you can focus on learning, not fighting with outdated software.
                    </p>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {MOCK_TESTIMONIALS.map((t) => (
                        <Card key={t.id}>
                            <p className="text-[#334155] italic mb-4">"{t.text}"</p>
                            <div className="font-semibold text-[#0F172A]">{t.name}</div>
                            <div className="text-sm text-[#64748B]">{t.role}</div>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/courses">
                        <Button variant="primary" size="lg">Browse Our Courses</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
