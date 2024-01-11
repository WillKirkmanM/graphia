"use client"

import { TextInput, Button, Group, Stack } from "@mantine/core"
import { IconAt } from "@tabler/icons-react"
import { useState } from "react"
import { api } from "~/trpc/react"
import { useSession } from "next-auth/react"
import { notifications } from '@mantine/notifications';
import AvatarChangeZone from "../components/User/AvatarChangeZone"

export default function Settings() {
  const user = useSession();
  if (!user.data) return
  const [username, setUsername] = useState(user.data.user.username)
  const [name, setName] = useState(user.data.user.name ?? "")

  const userChange = api.user.updateUsername.useMutation({
    onSuccess: () => {
      notifications.show({ title: "Username updated successfully", message: `New username: ${username}. The page will now refresh`, color: "green" });
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    },
    onError: (error) => {
      notifications.show({ title: "Error updating username", message: error.message, color: "red" });
    }
  });

  return (
    <>
      <Group>
        <AvatarChangeZone src={user.data.user.image ?? ""}/>
        <Stack>
          <TextInput placeholder="Enter desired name" label="Name" value={name || ''} onChange={(e) => setName(e.currentTarget.value) }/>
          <TextInput leftSection={<IconAt />} placeholder="Enter desired username" label="Username" value={username} onChange={(e) => setUsername(e.currentTarget.value) }/>
          <Button onClick={() => userChange.mutate({ id: user.data?.user.id, username }) }>Change Username</Button>
        </Stack>
      </Group>
    </>
  )
}
