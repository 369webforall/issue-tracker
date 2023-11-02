import prisma from '@/prisma/client';
import IssueForm from '../../_components/IssueForm';
import { notFound } from 'next/navigation';
const IssueEditPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
