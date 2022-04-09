import React from 'react';

import {
  ChakraProvider,
  Flex,
  Box,
  Spacer,
  Heading,
  Stack,
  Button,
  Text,
  Link } from '@chakra-ui/react'
import theme from '../config/theme';
import { SearchIcon } from '@chakra-ui/icons';


const Landing = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex height='100vh' direction='column' align='center' justify='center' flexGrow='4'>
          <Box minWidth='660px' minHeight='330px'>

          <Box height={'20vh'}>
          <Heading
            as='h1' 
            size='4xl'
            >
              tomodoro・ともドロ
            </Heading>
            <Text as='samp' fontSize='lg'>
              Your Productivity Companion
            </Text>
          </Box>
          <Box height={'10vh'}>
            {/* <Flex direction='row' justify='start'> */}
            <Stack direction='row' spacing={4} align='center'>
              <Button colorScheme='teal' size='lg'>
                Get started
              </Button>
              <Button colorScheme='teal' size='lg' variant='outline'>
                How it works?
              </Button>
            </Stack>

            {/* </Flex>/ */}
          </Box>
          <Box height={'5vh'}>
            <Text fontSize='sm' as='samp'>
              Tomodoro is free, open-source software that does not have access to any of your data.
            </Text>
          </Box>
          <Box  height={'5vh'}>
            <Text fontSize='sm' as='samp' as='u'>Support me</Text>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  )
}

export default Landing