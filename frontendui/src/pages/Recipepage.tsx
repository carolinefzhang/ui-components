import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from 'react-markdown'
import PageLayout from "../components/PageLayout";

type Recipe = {
  get: (arg0: string) => any;
};

const Recipepage = () => {
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [recipe, setRecipe] = React.useState<string>("");
  const recipeSection = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(
    () => {
        if (recipe !== "" && recipeSection.current !== null) {
            const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
            window.scrollTo({top: yCoord, behavior: "smooth"})
        }
    }, [recipe])

  function handleAddIngredient(formData: Recipe) {
    const ingredient = formData.get("ingredient")?.trim();
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients((prev) => [...prev, ingredient]);
    }
  }

  function removeIngredient(index: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  async function handleGetRecipe() {
    setLoading(true)
    const ingredientList = ingredients.join(", ");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate a recipe using these ingredients: ${ingredientList}. Display the result in markdown format with clear sections for ingredients, instructions, and cooking time.`,
              },
            ],
          },
        ],
      }),
    };
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        requestOptions
      );
      const data = await response.json();
      setRecipe(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error generating recipe:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout 
      title="Recipe Generator" 
      description="Add ingredients and get AI-generated recipes"
      maxW="4xl"
    >
      <VStack gap={8}>
        <Box 
          bg="white" 
          p={6} 
          borderRadius="lg" 
          boxShadow="md" 
          w="full" 
          maxW="2xl"
        >
          <VStack gap={4}>
            <Text fontSize="lg" fontWeight="semibold" color={{ base: "gray:500", _dark: "gray.800" }}>Add Ingredients</Text>
            <form action={handleAddIngredient}>
              <HStack w="full">
                <Input 
                  name="ingredient" 
                  placeholder="Enter an ingredient"
                  flex={1}
                  variant={"subtle"}
                />
                <Button type="submit" bg="teal">
                  Add
                </Button>
              </HStack>
            </form>
            
            {ingredients.length > 0 && (
              <VStack gap={4} w="full">
                <Wrap gap={2}>
                  {ingredients.map((ingredient, idx) => (
                    <WrapItem key={idx}>
                      <Box 
                        as="span"
                        bg="teal.100"
                        color="teal.800"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                        cursor="pointer"
                        onClick={() => removeIngredient(idx)}
                        title="Click to remove"
                        _hover={{ bg: "teal.200" }}
                      >
                        {ingredient} ×
                      </Box>
                    </WrapItem>
                  ))}
                </Wrap>
                
                <Button
                  disabled={ingredients.length < 3}
                  loading={loading}
                  onClick={handleGetRecipe}
                  colorScheme="blue"
                  size="lg"
                >
                  {ingredients.length < 3 
                    ? `Add ${3 - ingredients.length} more ingredient${3 - ingredients.length > 1 ? 's' : ''}` 
                    : 'Generate Recipe'
                  }
                </Button>
              </VStack>
            )}
          </VStack>
        </Box>
        
        {recipe && (
          <Box 
            ref={recipeSection} 
            p={6} 
            borderRadius="lg" 
            boxShadow="md" 
            w="full"
          >
            <ReactMarkdown>{recipe}</ReactMarkdown>
          </Box>
        )}
      </VStack>
    </PageLayout>
  );
};

export default Recipepage;
