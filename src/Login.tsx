import { Box, Heading, Center, Stack, Input, FormControl, FormLabel, Button } from '@chakra-ui/react'
import { useUser } from './UserProvider'
import { useNavigate } from 'react-router-dom'
import { useAsyncCallback } from './useAsyncCallback'

export function Login() {
  const { login } = useUser()
  const navigate = useNavigate()

  const submitLogin = useAsyncCallback(async () => {
    const email = (document.getElementById('email') as HTMLInputElement)?.value
    const password = (document.getElementById('password') as HTMLInputElement)?.value

    if (!email || !password) {
      throw new Error('Missing email or password')
    }

    await login(
      email,
      password
    )

    navigate('/dashboard')
  })

  return (
    <Box>
      <Heading>Login</Heading>
      <Box p={5}>
        <Center>
          <Box w={'100%'} maxW={400}>
            <form onSubmit={async (e) => {
              e.preventDefault()
              submitLogin.execute()
            }}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input id='email' name='email' type='text' placeholder='calum@polybase.xyz' />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input id='password' name='password' type='password' placeholder='secret' />
                </FormControl>
                <Button type='submit' isLoading={submitLogin.loading}>
                  Login
                </Button>
              </Stack>
            </form>
          </Box>

        </Center>
      </Box >
    </Box >
  )
}