import React, { useContext } from 'react';

import { useMediaQuery, Text, Link } from '@chakra-ui/react'
import { StreamerModeContext } from '../../App'


const ToggleStreamerMode = () => {

  const streamerMode = useContext(StreamerModeContext)

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  const toggleStreamerMode = (streamerMode, setStreamerMode) => {
    setStreamerMode(!streamerMode)
  }

  return (
      <span>
    {isLargerThan1280 ?
        <Link onClick={() => toggleStreamerMode(streamerMode[0], streamerMode[1])}>
          <Text as='u'>
            toggle streamer mode(beta)
          </Text>
        </Link>
    : <></> }
    </span>
  )
}

export default ToggleStreamerMode