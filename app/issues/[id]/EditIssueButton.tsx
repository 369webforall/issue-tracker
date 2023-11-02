import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${issueId}`}>Update Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
