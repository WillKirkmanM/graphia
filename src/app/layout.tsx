// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import { createTheme, MantineProvider, ColorSchemeScript } from '@mantine/core';

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import Shell from './components/Shell/Shell';

import { TRPCReactProvider } from "~/trpc/react";
import SessionProvider from "~/app/components/Session/SessionProvider";
import { getServerAuthSession } from '~/server/auth';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Graphia",
  description: "Some Blog",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <MantineProvider>
            <SessionProvider session={session}>
              <Shell>
                <ColorSchemeScript />
                {children}
              </Shell>
            </SessionProvider>
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
