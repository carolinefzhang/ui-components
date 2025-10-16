import {
  Box,
  SimpleGrid,
  NumberInput,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Title from "../components/Title";

const Sudoku = () => {
  const initialValue = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const [grid, setGrid] = useState<number[][]>(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const row = parseInt(event.target.id.split("-")[0]);
    const col = parseInt(event.target.id.split("-")[1]);
    const newGrid = [...grid];
    newGrid[row][col] = parseInt(value) || 0;
    setGrid(newGrid);
  }

  function clearGrid() {
    setGrid(initialValue.map(row => [...row]));
  }

  async function fetchApi() {
    const sudoku = grid
      .map((row) => {
        return row
          .map((col) => {
            if (col === 0) {
              return ".";
            } else {
              return col.toString();
            }
          })
          .join("");
      })
      .join("");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sudoku: [sudoku] }),
    };
    try {
      const response = await fetch(import.meta.env.VITE_API_URL || "/api", requestOptions);
      const data = await response.json();
      const solution = data.data[0].solution;
      const newSolution = [];
      for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
          row.push(parseInt(solution[i * 9 + j]));
        }
        newSolution.push(row);
      }
      setGrid(newSolution);
    } catch (error) {
      console.error('Error solving sudoku:', error);
    }
  }

  const getBorderStyle = (rowIndex: number, colIndex: number) => {
    const borderStyle = {
      borderTop: rowIndex % 3 === 0 ? "3px solid" : "1px solid",
      borderLeft: colIndex % 3 === 0 ? "3px solid" : "1px solid",
      borderRight: colIndex === 8 ? "3px solid" : "1px solid",
      borderBottom: rowIndex === 8 ? "3px solid" : "1px solid",
      borderColor: "gray.600",
    };
    return borderStyle;
  };

  return (
    <>
      <Title
        title="Sudoku Solver"
        description="Enter numbers in the grid and click solve to get the solution"
      />
      <VStack gap={8}>
        <Box
          bg={{ base: "white", _dark: "gray.800" }}
        >
          <SimpleGrid columns={9} gap={0}>
            {grid.map((row, rowIndex) => {
              return row.map((col, colIndex) => {
                return (
                  <Box
                    key={`${rowIndex}-${colIndex}`}
                    w={12}
                    h={12}
                    {...getBorderStyle(rowIndex, colIndex)}
                    bg={col === 0 ? "transparent" : { base: "blue.50", _dark: "blue.900" }}
                  >
                    <NumberInput.Root size="sm">
                      <NumberInput.Input
                        id={`${rowIndex}-${colIndex}`}
                        value={col === 0 ? "" : col.toString()}
                        onChange={handleChange}
                        textAlign="center"
                        fontWeight="bold"
                        fontSize="lg"
                        border="none"
                        bg="transparent"
                        min={1}
                        max={9}
                        _focus={{
                          outline: "none",
                          outlineColor: "blue.400",
                        }}
                      />
                    </NumberInput.Root>
                  </Box>
                );
              });
            })}
          </SimpleGrid>
        </Box>

        <HStack gap={4}>
          <Button
            onClick={fetchApi}
            bg="teal"
            size="lg"
          >
            Solve Puzzle
          </Button>
          <Button
            onClick={clearGrid}
            variant="outline"
            size="lg"
            borderColor="gray.600"
          >
            Clear Grid
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default Sudoku;
