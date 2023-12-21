"use client";

import { Textarea, Fieldset, Button, ActionIcon, Group, Title, MultiSelect } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import Markdown from "markdown-to-jsx";
import { api } from "~/trpc/react";

export default function New() {
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")
  const [body, setBody] = useState("")
  const [preview, setPreview] = useState(false)

  const createPost = api.post.create.useMutation()
  const tagList = api.tag.getAll.useQuery().data?.map((tag) => tag.name)
  
  return (
    <>
      <Fieldset legend="Your Post">
        {!preview ? (
          <>
            <Textarea placeholder="Your Post Title" value={title} autosize minRows={1} mb={10} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <MultiSelect placeholder="Enter up to 5 tags..." data={tagList} onChange={(e) => setTags(e.join(","))} value={tags ? tags.split(",") : []} searchable/>
            <Textarea placeholder="Write your post content here..." value={body} autosize minRows={4} mt={10} onChange={(e) => setBody(e.currentTarget.value)}/>
          </>
        ) : (
          <>
            <Title>{title}</Title>
            <Markdown>{body}</Markdown>
          </>
        )}

        <Group py="md">
          <Button onClick={() => createPost.mutate({ title, tags, body }) }>Publish</Button>
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