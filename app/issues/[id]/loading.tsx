import { Heading, Flex, Card } from '@radix-ui/themes';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Skeleton } from '@/app/components';

const LoadingIssueDetailPage = () => {
  return (
    <div>
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="4" my="4">
        <Skeleton />
        <Skeleton />
      </Flex>
      <Card className="prose" my="4">
        <Skeleton />
      </Card>
    </div>
  );
};

export default LoadingIssueDetailPage;
