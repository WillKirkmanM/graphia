import { Card, Title, Text, Flex, Container, Group, Stack, Avatar } from "@mantine/core"
import { format, formatDistanceToNow } from "date-fns"
import Link from "next/link"
import type { Post } from "@prisma/client"
import { readingTime } from 'reading-time-estimator'
import { api } from "~/trpc/react"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const url = `${window.location.host}/post/${post.slug}`
  const author = api.user.getAuthor.useQuery({ id: post.createdById }).data

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>

    {/* {post.image && <Image src={post.image} />} */}

    <Group>
      <Avatar radius={100} src={author?.image} />

      <Stack gap={0.5} my="md">
        <Text>{author?.name}</Text>
        <Text>{format(post.createdAt, "MMM do")} · {formatDistanceToNow(post.createdAt)} ago</Text>
      </Stack>
    </Group>

    <Link href={window.location.protocol + "//" + url} style={{ color: 'inherit', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
      <Title order={1} lineClamp={2}>{post.title}</Title>
    </Link>

    <Group gap="xs">
      <Text>{readingTime(post.body).text}</Text>
      <Text>·</Text>
      <Text>{readingTime(post.body).words} words</Text>
    </Group>
    <Flex wrap="wrap" my="xs">
    {post.tags ? post.tags.split(",").map((tag) => (
        <Container bg="#f1f3f5" size="sm" px={10} mx={5} style={{ borderRadius: '10px', padding: 0, margin: 'auto', display: 'inline-block' }}>
          <Text>{tag}</Text>
        </Container>
      )) : null}
    </Flex>

    {/* <Divider my="md" /> */}

    {/* <div dangerouslySetInnerHTML={{ __html: post.body }} /> */}
    </Card>
  )
}