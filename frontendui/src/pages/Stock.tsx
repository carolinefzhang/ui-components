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
import Title from "../components/Title";
import { GoogleGenAI } from '@google/genai'
import { dates } from '../utils/dates'

type Recipe = {
  get: (arg0: string) => any;
};

const Stockpage = () => {
  const [stocks, setStocks] = React.useState<string[]>([]);
  const [report, setReport] = React.useState<string>("");
  const reportSection = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(
    () => {
      if (report !== "" && reportSection.current !== null) {
        const yCoord = reportSection.current.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: yCoord, behavior: "smooth" })
      }
    }, [report])

  function handleAddStock(formData: Recipe) {
    const stock = formData.get("stock")?.trim().toUpperCase();
    if (stock && !stocks.includes(stock)) {
      setStocks((prev) => [...prev, stock]);
    }
  }

  function removeStock(index: number) {
    setStocks((prev) => prev.filter((_, i) => i !== index));
  }

  const apiKey = import.meta.env.VITE_POLYGON_API_KEY;

  async function fetchStockData() {
    setLoading(true)
    try {
      const stockData = await Promise.all(stocks.map(async (ticker) => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${apiKey}`
        const response = await fetch(url)
        const data = await response.text()
        return data
      }))
      fetchReport(stockData.join(''))
    } catch (err) {
      console.error('error: ', err)
    }
  }

  async function fetchReport(data: string) {
    try {
      const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY})
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "model",
            parts: [
              {
                text: "You are a trading guru. Given data on share prices over the past 3 days, \
                write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.",
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: data,
              },
            ],
          },
        ],
      })
      setReport(response.text || "")
    } catch (err) {
      console.error('error: ', err)
    }
    setLoading(false)
  }

  return (
    <>
      <Title
        title="Stock Report Generator"
        description="Add up to 3 stocks below to get a super accurate stock prediction report"
      />
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
            <Text fontSize="lg" fontWeight="semibold" color={{ base: "gray:500", _dark: "gray.800" }}>Add Stocks</Text>
            <form action={handleAddStock}>
              <HStack w="full">
                <Input
                  name="stock"
                  placeholder="Enter a stock"
                  flex={1}
                  variant={"subtle"}
                />
                <Button type="submit" bg="teal" disabled={stocks.length >= 3}>
                  Add
                </Button>
              </HStack>
            </form>

            {stocks.length > 0 && (
              <VStack gap={4} w="full">
                <Wrap gap={2}>
                  {stocks.map((stock, idx) => (
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
                        onClick={() => removeStock(idx)}
                        title="Click to remove"
                        _hover={{ bg: "teal.200" }}
                      >
                        {stock} ×
                      </Box>
                    </WrapItem>
                  ))}
                </Wrap>

                <Button
                  disabled={stocks.length === 0}
                  loading={loading}
                  onClick={fetchStockData}
                  colorScheme="blue"
                  size="lg"
                >
                  {stocks.length === 0
                    ? `Add at least one stock`
                    : 'Generate Report'
                  }
                </Button>
              </VStack>
            )}
          </VStack>
        </Box>

        {report && (
          <Box
            ref={reportSection}
            p={6}
            borderRadius="lg"
            boxShadow="md"
            w="full"
          >
            <ReactMarkdown>{report}</ReactMarkdown>
          </Box>
        )}
      </VStack>
    </>
  );
};

export default Stockpage;
