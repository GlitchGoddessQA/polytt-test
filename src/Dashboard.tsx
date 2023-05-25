import { Box, Heading, Alert, AlertIcon, Stack, Center } from '@chakra-ui/react'
import { useUser } from './UserProvider'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Dashboard() {
  const { user, loading } = useUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (loading) return
    if (!user) navigate('/login')
  }, [loading, navigate, user])
  return (
    <Box>
      <Heading>Dashboard</Heading>
      <Box p={5}>
        <Stack spacing={8}>
          <Heading size="md">Welcome {user?.email}</Heading>
        </Stack>
      </Box>
    </Box>
  )
}