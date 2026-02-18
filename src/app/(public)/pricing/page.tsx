import Link from 'next/link';
import { CheckCircle, X, ArrowRight, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Pricing', description: 'Simple, transparent pricing for mortgage licensing education.' };

const plans = [
    {
        name: 'Pre-Licensing',
        price: 299,
        period: 'per course',
        desc: 'Everything you need to get your initial mortgage license.',
        features: [
            '20-hour NMLS-approved course',
            'State-specific content',
            '180 days of access',
            'Certificate of completion',
            'Progress tracking',
            'Identity verification',
            'Email support',
        ],
        notIncluded: ['Exam prep materials', 'Corporate reporting'],
        cta: 'Get Pre-Licensed',
        href: '/courses?category=pre-licensing',
        popular: false,
        color: 'border-[#E2E8F0]',
    },
    {
        name: 'CE Bundle',
        price: 149,
        period: 'per year',
        desc: 'Annual continuing education to keep your license active.',
        features: [
            '8-hour annual CE course',
            'All 50 states accepted',
            '90 days of access',
            'Certificate of completion',
            'NMLS credit reporting',
            'Progress tracking',
            'Priority email support',
        ],
        notIncluded: ['Exam prep materials'],
        cta: 'Start CE Now',
        href: '/courses?category=ce',
        popular: true,
        color: 'border-[#1B3A6B]',
    },
    {
        name: 'Ultimate Bundle',
        price: 449,
        period: 'one-time',
        desc: 'Pre-licensing + exam prep — everything to launch your career.',
        features: [
            '20-hour pre-licensing course',
            'NMLS exam prep (1,200+ questions)',
            '5 full-length mock exams',
            '365 days of access',
            'All certificates included',
            'Unlimited exam retakes',
            'Priority support',
        ],
        notIncluded: [],
        cta: 'Get the Bundle',
        href: '/register',
        popular: false,
        color: 'border-[#E2E8F0]',
    },
];

const faqs = [
    { q: 'Can I get a refund?', a: 'Yes. We offer a 30-day money-back guarantee on all courses if you haven\'t completed more than 20% of the content.' },
    { q: 'Do prices include state fees?', a: 'No. Course prices cover education only. NMLS application fees and state licensing fees are separate.' },
    { q: 'Is there a discount for teams?', a: 'Yes! Corporate accounts get volume discounts starting at 5 seats. Contact us for a custom quote.' },
    { q: 'Can I pay by invoice?', a: 'Corporate accounts can pay by invoice. Individual purchases require a credit or debit card.' },
    { q: 'What if I need courses for multiple states?', a: 'Each state requires a separate course. Bundle pricing is available for multi-state purchases.' },
];

export default function PricingPage() {
    return (
        <div className="pt-16 min-h-screen bg-[#F8F9FC]">
            <div className="site-container py-16">
                <div className="text-center mb-14">
                    <Badge variant="info" className="mb-4">Transparent Pricing</Badge>
                    <h1 className="text-5xl font-bold text-[#0F172A] mb-4">Simple, No-Surprise Pricing</h1>
                    <p className="text-[#64748B] text-lg max-w-xl mx-auto">
                        Pay once, study at your pace. No subscriptions, no hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={`relative flex flex-col border-2 ${plan.color} ${plan.popular ? 'ring-2 ring-[#1B3A6B]' : ''}`}>
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-[#1B3A6B] text-white px-4">Most Popular</Badge>
                                </div>
                            )}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-[#0F172A] mb-1">{plan.name}</h2>
                                <p className="text-sm text-[#64748B] mb-4">{plan.desc}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-[#1B3A6B]">${plan.price}</span>
                                    <span className="text-sm text-[#64748B]">/{plan.period}</span>
                                </div>
                            </div>

                            <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-[#334155]">
                                        <CheckCircle size={15} className="text-[#16A34A] mt-0.5 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                                {plan.notIncluded.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                                        <X size={15} className="mt-0.5 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link href={plan.href}>
                                <Button variant={plan.popular ? 'primary' : 'outline'} fullWidth size="lg">
                                    {plan.cta} <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </Card>
                    ))}
                </div>

                {/* Corporate CTA */}
                <Card className="max-w-3xl mx-auto text-center mb-16 bg-gradient-to-br from-[#1B3A6B] to-[#122850] border-0">
                    <h2 className="text-2xl font-bold text-white mb-2">Training a Team?</h2>
                    <p className="text-white/70 mb-6">Volume discounts, team dashboards, and compliance reporting for corporate accounts.</p>
                    <Link href="/corporate">
                        <Button variant="accent" size="lg">Contact Sales <ArrowRight size={16} /></Button>
                    </Link>
                </Card>

                {/* FAQ */}
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6 text-center">Pricing FAQ</h2>
                    <div className="flex flex-col gap-4">
                        {faqs.map((faq, i) => (
                            <Card key={i}>
                                <h3 className="font-semibold text-[#0F172A] flex items-start gap-2 mb-2">
                                    <HelpCircle size={16} className="text-[#1B3A6B] mt-0.5 shrink-0" />
                                    {faq.q}
                                </h3>
                                <p className="text-sm text-[#64748B] pl-6">{faq.a}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
