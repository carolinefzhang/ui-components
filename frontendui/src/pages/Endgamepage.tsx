import {
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Box,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { generate } from "random-words";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import PageLayout from "../components/PageLayout";

type Language = {
  name: string;
  color: string;
};

const Endgamepage = () => {
  const [word, setWord] = useState(() =>
    generate({
      exactly: 1,
      minLength: 5,
      maxLength: 8,
      formatter: (word) => word.toUpperCase(),
    }).toString()
  );

  const initialLangs: Language[] = [
    { name: "TypeScript", color: "red.500" },
    { name: "C", color: "orange.500" },
    { name: "C++", color: "yellow.500" },
    { name: "C#", color: "green.500" },
    { name: "Go", color: "teal.500" },
    { name: "Java", color: "blue.500" },
    { name: "JavaScript", color: "cyan.500" },
    { name: "PHP", color: "purple.500" },
    { name: "Python", color: "pink.500" },
    { name: "Ruby", color: "gray.500" },
    { name: "Rust", color: "red.600" },
    { name: "Assembly", color: "orange.600" },
  ];
  const letters: string[] = new Array(26)
    .fill("")
    .map((_, index) => String.fromCharCode(65 + index));

  const [langs, setLangs] = useState<Language[]>(initialLangs);
  const [guess, setGuess] = useState<string[]>([]);
  const { width, height } = useWindowSize();
  const startGame = useRef<HTMLButtonElement>(null);

  const gameWon = word.split("").every((w) => guess.includes(w));
  const wrongGuesses = guess.filter((letter) => !word.includes(letter));
  const gameLost = !gameWon && wrongGuesses.length == langs.length - 1;
  const gameOver = gameWon || gameLost;

  function handleGuess(letter: string) {
    setGuess((prev) => {
      if (prev.includes(letter)) {
        return prev;
      }
      return [...prev, letter];
    });
  }

  function handleStart() {
    setWord(
      generate({
        exactly: 1,
        minLength: 5,
        maxLength: 8,
        formatter: (word) => word.toUpperCase(),
      }).toString()
    );
    setGuess([]);
    setLangs(initialLangs);
  }

  useEffect(() => {
    if (gameWon && startGame.current !== null) {
      startGame.current.scrollTo();
      startGame.current.focus();
    }
  }, [gameWon]);

  return (
    <PageLayout 
      title="Assembly: Endgame" 
      description={`Guess the word in under ${langs.length - 1} attempts to keep the programming world safe from Assembly!`}
    >
      {gameWon && (
        <Confetti
          recycle={false}
          numberOfPieces={1000}
          width={width}
          height={height}
        />
      )}
      <VStack spacing={8}>
        <Box
          bg={gameWon ? "green.100" : gameLost ? "red.100" : wrongGuesses.length > 0 ? "orange.100" : "transparent"}
          color={gameWon ? "green.800" : gameLost ? "red.800" : "orange.800"}
          p={4}
          borderRadius="lg"
          textAlign="center"
          minH={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {gameWon && "🎉 You win! Well done!"}
          {gameLost && `😭 Game over! Better start learning ${langs[langs.length - 1].name}`}
          {!gameOver && wrongGuesses.length > 0 && `🫡 Farewell ${langs[wrongGuesses.length - 1].name}`}
        </Box>
        
        <SimpleGrid columns={{ base: 3, md: 4, lg: 6 }} gap={3} w="full" maxW="4xl">
          {langs.map((lang, index) => (
            <Box
              key={index}
              bg={index < wrongGuesses.length ? "gray.800" : lang.color}
              color="white"
              p={3}
              borderRadius="md"
              textAlign="center"
              fontSize="sm"
              fontWeight="bold"
            >
              {index < wrongGuesses.length ? "💀" : lang.name}
            </Box>
          ))}
        </SimpleGrid>
        
        <HStack spacing={2} flexWrap="wrap" justify="center">
          {[...word].map((letter, index) => (
            <Box
              key={index}
              w={12}
              h={12}
              bg="white"
              border="2px solid"
              borderColor="gray.300"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="xl"
              fontWeight="bold"
              color={guess.includes(letter) ? "gray.800" : "red.500"}
            >
              {guess.includes(letter) || gameOver ? letter : ""}
            </Box>
          ))}
        </HStack>
        
        <SimpleGrid columns={{ base: 8, md: 10 }} gap={2} maxW="2xl">
          {letters.map((letter) => (
            <Button
              key={letter}
              size="sm"
              bg={
                word.includes(letter) && guess.includes(letter)
                  ? "#10A95B"
                  : wrongGuesses.includes(letter)
                  ? "#EC5D49"
                  : "#FCBA29"
              }
              onClick={() => handleGuess(letter)}
              disabled={guess.includes(letter)}
            >
              {letter}
            </Button>
          ))}
        </SimpleGrid>
        
        {gameOver && (
          <Button 
            ref={startGame} 
            onClick={handleStart}
            bg="teal"
            size="lg"
          >
            Start New Game
          </Button>
        )}
      </VStack>
    </PageLayout>
  );
};

export default Endgamepage;
