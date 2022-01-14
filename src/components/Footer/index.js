import React, { createContext, useContext, useState, useEffect } from 'react'

import { Button, Center, Text, Link, VStack, Icon } from '@chakra-ui/react'
import { SiGithub, SiPatreon } from "react-icons/si";
import { MdCircle } from "react-icons/md";

import { useMediaQuery } from '@chakra-ui/react'

import { StreamerModeContext } from '../../App';
import ToggleStreamerMode from '../ToggleStreamerMode';

const toggleStreamerMode = (streamerMode, setStreamerMode) => {
  setStreamerMode(!streamerMode)
}

const Footer = () => {

  const streamerContextObj = useContext(StreamerModeContext)

  const [customHeight, setCustomHeight] = useState()

  useEffect(() => {
    streamerContextObj.streamerMode ? 
      setCustomHeight("")
    : setCustomHeight("10vh") 
    console.log(customHeight)
  }, [streamerContextObj])
  
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  return (
    <Center minH={customHeight}>
      <VStack spacing={3}>
        <Center>
        </Center>
        <Center>
          <Text as='samp'>
            <Link href='https://www.patreon.com/42hibou' isExternal>
              <Icon as={SiPatreon}/>
            </Link>
            <Link href='https://linktr.ee/42hibou/' isExternal>
              <Icon as={MdCircle} mr={3} ml={3} color="#ff5555"/>
            </Link>
            <Link href='https://github.com/42hibou/tomodoro' isExternal>
              <Icon as={SiGithub}/>
            </Link>
          </Text>
        </Center>
        <Center>
          <Text fontSize='xs' as='samp'>
            jingle courtesy of{' '}
            <Link color="gray.500" href='https://idryskai.carrd.co/' isExternal>
              IdrysKai
            </Link>
            {isLargerThan1280 ?
              <span>{' '} | {' '}</span> : <></> }
            <ToggleStreamerMode />
          </Text>
        </Center>
      </VStack>
    </Center>

  )
}

export default Footer
