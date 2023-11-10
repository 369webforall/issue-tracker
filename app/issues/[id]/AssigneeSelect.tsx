'use client';
import { Select } from '@radix-ui/themes';

import axios from 'axios';
import { Issue, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@/app/components/Skeleton';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 2000,
    retry: 3,
  });
  if (isLoading) return <Skeleton />;

  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'Unassigned'}
        onValueChange={(userId) => {
          axios
            .patch('/api/issues/edit/' + issue.id, {
              assignedToUserId: userId || null,
            })
            .catch((error) => toast.error('Changes could not be saved.'));
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
