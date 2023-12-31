'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import {
  Box,
  Container,
  Flex,
  DropdownMenu,
  Avatar,
  Text,
} from '@radix-ui/themes';

import Skeleton from '@/app/components/Skeleton';
const NavBar = () => {
  return (
    <>
      <Box className="border-b h-14 mb-5 flex items-center">
        <Container>
          <Flex justify="between" align="center">
            <NavLinks />

            <AuthStatus />
          </Flex>
        </Container>
      </Box>
    </>
  );
};

const NavLinks = () => {
  const pathname = usePathname();
  const links = [
    { id: 1, href: '/', label: 'Dashboard' },
    { id: 2, href: '/issues/list', label: 'Issues' },
  ];
  return (
    <nav className="space-x-6 px-5 flex items-center  ">
      <Link href="/">
        <AiFillBug className="text-2xl" />
      </Link>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.id}
            className={classnames({
              'text-zinc-900': link.href === pathname,
              'text-zinc-500': link.href !== pathname,
              'hover:text-zinc-800 transition-colors': true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === 'unauthenticated')
    return <Link href="/api/auth/signin">Login</Link>;
  if (status === 'loading') <Skeleton width="3rem" />;
  return (
    <Box>
      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              radius="full"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text>{session.user!.email!}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};
export default NavBar;
