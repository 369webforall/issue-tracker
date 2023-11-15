import React from 'react';

import prisma from '@/prisma/client';
import IssueActions from './IssueActions';

import { Status, Issue } from '@prisma/client';

import Pagination from '@/app/components/Pagination';
import { columnNames } from './IssueTable';
import { IssueQuery } from './IssueTable';
import IssueTable from './IssueTable';

interface Props {
  searchParams: IssueQuery;
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <div className="max-w-2xl">
      <IssueActions />
      <div className="mb-3">
        <IssueTable searchParams={searchParams} issues={issues} />
      </div>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export default IssuePage;
