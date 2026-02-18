import Link from 'next/link';
import { Award, Download, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_CERTIFICATES } from '@/lib/data/mock';
import { formatDate } from '@/lib/utils/format';

export default function CertificatesPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0F172A]">My Certificates</h1>
                <p className="text-sm text-[#64748B] mt-0.5">{MOCK_CERTIFICATES.length} certificate{MOCK_CERTIFICATES.length !== 1 ? 's' : ''} earned</p>
            </div>

            {MOCK_CERTIFICATES.length === 0 ? (
                <div className="text-center py-20">
                    <Award size={48} className="text-[#CBD5E1] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#334155] mb-2">No certificates yet</h3>
                    <p className="text-[#64748B] mb-6">Complete a course to earn your first certificate.</p>
                    <Link href="/courses"><Button variant="primary">Browse Courses</Button></Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {MOCK_CERTIFICATES.map((cert) => (
                        <Card key={cert.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#d4891a] flex items-center justify-center shrink-0">
                                <Award size={28} className="text-white" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-[#0F172A] mb-1">{cert.course_title}</h3>
                                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#64748B]">
                                    <span>Completed: <strong className="text-[#334155]">{formatDate(cert.completed_at)}</strong></span>
                                    <span>Cert #: <strong className="text-[#334155] font-mono">{cert.certificate_number}</strong></span>
                                    <span>NMLS Hours: <strong className="text-[#334155]">{cert.nmls_hours}</strong></span>
                                </div>
                            </div>

                            {/* Download */}
                            <a href={cert.pdf_url} download>
                                <Button variant="outline" size="sm" className="shrink-0">
                                    <Download size={14} />
                                    Download PDF
                                </Button>
                            </a>
                        </Card>
                    ))}
                </div>
            )}

            {/* Completed courses without cert (placeholder) */}
            <div className="mt-8 p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl text-sm text-[#1D4ED8]">
                <strong>Tip:</strong> Certificates are automatically generated when you complete all chapters and pass the final exam. They'll appear here instantly.
            </div>
        </div>
    );
}
