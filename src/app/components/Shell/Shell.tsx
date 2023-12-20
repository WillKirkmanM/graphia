"use client"

import { ActionIcon, AppShell, Burger, Button, Group, TextInput, Text, Space } from '@mantine/core';
import Link from 'next/link';

import { IconBell, IconSearch } from "@tabler/icons-react"
import { useDisclosure } from '@mantine/hooks';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Shell({ children }) {
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
          <TextInput placeholder="Search..." leftSection={<IconSearch />} />
        </Group>

        <Group justify="flex-end">
          {session.status === "authenticated" ? (
            <>
              <Link href="/new">
                <Button variant="outline" color="violet" >Create Post</Button>
              </Link>
              <ActionIcon variant="outline" color="gray" radius="sm" size="lg">
                <IconBell />
              </ActionIcon>
              <Button onClick={() => signOut()}>Sign Out</Button>
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