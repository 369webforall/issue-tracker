import '@radix-ui/themes/styles.css';
import './theme-config.css';
import { Theme } from '@radix-ui/themes';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './NavBar';
import AuthProvider from './auth/Provider';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
import { Container } from '@radix-ui/themes';
import QueryClientProvider from './QueryClientProvider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet">
              <NavBar />
              <main className="px-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
