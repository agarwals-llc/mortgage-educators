import Link from 'next/link';
import { CheckCircle, HelpCircle, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'FAQ', description: 'Frequently asked questions about mortgage licensing education.' };

const faqGroups = [
    {
        category: 'Licensing',
        questions: [
            { q: 'What is the NMLS?', a: 'The Nationwide Multistate Licensing System (NMLS) is the system of record for non-depository, financial services licensing in the US. All mortgage loan originators must be licensed through NMLS.' },
            { q: 'How many hours of pre-licensing education do I need?', a: 'Federal law requires a minimum of 20 hours of NMLS-approved pre-licensing education. Some states require additional state-specific hours on top of the federal requirement.' },
            { q: 'How often do I need to complete continuing education?', a: 'Licensed MLOs must complete 8 hours of NMLS-approved CE annually to renew their license. This includes 3 hours of federal law, 2 hours of ethics, 2 hours of non-traditional mortgage products, and 1 hour of elective.' },
        ],
    },
    {
        category: 'Courses',
        questions: [
            { q: 'How long do I have to complete a course?', a: 'Pre-licensing courses include 180 days of access. CE courses include 90 days. Exam prep packages include 365 days. Access begins from the date of enrollment.' },
            { q: 'Can I pause and resume a course?', a: 'Yes. Our platform saves your exact progress. You can stop at any time and resume exactly where you left off, subject to our identity verification requirements.' },
            { q: 'What is the identity check?', a: 'NMLS requires that students verify their identity during online courses. We use email OTP or security question verification at regular intervals to confirm you are the enrolled student.' },
        ],
    },
    {
        category: 'Payments',
        questions: [
            { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover) via our secure Stripe payment processor.' },
            { q: 'Do you offer refunds?', a: 'Yes. We offer a 30-day money-back guarantee if you have completed less than 20% of the course content. Contact support to request a refund.' },
            { q: 'Can I use a coupon code?', a: 'Yes. Enter your coupon code at checkout to apply the discount. Coupons cannot be combined or applied after purchase.' },
        ],
    },
    {
        category: 'Technical',
        questions: [
            { q: 'What devices can I use?', a: 'Our platform works on any modern browser — desktop, laptop, tablet, or smartphone. We recommend Chrome, Firefox, Safari, or Edge.' },
            { q: 'What if I lose internet connection during a course?', a: 'Your progress is saved automatically every few minutes. If you lose connection, simply reconnect and resume from your last saved position.' },
        ],
    },
];

export default function FAQPage() {
    return (
        <div className="pt-16 min-h-screen bg-[#F8F9FC]">
            <div className="site-container py-16">
                <div className="text-center mb-12">
                    <Badge variant="info" className="mb-4">Help Center</Badge>
                    <h1 className="text-5xl font-bold text-[#0F172A] mb-4">Frequently Asked Questions</h1>
                    <p className="text-[#64748B] text-lg max-w-xl mx-auto">
                        Everything you need to know about mortgage licensing education.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto flex flex-col gap-10">
                    {faqGroups.map((group) => (
                        <div key={group.category}>
                            <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[#1B3A6B] rounded-full inline-block" />
                                {group.category}
                            </h2>
                            <div className="flex flex-col gap-3">
                                {group.questions.map((item, i) => (
                                    <Card key={i}>
                                        <h3 className="font-semibold text-[#0F172A] flex items-start gap-2 mb-2">
                                            <CheckCircle size={16} className="text-[#16A34A] mt-0.5 shrink-0" />
                                            {item.q}
                                        </h3>
                                        <p className="text-sm text-[#64748B] pl-6 leading-relaxed">{item.a}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-[#64748B] mb-4">Still have questions?</p>
                    <Link href="/contact">
                        <Button variant="primary">Contact Support</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
