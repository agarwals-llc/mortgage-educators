'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Shield, AlertTriangle, CheckCircle, ArrowRight, RotateCcw, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';
import { MOCK_ENROLLMENTS } from '@/lib/data/mock';

export function generateStaticParams() {
    return MOCK_ENROLLMENTS.map((e) => ({ id: e.course_id }));
}

interface Props {
    params: { id: string };
}

type Mode = 'email_otp' | 'security_question' | 'student_choice';
type Step = 'select' | 'verify' | 'success' | 'locked';

const RESEND_COOLDOWN = 60;
const MAX_ATTEMPTS = 3;

// Segmented OTP input
function OTPInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (i: number, val: string) => {
        const digit = val.replace(/\D/g, '').slice(-1);
        const next = [...value];
        next[i] = digit;
        onChange(next);
        if (digit && i < 5) refs.current[i + 1]?.focus();
    };

    const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !value[i] && i > 0) {
            refs.current[i - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length === 6) {
            onChange(pasted.split(''));
            refs.current[5]?.focus();
        }
        e.preventDefault();
    };

    return (
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {Array.from({ length: 6 }).map((_, i) => (
                <input
                    key={i}
                    ref={(el) => { refs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[i] || ''}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={cn(
                        'w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-white',
                        'focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-[#1B3A6B]',
                        'transition-all duration-150',
                        value[i] ? 'border-[#1B3A6B] text-[#1B3A6B]' : 'border-[#E2E8F0] text-[#0F172A]'
                    )}
                />
            ))}
        </div>
    );
}

export default function IdentityCheckPage({ params }: Props) {
    const [mode, setMode] = useState<Mode>('student_choice');
    const [step, setStep] = useState<Step>('select');
    const [selectedMode, setSelectedMode] = useState<'email_otp' | 'security_question'>('email_otp');
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [secAnswer, setSecAnswer] = useState('');
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    // Resend countdown
    useEffect(() => {
        if (resendTimer <= 0) return;
        const t = setTimeout(() => setResendTimer((n) => n - 1), 1000);
        return () => clearTimeout(t);
    }, [resendTimer]);

    const handleProceed = () => {
        if (mode === 'student_choice') {
            setMode(selectedMode);
        }
        setStep('verify');
        setResendTimer(RESEND_COOLDOWN);
    };

    const handleVerify = async () => {
        setLoading(true);
        setError('');
        await new Promise((r) => setTimeout(r, 1200));

        // Simulate: OTP "123456" or answer "mortgage" passes
        const isCorrect =
            (mode === 'email_otp' && otp.join('') === '123456') ||
            (mode === 'security_question' && secAnswer.toLowerCase() === 'mortgage');

        if (isCorrect) {
            setStep('success');
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= MAX_ATTEMPTS) {
                setStep('locked');
            } else {
                setError(`Incorrect. ${MAX_ATTEMPTS - newAttempts} attempt${MAX_ATTEMPTS - newAttempts !== 1 ? 's' : ''} remaining.`);
            }
        }
        setLoading(false);
    };

    const handleResend = () => {
        setResendTimer(RESEND_COOLDOWN);
        setOtp(Array(6).fill(''));
        setError('');
    };

    // ── LOCKED ──
    if (step === 'locked') {
        return (
            <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock size={28} className="text-[#DC2626]" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Account Temporarily Locked</h1>
                    <p className="text-[#64748B] mb-6">
                        Too many failed verification attempts. For your security, this session has been locked.
                        Please contact support to unlock your account.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/support">
                            <Button variant="primary" fullWidth>Contact Support</Button>
                        </Link>
                        <Link href="/portal">
                            <Button variant="secondary" fullWidth>Back to Portal</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    // ── SUCCESS ──
    if (step === 'success') {
        return (
            <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={28} className="text-[#16A34A]" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Identity Verified</h1>
                    <p className="text-[#64748B] mb-6">
                        Welcome back! Resuming your course now.
                    </p>
                    <Link href={`/course/${params.id}`}>
                        <Button variant="primary" size="lg" fullWidth>
                            Continue Learning <ArrowRight size={18} />
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-[#1B3A6B] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Shield size={26} className="text-[#F5A623]" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Student Identity Check</h1>
                    <p className="text-[#64748B] mt-1 text-sm">Resuming your course — please verify your identity</p>
                </div>

                <Card>
                    {/* ── STEP: SELECT MODE ── */}
                    {step === 'select' && (
                        <div className="flex flex-col gap-5">
                            <p className="text-sm text-[#334155]">How would you like to verify your identity?</p>

                            <div className="flex flex-col gap-3">
                                {[
                                    { value: 'email_otp' as const, label: 'Email Verification Code', desc: 'We\'ll send a 6-digit code to your registered email.' },
                                    { value: 'security_question' as const, label: 'Security Question', desc: 'Answer your pre-set security question.' },
                                ].map((opt) => (
                                    <label
                                        key={opt.value}
                                        className={cn(
                                            'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150',
                                            selectedMode === opt.value
                                                ? 'border-[#1B3A6B] bg-[#EEF2F7]'
                                                : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="verify-mode"
                                            value={opt.value}
                                            checked={selectedMode === opt.value}
                                            onChange={() => setSelectedMode(opt.value)}
                                            className="mt-0.5 accent-[#1B3A6B]"
                                        />
                                        <div>
                                            <p className="font-medium text-sm text-[#0F172A]">{opt.label}</p>
                                            <p className="text-xs text-[#64748B] mt-0.5">{opt.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <Button variant="primary" size="lg" fullWidth onClick={handleProceed}>
                                Continue <ArrowRight size={16} />
                            </Button>
                        </div>
                    )}

                    {/* ── STEP: VERIFY ── */}
                    {step === 'verify' && (
                        <div className="flex flex-col gap-5">
                            {mode === 'email_otp' ? (
                                <>
                                    <div className="text-center">
                                        <p className="text-sm text-[#334155] mb-1">Enter the 6-digit code sent to</p>
                                        <p className="font-semibold text-[#0F172A]">j***@example.com</p>
                                        <p className="text-xs text-[#64748B] mt-1">(Demo: enter 123456)</p>
                                    </div>
                                    <OTPInput value={otp} onChange={setOtp} />
                                    {error && (
                                        <div className="flex items-center gap-2 bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2 text-sm text-[#DC2626]">
                                            <AlertTriangle size={14} />
                                            {error}
                                        </div>
                                    )}
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        loading={loading}
                                        disabled={otp.join('').length < 6}
                                        onClick={handleVerify}
                                    >
                                        Verify Code
                                    </Button>
                                    <div className="text-center">
                                        {resendTimer > 0 ? (
                                            <p className="text-sm text-[#64748B]">Resend code in <strong>{resendTimer}s</strong></p>
                                        ) : (
                                            <button onClick={handleResend} className="text-sm text-[#1B3A6B] hover:underline flex items-center gap-1 mx-auto">
                                                <RotateCcw size={13} /> Resend Code
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <p className="text-sm font-medium text-[#334155] mb-1">Security Question</p>
                                        <p className="text-base font-semibold text-[#0F172A] mb-4">What was the name of your first employer?</p>
                                        <p className="text-xs text-[#64748B] mb-3">(Demo: enter "mortgage")</p>
                                        <input
                                            type="text"
                                            placeholder="Your answer..."
                                            value={secAnswer}
                                            onChange={(e) => setSecAnswer(e.target.value)}
                                            className="w-full h-10 px-3 text-sm rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent"
                                        />
                                    </div>
                                    {error && (
                                        <div className="flex items-center gap-2 bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2 text-sm text-[#DC2626]">
                                            <AlertTriangle size={14} />
                                            {error}
                                        </div>
                                    )}
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        loading={loading}
                                        disabled={!secAnswer.trim()}
                                        onClick={handleVerify}
                                    >
                                        Verify Answer
                                    </Button>
                                </>
                            )}

                            <button
                                onClick={() => { setStep('select'); setError(''); setOtp(Array(6).fill('')); setSecAnswer(''); }}
                                className="text-sm text-center text-[#64748B] hover:text-[#334155] transition-colors"
                            >
                                ← Use a different method
                            </button>
                        </div>
                    )}
                </Card>

                <p className="text-center text-xs text-[#94A3B8] mt-6">
                    NMLS requires identity verification to ensure compliance with seat time requirements.
                </p>
            </div>
        </div>
    );
}
