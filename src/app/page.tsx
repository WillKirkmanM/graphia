import { Title, Center, Divider } from "@mantine/core";
import PostList from "./components/Posts/PostList";

export default function Home() {

  return (
    <>
        <Center>
          <Title>Graphia</Title>
          <Divider my={100}/>
        </Center>

        <PostList />
    </>
  );
}
