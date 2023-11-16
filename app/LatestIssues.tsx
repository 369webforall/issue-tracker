import React from 'react';
import { Card, Table, Flex, Heading, Avatar } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import Link from 'next/link';
import { IssueStatusBadge } from './components';
import { Issue } from '@prisma/client';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5" className="border-b-2 text-purple-500">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" gap="3" align="start">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  <Avatar
                    src={issue.assignedToUser?.image!}
                    fallback="?"
                    size="4"
                    radius="full"
                  />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
