import { Container, Box } from "@chakra-ui/react";

import Header from "./Header";
import { Outlet } from "react-router"

const PageLayout = () => {
  return (
    <Box w="100%" minH="100vh" margin={0} padding={0}>
      <Header />
      <Box px={4}>
        <Box maxW="6xl" py={10} mx="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;