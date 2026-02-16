'use client'
import { useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

interface MainLayoutProps {
    children: React.ReactNode
    pageName?: string
}

export const MainLayout = ({ children, pageName }: MainLayoutProps) => {
    useEffect(() => {
        if (pageName) {
            document.title = `${pageName} | Excellent Care Clinics`
        }
    }, [pageName])

    return (
        <Flex minH="100vh" bg="#F9FAFB" color="#242424">
            <Sidebar />
            <Box flex="1" ml="280px">
                <Navbar pageName={pageName} />
                <Box p="8">
                    {children}
                </Box>
            </Box>
        </Flex>
    )
}
