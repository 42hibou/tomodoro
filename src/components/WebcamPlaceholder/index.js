import React, { useContext } from 'react'

import ToggleStreamerMode from '../ToggleStreamerMode'
import Pomodoro from '../Pomodoro'
import DarkMode from '../DarkMode'

import { Center, VStack, Box, ButtonGroup, HStack, Text } from '@chakra-ui/react';
import { PomoButtonsContext } from '../../App';

import ButtonRestart from '../ButtonRestart'
import ButtonPlayPause from '../ButtonPlayPause'
import ButtonSwitchTimer from '../ButtonSwitchTimer'
import ButtonConfig from '../ButtonConfig'
import ToggleToDo from '../ToggleToDo';

const WebcamPlaceholder = () => {
  const PomoButtonsObj = useContext(PomoButtonsContext)

  return (
    <Center minH={'100vh'}>
      <VStack spacing={6} color="black" bg="gray.200" p={10} borderRadius={'xl'}> 
        <DarkMode />
        <VStack spacing={6}>
          <Text as='b' fontSize='xl'>
            Streamer Mode (BETA)
          </Text>
          <Box> 
            <ButtonGroup size='md' spacing={4} direction='row' align='center'>
              <ButtonSwitchTimer />
              <ButtonPlayPause />
              <ButtonRestart />
            </ButtonGroup>
          </Box>
          <Box>
            <ButtonConfig />
          </Box>
      </VStack>
      <Box>
        <HStack spacing={4}>
          <ToggleStreamerMode />
          <ToggleToDo />
        </HStack>
      </Box>
      </VStack>
    </Center>
  );
};

export default WebcamPlaceholder