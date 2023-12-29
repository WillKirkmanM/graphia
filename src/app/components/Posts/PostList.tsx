"use client"

import { Card, Title, Text, Container, Flex, Divider } from "@mantine/core"
import Link from "next/link"
import Markdown from "markdown-to-jsx"

import { api } from "~/trpc/react"

export default function PostList() {
  const postList = api.post.getAll.useQuery().data

  return (
    <>
      {postList?.map((post) => (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={1} lineClamp={2}>{post.title}</Title>
          {post.slug ? <Link href={window.location.host + "/" + post.slug}><Text c="blue">{window.location.host + "/" + post.slug}</Text></Link> : null}
          <Flex wrap="wrap" my="xs">
          {post.tags ? post.tags.split(",").map((tag, index) => (
              <Container bg="#f1f3f5" size="sm" px={10} mx={5} style={{ borderRadius: '10px', padding: 0, margin: 'auto', display: 'inline-block' }}>
                <Text key={index}>#{tag}</Text>
              </Container>
            )) : null}
          </Flex>

          <Divider my="md" />

          <Markdown>{post.body}</Markdown>
        </Card>
      )
      )}

      <p>Post List</p>
    </>
  )
}