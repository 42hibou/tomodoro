import React, { useContext } from 'react';

import { useMediaQuery, Text, Link } from '@chakra-ui/react'
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
    {isLargerThan1280 ?
        <Link onClick={() => toggleStreamerMode(streamerContextObj)}>
          <Text as='u'>
            toggle streamer mode(beta)
          </Text>
        </Link>
    : <></> }
    </span>
  )
}

export default ToggleStreamerMode