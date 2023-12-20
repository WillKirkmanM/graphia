"use client"

import { Text, Title, Center, Code, Button } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import Shell from "./components/Shell/Shell";

export default function Home() {
  const session = useSession();

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

        {session.status === "authenticated" ? <Text>Welcome, {session.data.user.name}!</Text> : null}
    </>
  );
}
