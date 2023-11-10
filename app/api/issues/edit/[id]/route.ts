import { patchIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOption } from '@/app/auth/authOption';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const { title, description, assignedToUserId } = body;

  const user = prisma.user.findUnique({ where: { id: assignedToUserId } });
  if (!user) {
    return NextResponse.json({ error: 'No user found' }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue)
    return NextResponse.json({ error: 'No issue foud' }, { status: 404 });
  await prisma.issue.delete({ where: { id: params.id } });
  return NextResponse.json(
    { message: 'The isssue is delete' },
    { status: 200 }
  );
}
