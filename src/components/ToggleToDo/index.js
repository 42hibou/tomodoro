import React, { useContext } from 'react';
import { Icon, Link, Button, Text } from '@chakra-ui/react'

import { IoMdListBox } from 'react-icons/io'
import { StreamerModeContext } from '../../App';


const ToggleToDo = () => {
  const streamerContextObj = useContext(StreamerModeContext)

  return (
    <span>
      <Button onClick={() => streamerContextObj.setToggleToDo(!streamerContextObj.toggleToDo)} >
        <Text>
          <Icon as={IoMdListBox} /> toggle To-Do list
        </Text>
      </Button>
    </span>
  );
};

export default ToggleToDo;