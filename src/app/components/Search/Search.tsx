"use client"

import { TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useState } from "react"
import type { Post } from "@prisma/client"
import { api } from "~/trpc/react"

export default function Search() {
  const [results, setResults] = useState<Post[] | null>(null)
  
  function handleSearch(search: string) {
    const results = api.post.searchPosts.useQuery({ search }).data!
    setResults(results)
  }
  
  return (
    <TextInput onChange={(e) => handleSearch(e.target.defaultValue)} placeholder="Search..." radius="lg" leftSection={<IconSearch />} />
  )
}