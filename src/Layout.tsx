import * as React from "react"
import {
  ChakraProvider,
  Box,
  Button,
  theme,
  HStack,
  Stack,
  Spacer,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Link } from "react-router-dom"
import { useUser } from "./UserProvider"

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useUser()
  return (
    <ChakraProvider theme={theme}>
      <Stack textAlign="center">
        <HStack>
          <Spacer />
          <HStack p={4} spacing={4}>
            <Box opacity={0.5}>
              {user ? user.email : ''}
            </Box>
            <Link to='/'>
              Home
            </Link>
            {user ? <Link to='/dashboard'>
              Dashboard
            </Link> : null}
            {user ? (
              <Button as={Link} to='/' onClick={logout}>Logout</Button>
            ) : (
              <Button as={Link} to='/login'>Login</Button>
            )}
            <ColorModeSwitcher justifySelf="flex-end" />
          </HStack>
        </HStack>
        <Box height='100%'>
          {children}
        </Box>
      </Stack>
    </ChakraProvider>
  )
}