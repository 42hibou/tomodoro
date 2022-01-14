import React, { useContext } from 'react';

import { Icon, Button } from '@chakra-ui/react'
import { IoMdHourglass } from 'react-icons/io'
import { PomoButtonsContext } from '../../App'

const ButtonSwitchTimer = () => {
  const PomoButtonsObj = useContext(PomoButtonsContext)

  return (
    <Button title="Switch between Work and Break Timer" onClick={() => PomoButtonsObj.setSwitchTimer(true)}>
      <Icon as={IoMdHourglass} />
    </Button>
  );
};

export default ButtonSwitchTimer;