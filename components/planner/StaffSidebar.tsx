'use client'
import React from 'react'

import {
    Box,
    VStack,
    HStack,
    Text,
    Input,
    IconButton,
    Avatar,
    Tabs,
    Button as ChakraButton,
    Portal,
    SimpleGrid
} from '@chakra-ui/react'
import { SearchNormal1, Filter, Maximize4, ArrowLeft } from 'iconsax-reactjs'

const StaffCard = ({ name, initials, id, hours, weeklyHours, dates, status }: any) => (
    <Box
        bg="white"
        border="1px solid"
        borderColor="#E9EDF5"
        borderRadius="20px"
        p="4"
        w="full"
        position="relative"
    >
        <HStack gap="3" mb="3" align="start">
            <Box
                w="54px"
                h="54px"
                bg="#F1F3F6"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
            >
                <Text fontSize="md" fontWeight="bold" color="#64748B">{initials || name.split(' ').map((n: any) => n[0]).join('')}</Text>
            </Box>
            <VStack align="start" gap="2" flex="1" pr="100px">
                <Text fontWeight="600" fontSize="18px" color="#1A1A1A" truncate>{name}</Text>
                <HStack gap="1.5">
                    <Box bg="#F0F4F9" px="2" py="0.5" borderRadius="6px">
                        <Text fontSize="13px" fontWeight="500" color="#64748B">{typeof id === 'number' ? id.toFixed(1) : id}hrs</Text>
                    </Box>
                    <Box bg="#F0F4F9" px="2" py="0.5" borderRadius="6px">
                        <Text fontSize="13px" fontWeight="500" color="#64748B">{typeof weeklyHours === 'number' ? weeklyHours.toFixed(1) : weeklyHours}hrs</Text>
                    </Box>
                </HStack>

                <Box bg="#FFF1F1" px="2" py="0.5" borderRadius="6px">
                    <Text fontSize="13px" fontWeight="500" color="#EB5757">{dates || 'No dates'}</Text>
                </Box>
            </VStack>
        </HStack>

        <HStack justify="flex-end" gap="1.5" mt="-6">
            <HStack gap="1.5">
                {[
                    { label: 'm', color: '#10B981', bg: '#EDFDF5' },
                    { label: 'di', color: '#10B981', bg: '#EDFDF5' },
                    { label: 'w', color: '#10B981', bg: '#EDFDF5' },
                    { label: 'do', color: '#F97316', bg: '#FFF7ED' },
                    { label: 'vr', color: '#F97316', bg: '#FFF7ED' },
                ].map((d) => (
                    <Box
                        key={d.label}
                        w="24px"
                        h="24px"
                        borderRadius="full"
                        bg={d.bg}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text fontSize="12px" color={d.color} fontWeight="500">{d.label}</Text>
                    </Box>
                ))}
            </HStack>
        </HStack>

        <Box
            position="absolute"
            top="4"
            right="4"
            bg="#FFF1F1"
            color="#EB5757"
            px="2"
            py="1"
            borderRadius="full"
            fontSize="12px"
            fontWeight="500"
            display="flex"
            alignItems="center"
            gap="1"
        >
            <Box w="4px" h="4px" borderRadius="full" bg="#EB5757" />
            {status}
        </Box>
    </Box>
)

interface StaffSidebarProps {
    staff: any[]
}

export const StaffSidebar = ({ staff }: StaffSidebarProps) => {
    const [search, setSearch] = React.useState('')
    const [tab, setTab] = React.useState('all')
    const [isExpanded, setIsExpanded] = React.useState(false)

    const filteredStaff = staff.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase())
        if (tab === 'all') return matchesSearch
        if (tab === 'on-leave') return matchesSearch && s.status === 'On leave'
        if (tab === 'available') return matchesSearch && s.status !== 'On leave'
        return matchesSearch
    })

    const onLeaveCount = staff.filter(s => s.status === 'On leave').length
    const availableCount = staff.length - onLeaveCount

    return (
        <VStack
            w="400px"
            h="full"
            align="stretch"
            gap="6"
            bg="white"
            p="6"
            borderRadius="2xl"
            border="1px solid"
            borderColor="#D9E5F2"
            overflow="hidden"
        >
            <HStack justify="space-between">
                <HStack gap="2">
                    <IconButton variant="ghost" size="xs" onClick={() => setIsExpanded(true)}>
                        <Maximize4 size={16} color="gray" />
                    </IconButton>
                    <Text fontWeight="bold" fontSize="lg">Roster</Text>
                </HStack>
            </HStack>

            <HStack gap="2">
                <Box flex="1" position="relative">
                    <Input
                        placeholder="Search"
                        bg="#F9FAFB"
                        border="1px solid"
                        borderColor="#D9E5F2"
                        pl="10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Box position="absolute" left="3" top="50%" transform="translateY(-50%)">
                        <SearchNormal1 size={18} color="gray" />
                    </Box>
                </Box>
                <IconButton variant="outline" borderColor="#D9E5F2">
                    <Filter size={18} color="gray" />
                </IconButton>
            </HStack>

            <Tabs.Root value={tab} onValueChange={(details) => setTab(details.value)} variant="plain" flex="1" display="flex" flexDirection="column" minH="0">
                <Tabs.List gap="4" borderBottom="1px solid" borderColor="gray.100" mb="4">
                    <Tabs.Trigger
                        value="all"
                        py="2"
                        fontSize="sm"
                        color={tab === 'all' ? "#5653FC" : "gray.400"}
                        borderBottom={tab === 'all' ? "2px solid #5653FC" : "none"}
                        transition="all 0.2s"
                        _hover={{ color: "#5653FC" }}
                    >
                        All <Box as="span" ml="2" opacity={0.6}>{staff.length}</Box>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="available"
                        py="2"
                        fontSize="sm"
                        color={tab === 'available' ? "#5653FC" : "gray.400"}
                        borderBottom={tab === 'available' ? "2px solid #5653FC" : "none"}
                        transition="all 0.2s"
                        _hover={{ color: "#5653FC" }}
                    >
                        Available <Box as="span" ml="2" opacity={0.6}>{availableCount}</Box>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="on-leave"
                        py="2"
                        fontSize="sm"
                        color={tab === 'on-leave' ? "#5653FC" : "gray.400"}
                        borderBottom={tab === 'on-leave' ? "2px solid #5653FC" : "none"}
                        transition="all 0.2s"
                        _hover={{ color: "#5653FC" }}
                    >
                        On Leave <Box as="span" ml="2" opacity={0.6}>{onLeaveCount}</Box>
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value={tab} flex="1" overflowY="auto" pr="2" minH="0">
                    <VStack gap="3" align="stretch" pb="4" h="full">
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map((s) => (
                                <StaffCard
                                    key={s.id}
                                    name={s.name}
                                    id={s.totalHours}
                                    weeklyHours={s.weeklyHours}
                                    dates={s.leaveDates}
                                    status={s.status}
                                />
                            ))
                        ) : (
                            <VStack flex="1" justify="center" gap="4" opacity={0.6} py="10">
                                <Box bg="gray.50" p="4" borderRadius="full">
                                    <SearchNormal1 size={32} color="gray" />
                                </Box>
                                <VStack gap="1">
                                    <Text fontWeight="bold">No staff found</Text>
                                    <Text fontSize="sm" textAlign="center">
                                        Try adjusting your search or filters to find what you're looking for.
                                    </Text>
                                </VStack>
                            </VStack>
                        )}
                    </VStack>
                </Tabs.Content>
            </Tabs.Root>

            {isExpanded && (
                <Portal>
                    <Box
                        position="fixed"
                        top="0"
                        left="0"
                        w="100vw"
                        h="100vh"
                        bg="#F9FAFB"
                        zIndex="1000"
                        p="8"
                        overflowY="auto"
                    >
                        <VStack align="stretch" gap="8" maxW="1200px" mx="auto">
                            <HStack justify="space-between">
                                <HStack gap="4">
                                    <IconButton
                                        variant="outline"
                                        onClick={() => setIsExpanded(false)}
                                        borderColor="#D9E5F2"
                                        borderRadius="xl"
                                        bg="white"
                                    >
                                        <ArrowLeft size={18} />
                                    </IconButton>
                                    <Text fontWeight="bold" fontSize="2xl">Staff Directory</Text>
                                </HStack>
                                <HStack gap="4">
                                    <Box minW="300px" position="relative">
                                        <Input
                                            placeholder="Search staff..."
                                            bg="white"
                                            border="1px solid"
                                            borderColor="#D9E5F2"
                                            pl="10"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <Box position="absolute" left="3" top="50%" transform="translateY(-50%)">
                                            <SearchNormal1 size={18} color="gray" />
                                        </Box>
                                    </Box>
                                    <ChakraButton
                                        bg="#5653FC"
                                        color="white"
                                        _hover={{ bg: "#4542E0" }}
                                        px="6"
                                        borderRadius="xl"
                                    >
                                        Add New Staff
                                    </ChakraButton>
                                </HStack>
                            </HStack>

                            <Tabs.Root value={tab} onValueChange={(details) => setTab(details.value)} variant="plain">
                                <Tabs.List gap="8" borderBottom="1px solid" borderColor="gray.100" mb="8">
                                    <Tabs.Trigger
                                        value="all"
                                        py="4"
                                        fontWeight="semibold"
                                        color={tab === 'all' ? "#5653FC" : "gray.400"}
                                        borderBottom={tab === 'all' ? "2px solid #5653FC" : "none"}
                                        transition="all 0.2s"
                                        _hover={{ color: "#5653FC" }}
                                    >
                                        All Staff ({staff.length})
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        value="available"
                                        py="4"
                                        fontWeight="semibold"
                                        color={tab === 'available' ? "#5653FC" : "gray.400"}
                                        borderBottom={tab === 'available' ? "2px solid #5653FC" : "none"}
                                        transition="all 0.2s"
                                        _hover={{ color: "#5653FC" }}
                                    >
                                        Available ({availableCount})
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        value="on-leave"
                                        py="4"
                                        fontWeight="semibold"
                                        color={tab === 'on-leave' ? "#5653FC" : "gray.400"}
                                        borderBottom={tab === 'on-leave' ? "2px solid #5653FC" : "none"}
                                        transition="all 0.2s"
                                        _hover={{ color: "#5653FC" }}
                                    >
                                        On Leave ({onLeaveCount})
                                    </Tabs.Trigger>
                                </Tabs.List>

                                <Tabs.Content value={tab}>
                                    {filteredStaff.length > 0 ? (
                                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
                                            {filteredStaff.map((s) => (
                                                <StaffCard
                                                    key={s.id}
                                                    name={s.name}
                                                    id={s.totalHours}
                                                    weeklyHours={s.weeklyHours}
                                                    dates={s.leaveDates}
                                                    status={s.status}
                                                />
                                            ))}
                                        </SimpleGrid>
                                    ) : (
                                        <VStack justify="center" gap="4" opacity={0.6} py="20" minH="400px">
                                            <Box bg="white" p="6" borderRadius="full">
                                                <SearchNormal1 size={48} color="gray" />
                                            </Box>
                                            <VStack gap="1">
                                                <Text fontWeight="bold" fontSize="xl">No staff found</Text>
                                                <Text color="gray.500" maxW="400px" textAlign="center">
                                                    We couldn't find any staff members matching your search or filters.
                                                    Try checking your spelling or selecting a different tab.
                                                </Text>
                                            </VStack>
                                        </VStack>
                                    )}
                                </Tabs.Content>
                            </Tabs.Root>
                        </VStack>
                    </Box>
                </Portal>
            )}
        </VStack>
    )
}
