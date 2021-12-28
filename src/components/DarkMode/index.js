import React from 'react'

import { useColorMode } from '@chakra-ui/react'
import { Center, Box } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const DarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Center>
      <button onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
    </Center>
  )
}

export default DarkMode
