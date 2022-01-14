import React, { useContext } from 'react';

import { useMediaQuery, Text, Link, Button, Icon } from '@chakra-ui/react'

import { IoMdCamera } from 'react-icons/io'
import { StreamerModeContext } from '../../App'

const ToggleStreamerMode = () => {

  const streamerContextObj = useContext(StreamerModeContext)

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  const toggleStreamerMode = (streamerContextObj) => {
    streamerContextObj.setStreamerMode(!streamerContextObj.streamerMode)
    localStorage.setItem('streamerMode', !streamerContextObj.streamerMode)
  }

  return (
      <span>
    { streamerContextObj.streamerMode ? 
        <Button onClick={() => toggleStreamerMode(streamerContextObj)}>
          <Text>
            <Icon as={IoMdCamera} /> toggle streamer mode(beta)
          </Text>
        </Button>
      : ( isLargerThan1280 ?
        <Link onClick={() => toggleStreamerMode(streamerContextObj)}>
          <Text as='u'>
            toggle streamer mode(beta)
          </Text>
        </Link>
    : <></> ) }

    </span>
  )
}

export default ToggleStreamerMode