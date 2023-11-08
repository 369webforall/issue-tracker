import NextAuth from 'next-auth';
import { authOption } from '@/app/auth/authOption';
const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
