'use client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { Issue, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@/app/components/Skeleton';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const assignIssue = (userId: string) => {
    console.log(issue);
    console.log(userId);
    axios
      .patch('/api/issues/edit/' + issue.id, {
        assignedToUserId: userId === 'unassigned' ? null : userId,
      })
      .catch((error) => toast("Can't update the assigne, try again"));
  };

  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  return (
    <>
      <Select.Root
        onValueChange={assignIssue}
        defaultValue={issue.assignedToUserId || 'unassigned'}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
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

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

export default AssigneeSelect;
