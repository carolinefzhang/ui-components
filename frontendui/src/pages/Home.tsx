import {
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Title from "../components/Title"

const Home = () => {
  const components = [
    { path: "count-down", title: "Count Down", desc: "Timer component", emoji: "⏰" },
    { path: "check-out", title: "Checkout", desc: "Shopping cart", emoji: "🛒" },
    { path: "sudoku", title: "Sudoku", desc: "Puzzle game", emoji: "🧩" },
    { path: "interactive-box", title: "Interactive Box", desc: "Dynamic grid", emoji: "🎨" },
    { path: "recipe", title: "Recipe", desc: "Food recipes", emoji: "👨‍🍳" },
    { path: "meme-generator", title: "Meme Generator", desc: "Create memes", emoji: "😂" },
    { path: "tenzies", title: "Tenzies", desc: "Dice game", emoji: "🎲" },
    { path: "assembly-endgame", title: "Assembly Endgame", desc: "Strategy game", emoji: "💻" },
    { path: "stock", title: "Stock", desc: "Real-time stock report generator", emoji: "📈" }
  ];

  return (
    <>
      <Title 
        title="UI Components"
        description="Explore interactive components and games"
      />
      
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(3, 1fr)" }}
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
    </>
  );
};

export default Home;
