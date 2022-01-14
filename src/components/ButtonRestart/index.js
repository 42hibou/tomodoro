import React, { useContext } from 'react';

import { Icon, Button } from '@chakra-ui/react'
import { IoMdRepeat } from 'react-icons/io'
import { PomoButtonsContext } from '../../App'


const ButtonRestart = () => {
  const PomoButtonsObj = useContext(PomoButtonsContext)

  return (
    <Button title="Restart Current Timer" onClick={() => PomoButtonsObj.setRestart(true)}>
      <Icon as={IoMdRepeat} />
    </Button>
  )
}

export default ButtonRestart