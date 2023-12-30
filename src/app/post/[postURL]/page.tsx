"use client"

import { api } from "~/trpc/react"
import { Text } from "@mantine/core"
import PostCard from "~/app/components/Posts/PostCard";

interface PostProps {
  params: {
    postURL: string;
  };
}

export default function Post({ params }: PostProps) {
  const post = api.post.getPostByURL.useQuery({ slug: params.postURL }).data;

  return (
    <>
      {post ? (
        <>
          <PostCard post={post} />
        </>
      ) : (
        <Text>Post not found</Text>
      )}
    </>
  )
}