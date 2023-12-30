"use client";

import { Textarea, Fieldset, Button, ActionIcon, Group, MultiSelect, Combobox, useCombobox,  } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { api } from "~/trpc/react";
import slugify from "slugify";
import TagSelection from "../components/Posts/TagSelection";
import PostCard from "../components/Posts/PostCard";

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
            {/* <MultiSelect placeholder="Enter up to 5 tags..." data={tagList ? [...tagList].sort((a, b) => b.popularity - a.popularity).map(tag => tag.name) : []} onChange={(e) => setTags(e.join(","))} value={tags ? tags.split(",") : []} maxValues={5} searchable /> */}
            <TagSelection />
            <Textarea placeholder="Write your post content here..." value={body} autosize minRows={4} mt={10} onChange={(e) => setBody(e.currentTarget.value)}/>
          </>
        ) : (
          <>
            <PostCard post={{ title, slug, tags, body, createdAt: new Date(), updatedAt: new Date(), createdById: "0", id: 0}}/>
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
