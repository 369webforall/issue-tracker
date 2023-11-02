import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Grid, Box } from '@radix-ui/themes';

import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="4">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
