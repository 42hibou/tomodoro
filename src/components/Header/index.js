import React from 'react'

import { Center, Icon } from '@chakra-ui/react'
import DarkMode from '../DarkMode'
import { IoMdMenu } from 'react-icons/io'

const Header = () => {
  return (
    <Center minH='10vh' alignContent="right">
        <Center>
          <DarkMode></DarkMode>
        </Center>
    </Center>
  )
}

export default Header
