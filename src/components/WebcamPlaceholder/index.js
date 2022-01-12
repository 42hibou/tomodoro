import DarkMode from '../DarkMode'
import React from 'react'
import ToggleStreamerMode from '../ToggleStreamerMode'
import Pomodoro from '../Pomodoro'
import { Center, VStack } from '@chakra-ui/react';

const WebcamPlaceholder = () => {
  return (
    <Center minH={'100vh'}>
      <VStack>
        <DarkMode></DarkMode>
        <ToggleStreamerMode></ToggleStreamerMode>
      </VStack>
    </Center>
  );
};

export default WebcamPlaceholder