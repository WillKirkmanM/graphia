import { Menu, Avatar, rem } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import {
  IconSettings,
  IconLogout,
  IconPlus,
} from '@tabler/icons-react';

interface AvatarDropdownProps {
  profileURL: string;
}

export default function AvatarDropdown({ profileURL }: AvatarDropdownProps) {
  const user = useSession()

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar src={profileURL} alt="Profile Image" radius="xl" size="md" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component="a" href={`/user/${user.data?.user.username}`}>
          <div>{user.data?.user.name}</div>
          <div>@{user.data?.user.username}</div>
        </Menu.Item>
        <Menu.Label>Graphia</Menu.Label>
        <Menu.Item component="a" href="/new" leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>Create Post</Menu.Item>
        <Menu.Divider />

        <Menu.Label>Account Management</Menu.Label>
        <Menu.Item component="a" href="/settings" leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>Settings</Menu.Item>
        <Menu.Item color="red" onClick={() => signOut()} leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>Sign Out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}