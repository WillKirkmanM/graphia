import { Card, Title, Text, Flex, Divider, Container, Anchor } from "@mantine/core"
import Markdown from "markdown-to-jsx"
import type { Post } from "@prisma/client"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const url = `${window.location.host}/post/${post.slug}`

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Title order={1} lineClamp={2}>{post.title}</Title>
    <Anchor href={window.location.protocol + "//" + url} target="_blank">{url}</Anchor> 
    <Flex wrap="wrap" my="xs">
    {post.tags ? post.tags.split(",").map((tag) => (
        <Container bg="#f1f3f5" size="sm" px={10} mx={5} style={{ borderRadius: '10px', padding: 0, margin: 'auto', display: 'inline-block' }}>
          <Text>#{tag}</Text>
        </Container>
      )) : null}
    </Flex>

    <Divider my="md" />

    <Markdown>{post.body}</Markdown>
  </Card>
  )
}