"use client"

import PostCard from "./PostCard"
import { api } from "~/trpc/react"

export default function PostList() {
  const postList = api.post.getAll.useQuery().data

  return (
    <>
      <p>Post List</p>
      {postList?.map((post) => (
          <PostCard post={post}/>
        )
      )}

    </>
  )
}