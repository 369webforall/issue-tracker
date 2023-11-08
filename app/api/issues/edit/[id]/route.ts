import { createIssueSchema } from '@/app/validationSchema';
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
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
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
