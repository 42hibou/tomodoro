import React, { useContext, useEffect, useState } from 'react'

import { Center, Icon, Text } from '@chakra-ui/react'
import DarkMode from '../DarkMode'
import { IoMdMenu } from 'react-icons/io'
import { StreamerModeContext } from '../../App'



const Header = (props) => {

  const streamerMode = useContext(StreamerModeContext)

  const [customHeight, setCustomHeight] = useState()

  useEffect(() => {
    streamerMode[0] ? 
      setCustomHeight("")
    : setCustomHeight("10vh") 
    console.log(customHeight)
  }, [streamerMode])

  return (
    <Center minH={customHeight} alignContent="right">
      <Text>
        {props.value}
      </Text>
      <DarkMode></DarkMode>
    </Center>
  )
}

export default Header
