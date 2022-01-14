import React, { useContext } from 'react'

import ToggleStreamerMode from '../ToggleStreamerMode'
import Pomodoro from '../Pomodoro'
import DarkMode from '../DarkMode'

import { Center, VStack, Box, ButtonGroup } from '@chakra-ui/react';
import { PomoButtonsContext } from '../../App';

import ButtonRestart from '../ButtonRestart'
import ButtonPlayPause from '../ButtonPlayPause'
import ButtonSwitchTimer from '../ButtonSwitchTimer'
import ButtonConfig from '../ButtonConfig'

const WebcamPlaceholder = () => {
  const PomoButtonsObj = useContext(PomoButtonsContext)

  return (
    <Center minH={'100vh'}>
      <VStack>
        <DarkMode></DarkMode>
        <ToggleStreamerMode></ToggleStreamerMode>
        <VStack spacing={6}>
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
      </VStack>
    </Center>
  );
};

export default WebcamPlaceholder