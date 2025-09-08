import {
  SimpleGrid,
  Button,
  VStack,
  VisuallyHidden,
  Box
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import PageLayout from "../components/PageLayout";

type Dice = {
  value: number;
  hold: boolean;
};

const Tenziespage = () => {
  const [dices, setDices] = useState<Dice[]>(
    Array(10)
      .fill({})
      .map(() => ({ value: Math.ceil(Math.random() * 6), hold: false }))
  );
  const rollDice = useRef<HTMLButtonElement>(null);

  const gameWon: boolean = dices.every(
    (dice) => dice.hold && dice.value === dices[0].value
  );
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (gameWon && rollDice.current !== null) {
      rollDice.current.focus();
    }
  }, [gameWon]);

  function handleClick(index: number) {
    setDices((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, hold: !item.hold } : item
      )
    );
  }

  function handleRoll() {
    if (gameWon) {
      setDices(
        Array(10)
          .fill({})
          .map(() => ({ value: Math.ceil(Math.random() * 6), hold: false }))
      );
    } else {
      setDices((prev) =>
        prev.map((item) =>
          item.hold ? item : { ...item, value: Math.ceil(Math.random() * 6) }
        )
      );
    }
  }
  
  return (
    <PageLayout 
      title="Tenzies" 
      description="Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
    >
      {gameWon && <Confetti width={width} height={height} />}

      {gameWon && (
        <VisuallyHidden>
          You won! Press "Start new game" to play again
        </VisuallyHidden>
      )}

      <VStack gap={8}>
        {gameWon && (
          <Box 
            bg="green.100" 
            color="green.800" 
            p={4} 
            borderRadius="lg" 
            textAlign="center"
            fontSize="lg"
            fontWeight="bold"
          >
            🎉 Congratulations! You won!
          </Box>
        )}
        
        <Box 
          bg="white" 
          p={8} 
          borderRadius="lg" 
          boxShadow="md"
        >
          <SimpleGrid columns={5} gap={4} maxW="md" mx="auto">
            {dices.map((dice, index) => (
              <Button
                key={index}
                onClick={() => handleClick(index)}
                size="lg"
                h={16}
                w={16}
                fontSize="2xl"
                fontWeight="bold"
                bg={dice.hold ? "teal" : "gray"}
                variant={dice.hold ? "surface" : "solid"}
                aria-pressed={dice.hold}
                aria-label={`Die with value ${dice.value}, ${dice.hold ? "held" : "not held"}`}
                transition="all 0.2s"
                _hover={{
                  transform: dice.hold ? "none" : "scale(1.05)",
                }}
              >
                {dice.value}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
        
        <Button 
          ref={rollDice} 
          onClick={handleRoll}
          size="lg"
          bg="teal"
          px={8}
        >
          {gameWon ? "Start New Game" : "Roll Dice"}
        </Button>
      </VStack>
    </PageLayout>
  );
};

export default Tenziespage;
