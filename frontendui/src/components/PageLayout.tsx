import { Container, VStack, Heading, Text, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  maxW?: string;
}

const PageLayout = ({ title, description, children, maxW = "6xl" }: PageLayoutProps) => {
  return (
    <Container maxW={maxW} py={10}>
      <VStack gap={8} mb={10}>
        <Heading size="2xl" textAlign="center" color="teal.500">
          {title}
        </Heading>
        {description && (
          <Text fontSize="lg" color="gray.500" textAlign="center" maxW="2xl">
            {description}
          </Text>
        )}
      </VStack>
      <Box>{children}</Box>
    </Container>
  );
};

export default PageLayout;