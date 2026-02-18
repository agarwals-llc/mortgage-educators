import { MOCK_ENROLLMENTS } from '@/lib/data/mock';
import CourseClient from './CourseClient';

export function generateStaticParams() {
    return MOCK_ENROLLMENTS.map((e) => ({ id: e.course_id }));
}

export default function CourseDetailPortalPage({ params }: { params: { id: string } }) {
    return <CourseClient id={params.id} />;
}
