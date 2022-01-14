import React, { useContext } from 'react';

import { Icon, Button } from '@chakra-ui/react'
import { IoMdPlay, IoMdPause } from 'react-icons/io'
import { PomoButtonsContext } from '../../App'

const ButtonPlayPause = () => {
  const PomoButtonsObj = useContext(PomoButtonsContext)

  return (
    <Button title="Play/Pause Current Timer" onClick={() => PomoButtonsObj.setPlayPause(!PomoButtonsObj.playPause)}>
      { PomoButtonsObj.playPause ? <Icon as={IoMdPause}/> : <Icon as={IoMdPlay} /> }
    </Button>
  )
}

export default ButtonPlayPause