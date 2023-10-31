import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Heading, Flex, Card } from '@radix-ui/themes';
import IssueStatusBadge from '../IssueStatusBadge';
interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="4">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
