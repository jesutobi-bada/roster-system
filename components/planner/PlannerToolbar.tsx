'use client'

import {
    Box,
    HStack,
    Text,
    Button,
    IconButton,
    MenuRoot,
    MenuTrigger,
    MenuContent,
    MenuItem
} from '@chakra-ui/react'
import {
    Calendar,
    ArrowLeft2,
    ArrowRight2,
    Filter,
    UserAdd,
    Lock,
    ArrowDown2
} from 'iconsax-reactjs'

import dayjs from 'dayjs'

interface PlannerToolbarProps {
    currentDate: string
    setCurrentDate: (date: string) => void
}

export const PlannerToolbar = ({ currentDate, setCurrentDate }: PlannerToolbarProps) => {
    const date = dayjs(currentDate)

    const handleNext = () => {
        setCurrentDate(date.add(1, 'day').format('YYYY-MM-DD'))
    }

    const handlePrev = () => {
        setCurrentDate(date.subtract(1, 'day').format('YYYY-MM-DD'))
    }

    const handleToday = () => {
        setCurrentDate(dayjs().format('YYYY-MM-DD'))
    }
    return (
        <HStack justify="space-between" mb="6" w="full">
            <HStack gap="4">
                <Box bg="white" border="1px solid" borderColor="#D9E5F2" borderRadius="lg" p="2" px="4">
                    <HStack gap="2">
                        <Text color="gray.500" fontSize="sm">{date.format('ddd')}</Text>
                        <Text fontWeight="bold" fontSize="lg">{date.format('D')}</Text>
                        <Text fontWeight="bold" fontSize="lg" ml="2">{date.format('MMM, YYYY')}</Text>
                    </HStack>
                </Box>
            </HStack>

            <HStack gap="3">
                <IconButton variant="outline" borderColor="#D9E5F2" bg="white" aria-label="Add user">
                    <UserAdd size={20} color="gray" />
                </IconButton>
                <IconButton variant="outline" borderColor="#D9E5F2" bg="white" aria-label="Filter">
                    <Filter size={20} color="gray" />
                </IconButton>

                <HStack bg="white" border="1px solid" borderColor="#D9E5F2" borderRadius="lg" p="1">
                    <IconButton variant="ghost" size="sm" onClick={handlePrev} aria-label="Previous day">
                        <ArrowLeft2 size={16} color="gray" />
                    </IconButton>
                    <Text fontSize="sm" px="2">{date.isSame(dayjs(), 'day') ? 'Today' : 'Select day'}</Text>
                    <IconButton variant="ghost" size="sm" onClick={handleNext} aria-label="Next day">
                        <ArrowRight2 size={16} color="gray" />
                    </IconButton>
                </HStack>

                <Button
                    variant="outline"
                    borderColor="#D9E5F2"
                    bg="white"
                    gap="2"
                    fontWeight="medium"
                    onClick={handleToday}
                >
                    <Box boxSize="2" bg="green.500" borderRadius="full" />
                    This day
                    <ArrowDown2 size={14} color="gray" />
                </Button>

                <Button variant="outline" borderColor="#D9E5F2" bg="white">
                    Publish All
                </Button>

                <Button bg="#5653FC" color="white" gap="2" _hover={{ bg: "#4542E0" }}>
                    <Lock size={18} variant="Outline" />
                    Lock Shift
                </Button>
            </HStack>
        </HStack>
    )
}
