import { Card, Title, Text, Flex, Divider, Container, Anchor, Group } from "@mantine/core"
import { readingTime } from 'reading-time-estimator'
import type { Post } from "@prisma/client"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const url = `${window.location.host}/post/${post.slug}`
  const dateDiffDays = Math.floor((new Date().getTime() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const metric = dateDiffDays > 7 ? (dateDiffDays > 30 ? (dateDiffDays > 365 ? 'year' : 'month') : 'week') : 'day'
  
  let dateDiffMetric;
  switch(metric) {
    case 'day':
      dateDiffMetric = dateDiffDays;
      break;
    case 'week':
      dateDiffMetric = Math.floor(dateDiffDays / 7);
      break;
    case 'month':
      dateDiffMetric = Math.floor(dateDiffDays / 30);
      break;
    case 'year':
      dateDiffMetric = Math.floor(dateDiffDays / 365);
      break;
  }

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const timeAgo = rtf.format(-dateDiffMetric, metric);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Title order={1} lineClamp={2}>{post.title}</Title>

    <Group gap="xs">
      <Text>{readingTime(post.body).text}</Text>
      <Text>·</Text>
      <Text>{readingTime(post.body).words} words</Text>
      <Text>·</Text>
      <Text>{timeAgo}</Text>
    </Group>
    <Anchor href={window.location.protocol + "//" + url} target="_blank">{url}</Anchor> 
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