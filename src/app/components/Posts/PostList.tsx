"use client"

import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Skeleton } from "@mantine/core";
import { api } from "~/trpc/react";

export default function PostList() {
  const [loading, setLoading] = useState(true);
  const postListQuery = api.post.getAll.useQuery();

  useEffect(() => {
    if (postListQuery.data) {
      setLoading(false);
    }
  }, [postListQuery.data]);

  return (
    <>
      {loading ? (
        <>
        <Skeleton height={300} p="md" my="lg" />
        <Skeleton height={30} p="md" my="lg" radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
        <Skeleton height={300} p="md" my="lg" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="50%"radius="xl" />
        <Skeleton height={8} mt={6} width="40%" radius="xl" />

        <Skeleton height={300} p="md" my="lg" />
        <Skeleton height={30} p="md" my="lg" radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
        <Skeleton height={300} p="md" my="lg" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="50%"radius="xl" />
        <Skeleton height={8} mt={6} width="40%" radius="xl" />

        </>
      ) : (
        <>
          {postListQuery.data?.map((post) => (
            <PostCard post={post} />
          ))}
        </>
      )}
    </>
  );
}