"use client"

import { ActionIcon, AppShell, Button, Group, Text } from '@mantine/core';
import AvatarDropdown from '../User/AvatarDropdown';
import Link from 'next/link';

import { IconBell, IconPlus, IconSearch } from "@tabler/icons-react"
import { signIn, useSession } from 'next-auth/react';
import Search from '../Search/Search';
import { GoogleIcon } from '../Icons/GoogleIcon';

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const session = useSession();

  return (
    <>
      <AppShell
        header={{ height: { base: 50, md: 60, lg: 70 } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" justify="space-between" mx="sm">
          <Group justify="flex-start">
            <Link href="/">
              <Text>Graphia</Text>
            </Link>

              <Group visibleFrom="xs">
                <Search />
              </Group>
              <Group hiddenFrom="xs">
                <ActionIcon variant="transparent" color="gray">
                  <IconSearch />
                </ActionIcon>
              </Group>
            </Group>

            <Group justify="flex-end">
            {session.status === "authenticated" ? (
              <>
                <Link href="/new">
                  <Button variant="outline" color="violet" leftSection={<IconPlus />}>Create Post</Button>
                </Link>
                <ActionIcon variant="outline" color="gray" radius="sm" size={36}>
                  <IconBell />
                </ActionIcon>
                <AvatarDropdown profileURL={session.data.user.image ?? ""} />
              </>
            ) : (
              <>
                <Button onClick={() => signIn("google")} variant="subtle" color="gray" leftSection={<GoogleIcon />}>Login with Google</Button>
              </>
            )}
            </Group>
          </Group>
          </AppShell.Header>

          <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
      </>
  );
}