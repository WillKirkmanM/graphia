"use client"

import { ActionIcon, AppShell, Burger, Button, Group, TextInput, Text, Space, NavLink } from '@mantine/core';
import AvatarDropdown from '../User/AvatarDropdown';
import Link from 'next/link';

import { IconBell, IconHome2, IconPlus, IconSearch, IconWriting } from "@tabler/icons-react"
import { useDisclosure } from '@mantine/hooks';
import { signIn, useSession } from 'next-auth/react';

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const [opened, { toggle }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const session = useSession();

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: !desktopOpened, mobile: !opened },
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
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
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

      <AppShell.Navbar p="md">
        <NavLink
          href="/"
          label="Home"
          leftSection={<IconHome2 size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="/new"
          label="Write Post"
          leftSection={<IconWriting size="1rem" stroke={1.5} />}
        />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}