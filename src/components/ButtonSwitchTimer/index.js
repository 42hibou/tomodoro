import React from 'react';

import { Icon, Button } from '@chakra-ui/react'
import { IoMdHourglass } from 'react-icons/io'


const ButtonSwitchTimer = (potato) => {
  return (
    <Button title="Switch timers" onClick={() => potato}>
      <Icon as={IoMdHourglass} />
    </Button>
  )
}

export default ButtonSwitchTimer