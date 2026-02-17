'use client'
import React, { useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

interface MainLayoutProps {
    children: React.ReactNode
    pageName?: string
}

export const MainLayout = ({ children, pageName }: MainLayoutProps) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    useEffect(() => {
        if (pageName) {
            document.title = `${pageName} | Excellent Care Clinics`
        }
    }, [pageName])

    return (
        <Flex minH="100vh" bg="#F9FAFB" color="#242424" overflowX="hidden">
            <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
            <Box flex="1" ml={isCollapsed ? "80px" : "280px"} transition="margin-left 0.2s" minW="0">
                <Navbar pageName={pageName} />
                <Box p="8">
                    {children}
                </Box>
            </Box>
        </Flex>
    )
}
