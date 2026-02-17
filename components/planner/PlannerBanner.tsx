'use client'

import { Box, HStack, Text, Button } from '@chakra-ui/react'

interface PlannerBannerProps {
    view: string
    setView: (view: string) => void
}

export const PlannerBanner = ({ view, setView }: PlannerBannerProps) => {
    return (
        <Box
            w="full"
            bg={view === 'live' ? "#FFF1F1" : "#F2F5FF"}
            border="1px solid"
            borderColor={view === 'live' ? "#FFD6D6" : "#D9E5F2"}
            borderRadius="full"
            p="1"
            mb="6"
            transition="all 0.2s"
        >
            <HStack gap="4">
                <HStack gap="0" bg="white" borderRadius="full" p="1">
                    <Button
                        size="xs"
                        borderRadius="full"
                        bg={view === 'live' ? "#FF3B30" : "transparent"}
                        color={view === 'live' ? "white" : "gray.500"}
                        px="4"
                        _hover={view === 'live' ? { bg: "#E6352B" } : { bg: "gray.100" }}
                        onClick={() => setView('live')}
                    >
                        Live
                    </Button>
                    <Button
                        size="xs"
                        variant="ghost"
                        borderRadius="full"
                        bg={view === 'planner' ? "#5653FC" : "transparent"}
                        color={view === 'planner' ? "white" : "gray.500"}
                        px="4"
                        _hover={view === 'planner' ? { bg: "#4542E0" } : { bg: "gray.100" }}
                        onClick={() => setView('planner')}
                    >
                        Planner
                    </Button>
                </HStack>
                <Text fontSize="sm" color="#242424" fontWeight="medium">
                    {view === 'live' ? "Description of the live" : "Currently in planner mode - draft your shifts"}
                </Text>
            </HStack>
        </Box>
    )
}
