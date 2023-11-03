import React from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
const IssueActions = () => {
  return (
    <div className="mb-4">
      <Button>
        <Link href="/issues/new">Add New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
