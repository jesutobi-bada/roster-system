'use client'

import React, { useState } from 'react'
import { MainLayout } from '@/components/MainLayout'
import { PlannerBanner } from '@/components/planner/PlannerBanner'
import { PlannerToolbar } from '@/components/planner/PlannerToolbar'
import { StaffSidebar } from '@/components/planner/StaffSidebar'
import { ScheduleGrid } from '@/components/planner/ScheduleGrid'
import { Box, HStack } from '@chakra-ui/react'
import dummyData from '@/data/dummy.json'

const Planner = () => {
    const [view, setView] = useState(dummyData.appState.currentView) // 'live' or 'planner'
    const [currentDate, setCurrentDate] = useState(dummyData.appState.selectedDate)
    const [shifts, setShifts] = useState(dummyData.shifts)
    const [staff] = useState(dummyData.staff)
    const [departments] = useState(dummyData.departments)
    const [times] = useState(dummyData.times)

    const filteredShifts = shifts.filter(s => (s as any).date === currentDate)

    return (
        <MainLayout pageName="Planner">
            <Box w="full">
                <PlannerBanner view={view} setView={setView} />
                <PlannerToolbar currentDate={currentDate} setCurrentDate={setCurrentDate} />
                <HStack align="stretch" gap="6" h="calc(100vh - 250px)">
                    <StaffSidebar staff={staff} />
                    <ScheduleGrid
                        departments={departments}
                        times={times}
                        shifts={filteredShifts}
                        currentDate={currentDate}
                    />
                </HStack>
            </Box>
        </MainLayout>
    )
}

export default Planner