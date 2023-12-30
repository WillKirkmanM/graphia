"use client"

import { ActionIcon, AppShell, Burger, Button, Group, TextInput, Text, Space } from '@mantine/core';
import AvatarDropdown from '../User/AvatarDropdown';
import Link from 'next/link';

import { IconBell, IconPlus, IconSearch } from "@tabler/icons-react"
import { useDisclosure } from '@mantine/hooks';
import { signIn, useSession } from 'next-auth/react';

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const [opened, { toggle }] = useDisclosure();
  const session = useSession();

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Group p="sm" align="center">
          <Space w={200}/>
          <Link href="/">
            <Text>Graphia</Text>
          </Link>
          <TextInput placeholder="Search..." radius="lg" leftSection={<IconSearch />} w={500}  />
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
              <AvatarDropdown profileURL={session.data.user.image ?? ""}/>
            </>
            ) : (
            <>
              <Button onClick={() => signIn()} variant="subtle" color="gray">Login</Button>
              <Button variant="outline" color="violet">Create Account</Button>
            </>
          )}
          <Space w={200}/>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}