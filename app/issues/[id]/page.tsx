import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Heading, Flex, Card, Grid, Box, Button } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
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
