import React from 'react'

import { Box, Text } from '@chakra-ui/react'

const Test = () => {
  return (
    <div>
      <Text
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize='6xl'
        fontWeight='extrabold'
      >
        Welcome to Chakra UI
      </Text>

      <Box
        w='100%'
        h='200px'
        bgGradient={[
          'linear(to-tr, teal.300, yellow.400)',
          'linear(to-t, blue.200, teal.500)',
          'linear(to-b, orange.100, purple.300)'
        ]}
        e
      />
    </div>
  )
}

export default Test
