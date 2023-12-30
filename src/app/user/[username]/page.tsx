"use client"

import { Title, Text, Image } from "@mantine/core";
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
          <Image src={user.image} alt="User Image" width={100} height={100} radius="xl" />
          <Title>{user.name}</Title>
          <Text>@{user.username}</Text>

          {userPosts?.map((post) => (
              <PostCard post={post}/>
            )
          )}
        </>
      ) : (
        <Text>Not found</Text>
      )}
    </>
  )
}