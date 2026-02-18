import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, Shield, Award, BookOpen, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Get Licensed', description: 'Step-by-step guide to getting your mortgage loan originator license.' };

const steps = [
    {
        step: 1,
        title: 'Complete Pre-Licensing Education',
        desc: 'Complete 20 hours of NMLS-approved pre-licensing education. Our courses cover federal law, ethics, non-traditional mortgage products, and your state\'s specific requirements.',
        time: '2–4 weeks',
        icon: BookOpen,
        cta: { label: 'Browse Pre-Licensing Courses', href: '/courses?category=pre-licensing' },
    },
    {
        step: 2,
        title: 'Pass the NMLS National Test',
        desc: 'Pass the SAFE MLO Test with a score of 75% or higher. The test covers federal mortgage law, ethics, and general mortgage knowledge. Most candidates pass on their first attempt with proper preparation.',
        time: '1–2 weeks prep',
        icon: Award,
        cta: { label: 'Get Exam Prep', href: '/exam-prep' },
    },
    {
        step: 3,
        title: 'Submit Your NMLS Application',
        desc: 'Create your NMLS account, complete the MU4 form, submit fingerprints for a background check, and authorize a credit report. Pay the applicable state and NMLS fees.',
        time: '1–2 weeks',
        icon: Shield,
        cta: { label: 'View State Requirements', href: '/states' },
    },
    {
        step: 4,
        title: 'Receive Your License',
        desc: 'Once your state approves your application, you\'ll receive your MLO license number. You can then begin originating mortgage loans under a licensed mortgage company.',
        time: '2–6 weeks',
        icon: CheckCircle,
        cta: { label: 'View Pricing', href: '/pricing' },
    },
];

export default function GetLicensedPage() {
    return (
        <div className="pt-16 min-h-screen bg-[#F8F9FC]">
            {/* Hero */}
            <div className="bg-gradient-to-br from-[#1B3A6B] to-[#0F172A] text-white py-20">
                <div className="site-container text-center">
                    <Badge className="bg-white/10 text-white border-white/20 mb-6">Step-by-Step Guide</Badge>
                    <h1 className="text-5xl font-bold mb-4">How to Get Your Mortgage License</h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                        Becoming a licensed Mortgage Loan Originator (MLO) requires completing education, passing an exam, and applying through NMLS. Here's exactly how to do it.
                    </p>
                    <Link href="/courses">
                        <Button variant="accent" size="lg">Start with Pre-Licensing <ArrowRight size={18} /></Button>
                    </Link>
                </div>
            </div>

            {/* Steps */}
            <div className="site-container py-16">
                <div className="max-w-3xl mx-auto flex flex-col gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-6">
                            {/* Step number */}
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-[#1B3A6B] text-white font-bold text-lg flex items-center justify-center shrink-0">
                                    {step.step}
                                </div>
                                {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-[#E2E8F0] mt-2" />}
                            </div>

                            {/* Content */}
                            <Card className="flex-1 mb-2">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <step.icon size={20} className="text-[#1B3A6B]" />
                                        <h2 className="text-lg font-bold text-[#0F172A]">{step.title}</h2>
                                    </div>
                                    <Badge variant="info" className="shrink-0 ml-3">
                                        <Clock size={11} /> {step.time}
                                    </Badge>
                                </div>
                                <p className="text-[#64748B] text-sm leading-relaxed mb-4">{step.desc}</p>
                                <Link href={step.cta.href}>
                                    <Button variant="outline" size="sm">
                                        {step.cta.label} <ChevronRight size={14} />
                                    </Button>
                                </Link>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Ready to Get Started?</h2>
                    <p className="text-[#64748B] mb-6">Enroll in your state's pre-licensing course today.</p>
                    <Link href="/courses?category=pre-licensing">
                        <Button variant="primary" size="lg">Browse Pre-Licensing Courses <ArrowRight size={18} /></Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
