import { useState } from "react"
import { Box, Button, HStack, VStack, Text } from "@chakra-ui/react";
import PageLayout from "./PageLayout";

type Circle = {
  x: number;
  y: number;
}

const InteractiveBox = () => {
  const [circles, setCircles] = useState<Circle[]>([])
  const [poppedCircles, setPoppedCircles] = useState<Circle[]>([])

  function handleUndo() {
    setCircles((prev) => {
      const newCircles = [...prev];
      const lastCircle = newCircles.pop();
      if (!lastCircle) return prev;
      setPoppedCircles([...poppedCircles, lastCircle]);
      return newCircles;
    });
  }
  
  function handleRedo() {
    setCircles((prev) => {
      const newCircles = [...prev];
      const newPopped = [...poppedCircles];
      const popped = newPopped.pop()
      if (!popped) return prev;
      newCircles.push(popped);
      setPoppedCircles(newPopped);
      return newCircles;
    });
  }
  
  function handleReset() {
    setCircles([]);
    setPoppedCircles([]);
  }

  function handleClick(event: React.MouseEvent<SVGSVGElement>) {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCircles((prev) => [...prev, { x, y }]);
    setPoppedCircles([]); // Clear redo history when new action is performed
  }

  return (
    <PageLayout 
      title="Interactive Drawing" 
      description="Click anywhere in the canvas to draw circles. Use the controls to undo, redo, or reset."
    >
      <VStack spacing={6}>
        <Box 
          bg="white" 
          borderRadius="lg" 
          boxShadow="lg" 
          p={4}
          border="2px solid"
          borderColor="gray.300"
        >
          <Box
            as="svg"
            width={500}
            height={400}
            cursor="crosshair"
            onClick={handleClick}
            bg="gray.50"
            borderRadius="md"
          >
            {circles.map((circle, index) => (
              <circle
                key={index}
                cx={circle.x}
                cy={circle.y}
                r="8"
                fill="teal.500"
                stroke="teal.600"
                strokeWidth="2"
                opacity={0.8}
              />
            ))}
          </Box>
        </Box>
        
        <HStack spacing={4}>
          <Button 
            disabled={circles.length === 0} 
            onClick={handleUndo}
            colorScheme="orange"
            variant="outline"
          >
            Undo
          </Button>
          <Button 
            disabled={poppedCircles.length === 0} 
            onClick={handleRedo}
            colorScheme="blue"
            variant="outline"
          >
            Redo
          </Button>
          <Button 
            disabled={circles.length === 0} 
            onClick={handleReset}
            colorScheme="red"
            variant="outline"
          >
            Reset
          </Button>
        </HStack>
        
        <Text fontSize="sm" color="gray.600">
          Circles drawn: {circles.length}
        </Text>
      </VStack>
    </PageLayout>
  );
};

export default InteractiveBox;
