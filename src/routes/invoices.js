import React from 'react';

import {
  ChakraProvider,
  Flex,
  Spacer,
  Heading,
  IconButton,
  Text } from '@chakra-ui/react'
import theme from '../config/theme';
import { SearchIcon } from '@chakra-ui/icons';


const Invoices = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex height='100vh' direction='column' align='center' justify='center' flexGrow='4'>
        <div>
        <Heading
          as='h1' 
          size='4xl'
          // bgGradient='linear(to-r, teal.500, green.500)'
          // bgClip='text'
          // fontWeight='extrabold'
          >tomodoro・ともドロ
          </Heading>
          <Text as='samp' fontSize='lg'>
            Your Productivity Companion
          </Text>
          <Flex direction='row'>
            <IconButton
              colorScheme='blue'
              aria-label='Search database'
              icon={<SearchIcon />}
            />
            <Text>I know the way</Text> 
            <IconButton
              colorScheme='teal'
              aria-label='Search database'
              icon={<SearchIcon />}
            />
            <Text>How it works</Text>
          </Flex>
          <Text>
            Tomodoro is free, open-source software that <Text as='u'>does not</Text> have access to any of your data.
          </Text>
          <Text as='u'>Support us.</Text>
        </div>
      </Flex>
    </ChakraProvider>
  )
}

export default Invoices