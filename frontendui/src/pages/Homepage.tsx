import {
  Container,
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const components = [
    { path: "/count-down", title: "Count Down", desc: "Timer component", emoji: "⏰" },
    { path: "/check-out", title: "Checkout", desc: "Shopping cart", emoji: "🛒" },
    { path: "/sudoku", title: "Sudoku", desc: "Puzzle game", emoji: "🧩" },
    { path: "/interactive-box", title: "Interactive Box", desc: "Dynamic grid", emoji: "🎨" },
    { path: "/recipe", title: "Recipe", desc: "Food recipes", emoji: "👨‍🍳" },
    { path: "/meme-generator", title: "Meme Generator", desc: "Create memes", emoji: "😂" },
    { path: "/tenzies", title: "Tenzies", desc: "Dice game", emoji: "🎲" },
    { path: "/assembly-endgame", title: "Assembly Endgame", desc: "Strategy game", emoji: "💻" },
  ];

  return (
    <Container maxW="6xl" py={10}>
      <VStack gap={8} mb={10}>
        <Heading size="2xl" textAlign="center" color="teal.500">
          UI Components
        </Heading>
        <Text fontSize="lg" color="gray.500" textAlign="center">
          Explore interactive components and games
        </Text>
      </VStack>
      
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
        gap={6}
      >
        {components.map(({ path, title, desc, emoji }) => (
          <GridItem key={path}>
            <Link to={path} style={{ textDecoration: "none" }}>
              <Box
                p={6}
                bg={{ base: "white", _dark: "gray.800" }}
                borderRadius="lg"
                boxShadow="md"
                border="1px"
                borderColor={{ base: "gray.200", _dark: "gray.600" }}
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                  borderColor: "teal.300",
                }}
                cursor="pointer"
              >
              <VStack align="start" gap={3}>
                <Text fontSize="3xl">{emoji}</Text>
                <Heading size="md">
                  {title}
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  {desc}
                </Text>
              </VStack>
              </Box>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Homepage;
