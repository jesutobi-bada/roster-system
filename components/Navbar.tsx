'use client'

import {
    Box,
    HStack,
    IconButton,
    Text,
    Badge,
    Avatar,
} from '@chakra-ui/react'
import {
    Element3,
    Setting2,
    Notification,
    ArrowDown2,
} from 'iconsax-reactjs'

interface NavbarProps {
    pageName?: string
}

export const Navbar = ({ pageName }: NavbarProps) => {
    return (
        <Box
            w="full"
            h="20"
            bg="white"
            borderBottom="1px solid"
            borderColor="#D9E5F2"
            px="8"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Text fontSize="xl" fontWeight="bold" color="#242424">
                {pageName}
            </Text>

            <HStack gap={6}>
                <HStack gap={4}>
                    <IconButton variant="ghost" aria-label="Apps">
                        <Element3 size={24} color="gray" />
                    </IconButton>
                    <IconButton variant="ghost" aria-label="Settings">
                        <Setting2 size={24} color="gray" />
                    </IconButton>
                    <Box position="relative">
                        <IconButton variant="ghost" aria-label="Notifications">
                            <Notification size={24} color="#64748B" variant="Outline" />
                        </IconButton>
                        <Box
                            position="absolute"
                            top="2.5"
                            right="2.5"
                            w="8px"
                            h="8px"
                            bg="red.500"
                            borderRadius="full"
                            border="2px solid white"
                        />
                    </Box>
                </HStack>

                <HStack gap={3} ml={4}>
                    <Box textAlign="right" color="#242424">
                        <Text fontWeight="semibold" fontSize="sm">Paul Cornelius</Text>
                        <Text fontSize="xs" color="gray.500">Paul@dstrct.com</Text>
                    </Box>
                    <Avatar.Root size="md">
                        <Avatar.Image src="https://bit.ly/tioluwani-kolawole" />
                        <Avatar.Fallback name="Paul Cornelius" />
                    </Avatar.Root>
                    <IconButton variant="ghost" aria-label="User Menu" size="xs">
                        <ArrowDown2 size={16} color="gray" />
                    </IconButton>
                </HStack>
            </HStack>
        </Box>
    )
}
