import Link from 'next/link';
import { ArrowRight, CheckCircle, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const STATES_DATA = [
    { state: 'Alabama', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Alaska', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Arizona', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Arkansas', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'California', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Colorado', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Connecticut', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Delaware', preHours: 20, ceHours: 8, deadline: 'Dec 1' },
    { state: 'Florida', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Georgia', preHours: 20, ceHours: 8, deadline: 'Oct 31' },
    { state: 'Hawaii', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Idaho', preHours: 20, ceHours: 8, deadline: 'Dec 1' },
    { state: 'Illinois', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Indiana', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Iowa', preHours: 20, ceHours: 8, deadline: 'Dec 1' },
    { state: 'Kansas', preHours: 20, ceHours: 8, deadline: 'Dec 1' },
    { state: 'Kentucky', preHours: 20, ceHours: 8, deadline: 'Nov 30' },
    { state: 'Louisiana', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Maine', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Maryland', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Massachusetts', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Michigan', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Minnesota', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Mississippi', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Missouri', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Montana', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Nebraska', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Nevada', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'New Hampshire', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'New Jersey', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'New Mexico', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'New York', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'North Carolina', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'North Dakota', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Ohio', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Oklahoma', preHours: 20, ceHours: 8, deadline: 'Dec 1' },
    { state: 'Oregon', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Pennsylvania', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Rhode Island', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'South Carolina', preHours: 20, ceHours: 8, deadline: 'Nov 30' },
    { state: 'South Dakota', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Tennessee', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Texas', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Utah', preHours: 20, ceHours: 8, deadline: 'Dec 11' },
    { state: 'Vermont', preHours: 20, ceHours: 8, deadline: 'Dec 1' },
    { state: 'Virginia', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Washington', preHours: 20, ceHours: 8, deadline: 'Dec 11' },
    { state: 'West Virginia', preHours: 20, ceHours: 8, deadline: 'Nov 1' },
    { state: 'Wisconsin', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
    { state: 'Wyoming', preHours: 20, ceHours: 8, deadline: 'Dec 31' },
];

export default function StatesPage() {
    return (
        <div className="overflow-x-hidden">
            {/* Hero */}
            <section className="relative pt-16 bg-gradient-to-br from-[#0F172A] via-[#1B3A6B] to-[#0F172A] pb-16">
                <div className="site-container relative z-10 py-16 text-center">
                    <Badge variant="info" className="mb-5">All 50 States</Badge>
                    <h1 className="text-5xl font-extrabold text-white mb-5">
                        State Licensing <span className="text-[#F5A623]">Requirements</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                        Find your state's pre-licensing hours, CE requirements, and renewal deadlines. We're NMLS-approved in all 50 states.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {[
                            { v: '50', l: 'States Covered' },
                            { v: 'NMLS', l: 'Approved Provider' },
                            { v: '20hrs', l: 'Standard Pre-License' },
                        ].map(s => (
                            <div key={s.l} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-2">
                                <span className="text-lg font-extrabold text-[#F5A623]">{s.v}</span>
                                <span className="text-sm text-white/70">{s.l}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60L1440 15C1200 50 960 0 720 20C480 40 240 5 0 30L0 60Z" fill="#F8F9FC" /></svg>
                </div>
            </section>

            {/* State table */}
            <section className="site-section bg-[#F8F9FC]">
                <div className="site-container">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#0F172A]">State Requirements — 2026</h2>
                            <div className="flex items-center gap-2 bg-[#F8F9FC] border border-[#E2E8F0] rounded-xl px-3 py-2">
                                <Search size={15} className="text-[#94A3B8]" />
                                <span className="text-sm text-[#94A3B8]">Search states...</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#F8F9FC] border-b border-[#E2E8F0]">
                                        <th className="text-left px-6 py-3 text-xs font-bold text-[#64748B] uppercase tracking-wider">State</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-[#64748B] uppercase tracking-wider">Pre-License Hours</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-[#64748B] uppercase tracking-wider">Annual CE Hours</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-[#64748B] uppercase tracking-wider">2026 Deadline</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-[#64748B] uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {STATES_DATA.map((row, i) => (
                                        <tr key={row.state} className={`border-b border-[#F1F5F9] hover:bg-[#F8F9FC] transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={14} className="text-[#1B3A6B]" />
                                                    <span className="font-semibold text-[#0F172A] text-sm">{row.state}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#334155]">{row.preHours} hours</td>
                                            <td className="px-6 py-4 text-sm text-[#334155]">{row.ceHours} hours</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${row.deadline === 'Dec 31' ? 'bg-[#DBEAFE] text-[#1D4ED8]' :
                                                        row.deadline === 'Dec 11' ? 'bg-[#FEF3C7] text-[#92400E]' :
                                                            'bg-[#FEE2E2] text-[#991B1B]'
                                                    }`}>{row.deadline}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href="/courses" className="text-xs font-semibold text-[#1B3A6B] hover:underline flex items-center gap-1">
                                                    Get Licensed <ArrowRight size={12} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="site-section bg-gradient-to-br from-[#1B3A6B] to-[#0F172A]">
                <div className="site-container text-center">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Get Licensed in Your State?</h2>
                    <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Browse our NMLS-approved courses and start your licensing journey today.</p>
                    <Link href="/courses">
                        <Button size="lg" variant="accent" className="font-semibold shadow-xl shadow-[#F5A623]/25">
                            Browse Courses <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
