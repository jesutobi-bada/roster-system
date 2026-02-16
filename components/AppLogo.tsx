import app_logo from "@/public/logo.svg"
import Link from "next/link"
import Image from "next/image"
import { Box, Text } from "@chakra-ui/react"

const AppLogo = () => {
    return (
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
            <Image src={app_logo} alt="App Logo" />
            <Box display="flex" flexDirection="column" lineHeight="1.2">
                <Text fontSize="lg" fontWeight="bold" color="#5653FC">
                    excellent care
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="#5653FC">
                    clinics
                </Text>
            </Box>
        </Link>
    )
}

export default AppLogo