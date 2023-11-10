import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(1).max(65525),
});

export const patchIssueSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(1).max(65525).optional(),
  assignedToUserId: z
    .string()
    .min(1, 'Assigned to user id is required')
    .max(255)
    .nullable(),
});
