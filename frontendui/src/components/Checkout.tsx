import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Badge
} from "@chakra-ui/react";
import PageLayout from "./PageLayout";

interface Counter {
  id: number;
  queue: number[];
}

type myForm = {
  [x: string]: any;
};

const Checkout = () => {
  const initialValue: Counter[] = [
    { id: 1, queue: [0] },
    { id: 2, queue: [2, 5] },
    { id: 3, queue: [4] },
    { id: 4, queue: [0] },
  ];
  const [counter, setCounter] = useState(initialValue);

  function handleClick(formData: myForm) {
    let shortest = 10e8;
    let shortestIndex: number = 0;
    counter.forEach((element) => {
      const result = element.queue.reduce((a, b) => a + b, 0);
      if (result < shortest) {
        shortest = result;
        shortestIndex = element.id;
      }
    });
    
    const updatedCounter = counter.map((counter) => {
      if (counter.id === shortestIndex) {
        const updatedQueue = [
          ...counter.queue,
          parseInt(formData.get("quantity")),
        ];
        return { ...counter, queue: updatedQueue };
      }
      return counter;
    });
    setCounter(updatedCounter);
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      let total = 0;
      const updatedCounter = counter.map((counter) => {
        if (counter.queue[0] > 0) {
          counter.queue[0]--;
        } else {
          counter.queue.shift();
        }

        total = total + counter.queue.length;

        const updatedQueue = [...counter.queue];
        return { ...counter, queue: updatedQueue };
      });
      if (total === 0) {
        clearInterval(interval);
        return 0;
      }
      setCounter(updatedCounter);
    }, 5000);
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <PageLayout 
      title="Checkout Simulator" 
      description="Add items to the shortest queue. Counters process items automatically every 5 seconds."
    >
      <VStack spacing={8}>
        <Box 
          bg="white" 
          p={6} 
          borderRadius="lg" 
          boxShadow="md" 
          w="full" 
          maxW="md"
        >
          <form action={handleClick}>
            <VStack spacing={4}>
              <Text fontWeight="semibold" color={{ base: "gray.500", _dark: "gray.800" }}>Add Item to Queue</Text>
              <Input 
                name="quantity" 
                type="number" 
                placeholder="Enter quantity"
                min="1"
                required 
              />
              <Button type="submit" bg="teal" size="lg">
                Add to Checkout
              </Button>
            </VStack>
          </form>
        </Box>

        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 4 }} 
          gap={6} 
          w="full"
        >
          {counter.map((counter) => {
            const total = counter.queue.reduce((a, b) => a + b, 0);
            return (
              <Box 
                key={counter.id}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="md"
                border="2px solid"
                borderColor="gray.200"
              >
                <VStack spacing={3}>
                  <HStack>
                    <Text fontWeight="bold" fontSize="lg" color={{ base: "gray.500", _dark: "gray.800" }}>
                      Counter {counter.id}
                    </Text>
                    <Badge colorScheme="blue">
                      Total: {total}
                    </Badge>
                  </HStack>
                  <VStack spacing={2} w="full">
                    {counter.queue.length === 0 ? (
                      <Text color="gray.500" fontSize="sm">
                        Empty
                      </Text>
                    ) : (
                      counter.queue.map((item, index) => (
                        <Box
                          key={`${counter.id}-${index}`}
                          bg={index === 0 ? "green.100" : "gray.100"}
                          color={index === 0 ? "green.800" : "gray.700"}
                          p={2}
                          borderRadius="md"
                          w="full"
                          textAlign="center"
                          fontSize="sm"
                          fontWeight={index === 0 ? "bold" : "normal"}
                        >
                          {item} {index === 0 && "(Processing)"}
                        </Box>
                      ))
                    )}
                  </VStack>
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>
      </VStack>
    </PageLayout>
  );
};

export default Checkout;
