'use client'
import React from 'react'
import {
    Box,
    VStack,
    HStack,
    Text,
    Icon,
    IconButton,
    Collapsible,
} from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Element3,
    CalendarTick,
    Calendar,
    Setting2,
    Briefcase,
    FolderOpen,
    Notification,
    Book,
    MessageText,
    HamburgerMenu,
    Grid2
} from 'iconsax-reactjs'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import AppLogo from './AppLogo'

interface SidebarProps {
    isCollapsed: boolean
    onToggle: () => void
}

interface NavItemProps {
    icon: React.ElementType
    label: string
    href?: string
    isActive?: boolean
    hasSubmenu?: boolean
    isOpen?: boolean
    isCollapsed?: boolean
    onClick?: () => void
}

const NavItem = ({ icon: IconComponent, label, href, isActive, hasSubmenu, isOpen, isCollapsed, onClick }: NavItemProps) => {
    const content = (
        <HStack
            w="full"
            p="3"
            borderRadius="lg"
            cursor="pointer"
            transition="all 0.2s"
            bg={isActive ? "#F0F0FF" : "transparent"}
            color={isActive ? "#5653FC" : "#4E5D69"}
            _hover={{ bg: "#5653FC", color: "white" }}
            onClick={onClick}
            justify={isCollapsed ? "center" : "flex-start"}
            title={isCollapsed ? label : ""}
        >
            <Icon fontSize="24px">
                <IconComponent variant={isActive ? 'Bold' : 'Outline'} />
            </Icon>
            {!isCollapsed && (
                <>
                    <Text flex="1" fontWeight={isActive ? 'semibold' : 'medium'} whiteSpace="nowrap">
                        {label}
                    </Text>
                    {hasSubmenu && (
                        <Icon as={isOpen ? HiChevronUp : HiChevronDown} />
                    )}
                </>
            )}
        </HStack>
    )

    if (href) {
        return <Link href={href} style={{ width: '100%' }}>{content}</Link>
    }

    return content
}

const SubNavItem = ({ icon: IconComponent, label, href, isActive }: NavItemProps) => {
    const content = (
        <HStack
            cursor="pointer"
            w="full"
            pl="3"
            py="1"
            color={isActive ? "#5653FC" : "#4E5D69"}
            fontWeight={isActive ? "semibold" : "normal"}
            _hover={{ color: "#5653FC" }}
        >
            {IconComponent && (
                <Icon fontSize="18px">
                    <IconComponent variant={isActive ? 'Bold' : 'Outline'} />
                </Icon>
            )}
            <Text fontSize="sm">
                {label}
            </Text>
        </HStack>
    )

    if (href) {
        return <Link href={href} style={{ width: '100%' }}>{content}</Link>
    }

    return content
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
    const [isRosterOpen, setIsRosterOpen] = React.useState(true)
    const pathname = usePathname()

    return (
        <Box
            w={isCollapsed ? "80px" : "280px"}
            h="100vh"
            borderRight="1px solid"
            borderColor="#D9E5F2"
            bg="white"
            p="4"
            pos="fixed"
            left="0"
            top="0"
            transition="width 0.2s"
            zIndex="1000"
        >
            <VStack align={isCollapsed ? "center" : "stretch"} gap="6">
                {/* Logo Section */}
                <HStack justify={isCollapsed ? "center" : "space-between"} mb="4" w="full">
                    {!isCollapsed && (
                        <HStack gap="3">
                            <AppLogo />
                        </HStack>
                    )}
                    <IconButton
                        aria-label="Toggle Menu"
                        variant="ghost"
                        color="gray.400"
                        onClick={onToggle}
                    >
                        <HamburgerMenu size={24} />
                    </IconButton>
                </HStack>

                <VStack align="stretch" gap="3" w="full">
                    <NavItem
                        icon={Element3}
                        label="Dashboard"
                        isActive={pathname === '/'}
                        isCollapsed={isCollapsed}
                    />

                    <Box>
                        <NavItem
                            icon={Grid2}
                            label="Roster"
                            hasSubmenu={!isCollapsed}
                            isOpen={isRosterOpen}
                            onClick={() => !isCollapsed && setIsRosterOpen(!isRosterOpen)}
                            isActive={pathname.startsWith('/planner')}
                            isCollapsed={isCollapsed}
                        />
                        {!isCollapsed && (
                            <Collapsible.Root open={isRosterOpen}>
                                <Collapsible.Content>
                                    <VStack align="stretch" gap="4" mt="2" pl="10">
                                        <SubNavItem
                                            icon={CalendarTick}
                                            label="My Roster"
                                            isActive={pathname === '/my-rooster'}
                                        />
                                        <SubNavItem
                                            icon={Calendar}
                                            label="Planner"
                                            href="/planner"
                                            isActive={pathname === '/planner'}
                                        />
                                        <SubNavItem
                                            icon={Setting2}
                                            label="Availability"
                                            isActive={pathname === '/availability'}
                                        />
                                    </VStack>
                                </Collapsible.Content>
                            </Collapsible.Root>
                        )}
                    </Box>

                    <NavItem icon={Briefcase} label="My to do Protocols" isActive={pathname === '/protocols'} isCollapsed={isCollapsed} />
                    <NavItem icon={FolderOpen} label="Document Management" isActive={pathname === '/documents'} isCollapsed={isCollapsed} />
                    <NavItem icon={Notification} label="Department News" isActive={pathname === '/dept-news'} isCollapsed={isCollapsed} />
                    <NavItem icon={Book} label="Knowledge Base" isActive={pathname === '/knowledge'} isCollapsed={isCollapsed} />
                    <NavItem icon={MessageText} label="General News" isActive={pathname === '/general-news'} isCollapsed={isCollapsed} />
                </VStack>
            </VStack>
        </Box>
    )
}
