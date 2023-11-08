'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { id: 1, href: '/', label: 'Dashboard' },
    { id: 2, href: '/issues/list', label: 'Issues' },
  ];
  return (
    <>
      <nav className="flex space-x-6 px-5 border-b h-14 mb-5 items-center">
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

      <Box>
        {status === 'authenticated' && (
          <Link href="/api/auth/signout">Logout</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </>
  );
};

export default NavBar;
