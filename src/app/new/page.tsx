"use client";

import { Textarea, Fieldset, Button, ActionIcon, Group, Title, MultiSelect, Text, Container, Flex, Divider } from "@mantine/core";
import Link from "next/link";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import Markdown from "markdown-to-jsx";
import { api } from "~/trpc/react";
import slugify from "slugify";

export default function New() {
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")
  const [body, setBody] = useState("")
  const [slug, setSlug] = useState("")
  const [preview, setPreview] = useState(false)

  const createPost = api.post.create.useMutation()
  const tagList = api.tag.getAll.useQuery().data

  return (
    <>
      <Fieldset legend="Your Post">
        {!preview ? (
          <>
            <Textarea placeholder="Your Post Title" value={title} autosize minRows={1} mb={10} onChange={(e) => { setTitle(e.currentTarget.value); setSlug(slugify(e.currentTarget.value)) }}/>
            <Textarea placeholder="The desired url" value={slug} autosize minRows={1} mb={10} onChange={(e) => setSlug(e.currentTarget.value)}/>
            <MultiSelect placeholder="Enter up to 5 tags..." data={tagList ? [...tagList].sort((a, b) => b.popularity - a.popularity).map(tag => tag.name) : []} onChange={(e) => setTags(e.join(","))} value={tags ? tags.split(",") : []}  searchable/>
            <Textarea placeholder="Write your post content here..." value={body} autosize minRows={4} mt={10} onChange={(e) => setBody(e.currentTarget.value)}/>
          </>
        ) : (
          <>
            <Title>{title}</Title>
            {slug ? <Link href={window.location.host + "/" + slug}><Text c="blue">{window.location.host + "/" + slug}</Text></Link> : null}
            <Flex wrap="wrap" my="xs">
            {tags ? tags.split(",").map((tag, index) => (
              <Container bg="#f1f3f5" size="sm" px={10} mx={5} style={{ borderRadius: '10px', padding: 0, margin: 'auto', display: 'inline-block' }}>
                <Text key={index}>#{tag}</Text>
              </Container>
              )) : null}
            </Flex>

            <Divider my="md" />

            <Markdown>{body}</Markdown>
          </>
        )}

        <Group py="md">
          <Button onClick={() => createPost.mutate({ title, slug, tags, body }) }>Publish</Button>
          <Button variant="outline">Save Draft</Button>

          <ActionIcon variant="default" color="gray" aria-label="Settings" size="lg">
            <IconSettings />
          </ActionIcon>

          <Button variant="default" color="violet" onClick={() => setPreview(!preview)}>
            {preview ? "Edit" : "Preview"}
          </Button>

        </Group>
      </Fieldset>
    </>
  )
}