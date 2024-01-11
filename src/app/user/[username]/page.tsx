"use client"

import { Title, Text, Avatar, Stack, Group } from "@mantine/core";
import PostCard from "~/app/components/Posts/PostCard";
import { api } from "~/trpc/react";

interface UserPageProps {
  params: {
    username: string;
  }
}

export default function UserPage({ params }: UserPageProps) {
  const user = api.user.findByUsername.useQuery({ username: params.username }).data
  const userPosts = api.post.getPostByUser.useQuery({ username: params.username }).data

  return (
    <>
      {user ? (
        <>
          <Group>
            <Avatar src={user.image} alt="User Image" size="xl" radius={100} />
            <Stack gap="xs">
              <Title>{user.name}</Title>
              <Text>@{user.username}</Text>
            </Stack>
          </Group>

          <Stack>
            {userPosts?.map((post) => (
              <PostCard post={post}/>
            ) )}
          </Stack>
        </>
      ) : (
        <Text>Not found</Text>
      )}
    </>
  )
}