import { Card, Title, Text, Flex, Divider, Container, Group, Image, Avatar, Stack } from "@mantine/core"
import Link from "next/link"
import { format } from "date-fns"
import { readingTime } from 'reading-time-estimator'
import type { Post } from "@prisma/client"
import { useSession } from "next-auth/react"

interface PreviewPostCardProps {
  post: Post
  previewImage?: File | null
}

export default function PreviewPostCard({ post, previewImage }: PreviewPostCardProps) {
  const url = `${window.location.host}/post/${post.slug}`
  const user = useSession().data?.user

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>

    <Image src={previewImage && URL.createObjectURL(previewImage)} />

    <Group>
      <Avatar radius={100} src={user?.image} />

      <Stack gap={0.5} my="md">
        <Text>{user?.name}</Text>
        <Text>{format(new Date(), "MMM do")} · Created now</Text>
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

    <Divider my="md" />

    <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </Card>
  )
}