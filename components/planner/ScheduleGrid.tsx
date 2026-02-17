'use client'

import { useState } from 'react'
import {
    Box,
    Grid,
    Text,
    VStack,
    HStack,
    IconButton,
    DialogRoot as Dialog,
    DialogContent,
    DialogHeader,
    DialogBody,
    DialogCloseTrigger,
    DialogTitle,
    DialogBackdrop,
    Portal
} from '@chakra-ui/react'
import { ShiftCard } from './ShiftCard'
import dayjs from 'dayjs'
import { CloseCircle } from 'iconsax-reactjs'

interface ScheduleGridProps {
    departments: string[]
    times: string[]
    shifts: any[]
    currentDate: string
}

export const ScheduleGrid = ({ departments, times, shifts, currentDate }: ScheduleGridProps) => {
    const [selectedSlot, setSelectedSlot] = useState<any>(null)
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const handleCellClick = (time: string, dept: string) => {
        const slotShifts = shifts.filter(s => s.department === dept && s.startTime === time)
        if (slotShifts.length > 0) {
            setSelectedSlot({ time, shifts: slotShifts })
            setIsPopupOpen(true)
        }
    }

    const formattedDate = dayjs(currentDate).format('dddd D')
    return (
        <Box
            flex="1"
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="#D9E5F2"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            minW="0"
        >
            <Box overflowX="auto" flex="1" display="flex" flexDirection="column">
                <Box minW={`${100 + departments.length * 200}px`}>
                    {/* Header */}
                    <Grid templateColumns={`100px repeat(${departments.length}, 1fr)`} bg="#F2F5FF">
                        <Box borderRight="1px solid #D9E5F2" p="3">
                            <Text fontSize="xs" fontWeight="bold" color="#5653FC" textAlign="center">Days</Text>
                        </Box>
                        {departments.map((dept, i) => (
                            <Box
                                key={dept}
                                p="3"
                                borderRight={i < departments.length - 1 ? "1px solid #D9E5F2" : "none"}
                                textAlign="center"
                            >
                                <Text fontSize="xs" fontWeight="semibold" color="gray.500" truncate>
                                    {dept}
                                </Text>
                            </Box>
                        ))}
                    </Grid>

                    {/* Grid Body */}
                    <Box flex="1" overflowY="auto" position="relative">
                        {times.map((time) => (
                            <Grid key={time} templateColumns={`100px repeat(${departments.length}, 1fr)`} minH="120px" borderBottom="1px solid #F0F4F8">
                                {/* Time Label */}
                                <Box borderRight="1px solid #D9E5F2" p="3">
                                    <Text fontSize="xs" fontWeight="bold" color="gray.400" textAlign="center">{time}</Text>
                                </Box>

                                {/* Cells */}
                                {departments.map((dept, i) => {
                                    const departmentShifts = shifts.filter(s => s.department === dept && s.startTime === time)

                                    return (
                                        <Box
                                            key={`${time}-${dept}`}
                                            borderRight={i < departments.length - 1 ? "1px solid #F0F4F8" : "none"}
                                            position="relative"
                                            p="1"
                                            onClick={() => handleCellClick(time, dept)}
                                            cursor="pointer"
                                            _hover={{ bg: "gray.50" }}
                                        >
                                            {departmentShifts.map((shift, idx) => (
                                                <Box key={shift.id} ml={idx * 120} w="full" maxW="190px" position={idx > 0 ? "absolute" : "relative"} top={idx > 0 ? "1" : "0"} left={idx > 0 ? "1" : "0"} zIndex={idx}>
                                                    <ShiftCard
                                                        type={shift.type}
                                                        title={shift.title}
                                                        time={`${shift.startTime} - ${shift.endTime}`}
                                                        staff={shift.staffName || "Staff"}
                                                        initials={shift.initials || "ST"}
                                                        color={shift.color}
                                                        bgColor={shift.bgColor}
                                                        borderColor={shift.borderColor}
                                                        height={shift.height}
                                                    />
                                                </Box>
                                            ))}

                                            {time === '12:00' && dept === 'Management' && departmentShifts.length === 0 && (
                                                <VStack justify="center" h="full">
                                                    <Box bg="gray.50" p="3" borderRadius="lg">
                                                        <Text fontSize="xs" fontWeight="medium" color="gray.500">See all</Text>
                                                    </Box>
                                                </VStack>
                                            )}
                                        </Box>
                                    )
                                })}
                            </Grid>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Dialog open={isPopupOpen} onOpenChange={(details) => setIsPopupOpen(details.open)}>
                <DialogBackdrop />
                <Portal>
                    <DialogContent bg="white" borderRadius="20px" p="6" maxW="500px">
                        <DialogHeader p="0" mb="6">
                            <HStack justify="space-between">
                                <DialogTitle fontSize="24px" fontWeight="700" color="#1A1A1A">
                                    {formattedDate}
                                </DialogTitle>
                                <DialogCloseTrigger asChild>
                                    <IconButton variant="ghost" size="sm">
                                        <CloseCircle size={24} color="#64748B" />
                                    </IconButton>
                                </DialogCloseTrigger>
                            </HStack>
                        </DialogHeader>

                        <DialogBody p="0">
                            <VStack align="stretch" gap="8">
                                {selectedSlot && (
                                    <VStack align="stretch" gap="4">
                                        <Text fontWeight="bold" fontSize="18px" color="#1A1A1A">{selectedSlot.time}</Text>
                                        <VStack align="stretch" gap="3">
                                            {selectedSlot.shifts.map((s: any) => (
                                                <HStack
                                                    key={s.id}
                                                    p="4"
                                                    borderRadius="16px"
                                                    border="1px solid"
                                                    borderColor={s.borderColor || "#E9EDF5"}
                                                    bg={s.bgColor || "white"}
                                                    gap="4"
                                                >
                                                    <Box
                                                        w="48px"
                                                        h="48px"
                                                        borderRadius="full"
                                                        bg="white"
                                                        border="1px solid"
                                                        borderColor="#E9EDF5"
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        flexShrink={0}
                                                    >
                                                        <Text fontSize="14px" fontWeight="bold" color="#64748B">{s.initials}</Text>
                                                    </Box>
                                                    <VStack align="start" gap="1" flex="1">
                                                        <HStack gap="2">
                                                            <Text fontWeight="bold" fontSize="16px" color="#1A1A1A">{s.title}</Text>
                                                            <Text color="gray.500" fontSize="xs">{s.startTime} - {s.endTime}</Text>
                                                        </HStack>
                                                        <Text color={s.color} fontWeight="600" fontSize="14px">{s.staffName}</Text>
                                                    </VStack>
                                                </HStack>
                                            ))}
                                        </VStack>
                                    </VStack>
                                )}
                            </VStack>
                        </DialogBody>
                    </DialogContent>
                </Portal>
            </Dialog>
        </Box>
    )
}
