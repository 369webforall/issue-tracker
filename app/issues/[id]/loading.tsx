import { Flex, Card, Box } from '@radix-ui/themes';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Skeleton } from '@/app/components';

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-2xl">
      <Skeleton />

      <Flex gap="4" my="4">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" my="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
