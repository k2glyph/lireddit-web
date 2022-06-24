import { Box, Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{fetching: logoutFetching},logout]= useLogoutMutation()
    const [{ data, fetching }] = useMeQuery({
        pause: isServer()
    })
    let body = null
    // data is loading
    if (fetching || !data?.me) {
        body = (
            <>
                <NextLink href={'/login'}>
                    <Link mr={2}> Login </Link>
                </NextLink>
                <NextLink href={'/register'}>
                    <Link> Register </Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button variant={'link'} onClick={()=>{logout()}} isLoading={logoutFetching}>Logout</Button>
            </Flex>
        )
    }
    return (
        <Flex bg="tan" pl={4}>
            <Box ml={'auto'} mr={2}>
                {body}
            </Box>
        </Flex>
    )
}
