import { Container, HStack, Heading, Box } from '@chakra-ui/react'
import { ColorModeButton } from './ui/color-mode'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box 
      bg={{ base: "white", _dark: "gray.900" }}
      borderBottom="1px solid"
      borderColor={{ base: "gray.200", _dark: "gray.700" }}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="6xl" py={4}>
        <HStack h="16" justify="space-between" w="full">
          <Heading 
            size="lg" 
            _hover={{ color: "teal.600" }}
            transition="color 0.2s"
          >
            <Link to="/">Cool UI Components</Link>
          </Heading>
          <ColorModeButton />
        </HStack>
      </Container>
    </Box>
  )
}

export default Header
