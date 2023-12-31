import { Text, Title, Center, Code } from "@mantine/core";
import PostList from "./components/Posts/PostList";

export default function Home() {

  return (
    <>
        <Center>
          <Title>Mantine, TRPC, Prisma, NextAuth + App Directory Template</Title>
        </Center>

        <Center>
          <Text>🎈 Mantine + T3 Stack Starter Kit</Text>
        </Center>

        <Center>
          <Text>Edit <Code>src/app/page.tsx</Code> to get started</Text>
        </Center>

        <PostList />
    </>
  );
}
