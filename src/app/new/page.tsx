"use client";

import { Textarea, Fieldset, Button, ActionIcon, Group, Switch, FileButton } from "@mantine/core";
import Editor from "../components/Editor/Editor";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { api } from "~/trpc/react";
import slugify from "slugify";
import TagSelection from "../components/Posts/TagSelection";
import PreviewPostCard from "../components/Posts/PreviewPostCard";

export default function New() {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [tags, setTags] = useState([""])
  const [body, setBody] = useState("")
  const [slug, setSlug] = useState("")
  const [preview, setPreview] = useState(false)
  const [showToolbar, setShowToolbar] = useState(true)

  const createPost = api.post.create.useMutation()
  return (
    <>
      <Fieldset legend="Your Post">
        {!preview ? (
          <>
            <Textarea placeholder="Your Post Title" value={title} autosize minRows={1} mb={10} onChange={(e) => { setTitle(e.currentTarget.value); setSlug(slugify(e.currentTarget.value)) }}/>
            <FileButton onChange={setImage} accept="image/png,image/jpeg">
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
            <Textarea placeholder="The desired url" value={slug} autosize minRows={1} mb={10} onChange={(e) => setSlug(e.currentTarget.value)}/>
            {/* <MultiSelect placeholder="Enter up to 5 tags..." data={tagList ? [...tagList].sort((a, b) => b.popularity - a.popularity).map(tag => tag.name) : []} onChange={(e) => setTags(e.join(","))} value={tags ? tags.split(",") : []} maxValues={5} searchable /> */}
            <TagSelection tags={tags} setTags={setTags}/>
            {/* <Textarea placeholder="Write your post content here..." value={body} autosize minRows={4} mt={10} onChange={(e) => setBody(e.currentTarget.value)}/> */}
            <Editor body={body} setBody={setBody} showToolbar={showToolbar}/>
          </>
        ) : (
          <>
            <PreviewPostCard post={{ title, slug, tags: tags.join(", "), body, createdAt: new Date(), updatedAt: new Date(), createdById: "0", id: 0}} previewImage={image}/>
          </>
        )}

        <Group py="md">
          <Button onClick={() => createPost.mutate({ title, slug, tags: tags.join(", "), body }) }>Publish</Button>
          <Button variant="outline">Save Draft</Button>

          <ActionIcon variant="default" color="gray" aria-label="Settings" size="lg">
            <IconSettings />
          </ActionIcon>

          <Button variant="default" color="violet" onClick={() => setPreview(!preview)}>
            {preview ? "Edit" : "Preview"}
          </Button>

          <Switch
            label="Show Toolbar"
            defaultChecked
            onChange={(e) => setShowToolbar(e.currentTarget.checked)}
          />
        </Group>
      </Fieldset>
    </>
  )
}
