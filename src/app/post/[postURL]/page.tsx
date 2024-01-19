"use client"

import { api } from "~/trpc/react"
import { Text, Group, Stack, Avatar, Title, Flex, TypographyStylesProvider, Container, Divider, Center } from "@mantine/core"
import { format, formatDistanceToNow } from "date-fns"
import { readingTime } from "reading-time-estimator"

interface PostProps {
  params: {
    postURL: string;
  };
}

export default function Post({ params }: PostProps) {
  const post = api.post.getPostByURL.useQuery({ slug: params.postURL }).data;
  const author = api.user.getAuthor.useQuery({ id: post?.createdById ?? "" }).data

  return (
    <>
      {post ? (
        <>
          {/* {post.image && <Image src={post.image} />} */}

          <Container>
          <Title order={1} lineClamp={2}>{post.title}</Title>
          <Group>
            <Avatar radius={100} src={author?.image} />

            <Stack gap={0.5} my="md">
              <Text>{author?.name}</Text>
              <Text>{format(post.createdAt, "MMM do")} · {formatDistanceToNow(post.createdAt)} ago</Text>
            </Stack>
              <Text>·</Text>
              <Text>{readingTime(post.body).text}</Text>
              <Text>·</Text>
              <Text>{readingTime(post.body).words} words</Text>
          </Group>


          <Group gap="xs">
          </Group>
          <Flex wrap="wrap" my="xs">
          {post.tags ? post.tags.split(",").map((tag) => (
              <Container bg="#f1f3f5" size="sm" px={10} mx={5} style={{ borderRadius: '10px', padding: 0, margin: 'auto', display: 'inline-block' }}>
                <Text>{tag}</Text>
              </Container>
            )) : null}
          </Flex>

          <Divider my="md" />

          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </TypographyStylesProvider>
          </Container>
        </>
      ) : (
        <Center>
          <Title>Post not found</Title>
        </Center>
      )}
    </>
  )
}