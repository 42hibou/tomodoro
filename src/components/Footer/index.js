import React, { createContext, useContext, useState } from 'react'

import { Button, Center, Text, Link, VStack, Icon } from '@chakra-ui/react'
import { SiGithub, SiPatreon } from "react-icons/si";
import { MdCircle } from "react-icons/md";

const Footer = (props) => {

  return (
    <Center minH={["35vh", "10vh"]}>
      <VStack spacing={3}>
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
          </Text>
        </Center>
      </VStack>
    </Center>
  )
}

export default Footer
