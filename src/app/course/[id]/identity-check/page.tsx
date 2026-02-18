import { MOCK_ENROLLMENTS } from '@/lib/data/mock';
import IdentityCheckClient from '../IdentityCheckClient';

export function generateStaticParams() {
    return MOCK_ENROLLMENTS.map((e) => ({ id: e.course_id }));
}

export default function IdentityCheckPage({ params }: { params: { id: string } }) {
    return <IdentityCheckClient id={params.id} />;
}
