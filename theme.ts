import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react"

const config = defineConfig({
  globalCss: {
    '::selection': {
      bg: "#5653FC",
      color: "white",
    },
    body: {
      color: "#242424",
      bg: "#F9FAFB",
    },
  },
})

export const system = createSystem(defaultConfig, config)
