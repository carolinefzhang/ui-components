import {
  Input,
  VStack,
  HStack,
  Field,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect} from "react";
import PageLayout from "../components/PageLayout";

type Meme = {
  topText: string;
  bottomText: string;
  imageUrl: string;
};

type AllMeme = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

const Memepage = () => {
  const [meme, setMeme] = useState<Meme>({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });
  const [allmemes, setAllMemes] = useState<AllMeme[]>([])
  const [width, setWidth] = useState<number>(window.innerWidth)
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {value, name} = e.currentTarget
    setMeme((prev) => ({ ...prev, [name]: value }));
  }

  function handleClick() {
    const url = allmemes[Math.floor(Math.random() * allmemes.length)].url;
    setMeme((prev) => ({...prev, imageUrl: url}));
  }
  
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then((res) => res.json())
    .then((data) => {
      setAllMemes(data.data.memes);
    })
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <PageLayout 
      title="Meme Generator" 
      description="Create hilarious memes with custom text"
      maxW="4xl"
    >
      <VStack spacing={8}>
        <Box 
          bg="white" 
          p={6} 
          borderRadius="lg" 
          boxShadow="md" 
          w="full" 
          maxW="2xl"
        >
          <VStack spacing={4}>
            <HStack spacing={4} w="full">
              <Field.Root flex={1}>
                <Field.Label>Top Text</Field.Label>
                <Input
                  placeholder="Enter top text"
                  value={meme.topText}
                  onChange={handleChange}
                  name="topText"
                  color={{ base: "gray.700", _dark: "gray.500" }}
                />
              </Field.Root>
              <Field.Root flex={1}>
                <Field.Label>Bottom Text</Field.Label>
                <Input
                  placeholder="Enter bottom text"
                  value={meme.bottomText}
                  onChange={handleChange}
                  name="bottomText"
                  color={{ base: "gray.700", _dark: "gray.500" }}
                />
              </Field.Root>
            </HStack>
            <Button 
              onClick={handleClick} 
              bg="teal" 
              size="lg"
              disabled={allmemes.length === 0}
            >
              Get New Meme Image
            </Button>
          </VStack>
        </Box>
        
        {meme && (
          <Box position="relative" maxW="lg">
            <Box 
              className="meme" 
              position="relative" 
              display="inline-block"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
            >
              <Text
                className="top-text"
                position="absolute"
                top={4}
                left="50%"
                transform="translateX(-50%)"
                color="white"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                textShadow="2px 2px 4px rgba(0,0,0,0.8)"
                textAlign="center"
                zIndex={1}
                maxW="90%"
              >
                {meme.topText}
              </Text>
              <img 
                src={meme.imageUrl} 
                alt="Meme" 
                style={{ 
                  maxWidth: "100%", 
                  height: "auto", 
                  display: "block" 
                }} 
              />
              <Text
                className="bottom-text"
                position="absolute"
                bottom={4}
                left="50%"
                transform="translateX(-50%)"
                color="white"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                textShadow="2px 2px 4px rgba(0,0,0,0.8)"
                textAlign="center"
                zIndex={1}
                maxW="90%"
              >
                {meme.bottomText}
              </Text>
            </Box>
          </Box>
        )}
        
        <Text fontSize="sm" color="gray.500">
          Window width: {width}px
        </Text>
      </VStack>
    </PageLayout>
  );
};

export default Memepage;
