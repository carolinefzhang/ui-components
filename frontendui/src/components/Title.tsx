import { Heading, Text, VStack } from "@chakra-ui/react"

interface TitleProps {
    title: string;
    description?: string;
}
const Title = ({title, description}: TitleProps) => {

    return (
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
    )
}

export default Title
