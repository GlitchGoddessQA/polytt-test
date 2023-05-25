import { Box, Heading, Alert, AlertIcon, Stack, Center } from '@chakra-ui/react'
import { useRandomNumber } from './useRandomNumber'

export function Home() {
  const [randomNumber, loading] = useRandomNumber()
  return (
    <Box>
      <Heading>Home</Heading>
      <Box p={5}>
        <Stack spacing={8}>
          <Heading size="md">Random Number: {loading ? 'loading...' : randomNumber}</Heading>
          <Center >
            <Alert status='info' maxW={400}>
              <AlertIcon />
              Number will be between 1 and 100
            </Alert>
          </Center>
        </Stack>
      </Box>
    </Box>
  )
}