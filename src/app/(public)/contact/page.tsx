import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Contact Us', description: 'Get in touch with Mortgage Educators support.' };

export default function ContactPage() {
    return (
        <div className="pt-16 min-h-screen bg-[#F8F9FC]">
            <div className="site-container py-16">
                <div className="text-center mb-12">
                    <Badge variant="info" className="mb-4">Get In Touch</Badge>
                    <h1 className="text-5xl font-bold text-[#0F172A] mb-4">Contact Us</h1>
                    <p className="text-[#64748B] text-lg max-w-xl mx-auto">
                        Have a question? Our support team is here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    {/* Contact form */}
                    <Card>
                        <h2 className="text-xl font-bold text-[#0F172A] mb-6">Send a Message</h2>
                        <form className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-[#334155]">First Name</label>
                                    <input type="text" placeholder="John" className="h-10 px-3 text-sm rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-[#334155]">Last Name</label>
                                    <input type="text" placeholder="Doe" className="h-10 px-3 text-sm rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-[#334155]">Email</label>
                                <input type="email" placeholder="john@example.com" className="h-10 px-3 text-sm rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-[#334155]">Subject</label>
                                <select className="h-10 px-3 text-sm rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] bg-white text-[#334155]">
                                    <option>Course Question</option>
                                    <option>Technical Support</option>
                                    <option>Billing</option>
                                    <option>Corporate Training</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-[#334155]">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="How can we help you?"
                                    className="px-3 py-2 text-sm rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] resize-none"
                                />
                            </div>
                            <Button variant="primary" size="lg" fullWidth type="submit">Send Message</Button>
                        </form>
                    </Card>

                    {/* Contact info */}
                    <div className="flex flex-col gap-5">
                        {[
                            { icon: Mail, title: 'Email Support', value: 'support@mortgageeducators.com', sub: 'We respond within 24 hours' },
                            { icon: Phone, title: 'Phone Support', value: '1-800-555-0199', sub: 'Mon–Fri, 8am–6pm EST' },
                            { icon: Clock, title: 'Support Hours', value: 'Monday – Friday', sub: '8:00 AM – 6:00 PM Eastern Time' },
                            { icon: MapPin, title: 'Headquarters', value: 'Mortgage Educators, Inc.', sub: 'United States' },
                        ].map((item) => (
                            <Card key={item.title} className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-[#EEF2F7] rounded-xl flex items-center justify-center shrink-0">
                                    <item.icon size={18} className="text-[#1B3A6B]" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">{item.title}</p>
                                    <p className="font-semibold text-[#0F172A]">{item.value}</p>
                                    <p className="text-sm text-[#64748B]">{item.sub}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
