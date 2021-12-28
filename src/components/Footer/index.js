import React from 'react'

import { Center, Text, Link, VStack } from '@chakra-ui/react'
import DarkMode from '../DarkMode'

const Footer = () => {
  return (
    <Center minH='10vh'>
      <VStack h="120" spacing={3}>
        <Center>
          <DarkMode></DarkMode>
        </Center>
        <Center>
          <Text as='samp'>
            <Link href='https://linktr.ee/42hibou/' isExternal>
              42hibou
            </Link>{' '}
            . <b>tomodoro</b> .{' '}
            <Link href='https://www.patreon.com/42hibou' isExternal>
              support
            </Link>
          </Text>
        </Center>
        <Center>
          <Text fontSize='xs' as='samp'>
            jingle courtesy of{' '}
            <Link href='https://idryskai.carrd.co/' isExternal>
              IdrysKai
            </Link>
          </Text>
        </Center>
      </VStack>
    </Center>
  )
}

export default Footer
