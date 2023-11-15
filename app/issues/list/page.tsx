import React from 'react';
import { Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import IssueActions from './IssueActions';
import { Link, IssueStatusBadge } from '../../components';
import { Status, Issue } from '@prisma/client';
import NextLink from 'next/link';
import Pagination from '@/app/components/Pagination';

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    {
      label: 'Created',
      value: 'createdAt',
      className: 'hidden md:table-cell',
    },
  ];

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.label}
                  className="hidden md:table-cell"
                >
                  <NextLink
                    href={{ query: { ...searchParams, orderBy: column.value } }}
                  >
                    {column.label}
                  </NextLink>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden my-2">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
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
