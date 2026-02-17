'use client'

import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/react'

interface ShiftCardProps {
    type: 'surgery' | 'pain'
    title: string
    time: string
    staff: string
    initials: string
    height?: string
    color: string
    bgColor: string
    borderColor: string
}

export const ShiftCard = ({
    type,
    title,
    time,
    staff,
    initials,
    height = "160px",
    color,
    bgColor,
    borderColor
}: ShiftCardProps) => {
    return (
        <Box
            bg={bgColor}
            borderLeft="4px solid"
            borderLeftColor={color}
            borderTop="1px solid"
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor="#E9EDF5"
            borderRadius="12px"
            p="3"
            h={height}
            w="full"
            m="0"
            transition="all 0.2s"
            _hover={{ transform: 'translateY(-2px)', shadow: 'sm' }}
            cursor="pointer"
        >
            <VStack align="start" gap="3" h="full">
                <HStack w="full" justify="space-between">
                    <Box
                        bg="white"
                        border="1px solid"
                        borderColor="#E9EDF5"
                        borderRadius="full"
                        w="28px"
                        h="28px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text fontSize="10px" fontWeight="700" color="#64748B">{initials}</Text>
                    </Box>
                    <Badge variant="subtle" bg="white" color="#64748B" border="1px solid" borderColor="#E9EDF5" fontSize="10px" px="2" py="0.5" borderRadius="md">
                        {type}
                    </Badge>
                </HStack>
                <VStack align="start" gap="1" flex="1">
                    <Text fontWeight="600" fontSize="14px" color="#1A1A1A" lineHeight="shorter">{title}</Text>
                    <Text fontSize="12px" color="#64748B" fontWeight="500">{time}</Text>
                </VStack>
                <HStack gap="2" mt="auto">
                    <Box w="6px" h="6px" borderRadius="full" bg={color} />
                    <Text fontSize="12px" color="#64748B" fontWeight="600">{staff}</Text>
                </HStack>
            </VStack>
        </Box>
    )
}
