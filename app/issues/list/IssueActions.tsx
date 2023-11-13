import React from 'react';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';
const IssueActions = () => {
  return (
    <Flex mb="4" justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">Add New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
