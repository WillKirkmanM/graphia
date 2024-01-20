"use client"

import { ActionIcon, AppShell, Burger, Button, Group, TextInput, Text, Space, NavLink, Flex, Grid, Popover } from '@mantine/core';
import AvatarDropdown from '../User/AvatarDropdown';
import Link from 'next/link';

import { IconBell, IconBrandGoogle, IconHome2, IconLogin, IconPlus, IconSearch, IconWriting } from "@tabler/icons-react"
import { useDisclosure } from '@mantine/hooks';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import Search from '../Search/Search';
import { GoogleIcon } from '../Icons/GoogleIcon';

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const [opened, { toggle }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [showMobileSignIn, setShowMobileSignIn] = useState(false);
  const session = useSession();

  return (
    <>
      <AppShell
        header={{ height: { base: 50, md: 60, lg: 70 } }}
        navbar={{
          width: { base: 200, md: 300, lg: 300 },
          breakpoint: 'sm',
          collapsed: { desktop: !desktopOpened, mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" justify="space-between" mx="sm">
          <Group justify="flex-start">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm" 
            />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
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

        <AppShell.Navbar p="md">
        <NavLink
          href="/"
          label="Home"
          leftSection={<IconHome2 size="1rem" stroke={1.5} />} />
        <NavLink
          href="/new"
          label="Write Post"
          leftSection={<IconWriting size="1rem" stroke={1.5} />} />
        </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
      </>
  );
}