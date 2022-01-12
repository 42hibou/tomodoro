import { createContext, useEffect, useState } from 'react'

import { ColorModeScript, 
  Heading, 
  ChakraProvider, 
  SimpleGrid, 
  Grid, 
  GridItem } from '@chakra-ui/react'

import Header from './components/Header'
import Pomodoro from './components/Pomodoro'
import ToDo from './components/ToDo'
import Footer from './components/Footer'
import WebcamPlaceholder from './components/WebcamPlaceholder'

import theme from './config/theme'

export const StreamerModeContext = createContext() 

const App = () => {
  const [streamerMode, setStreamerMode] = useState(false)
  const streamerContextObj = new Object()

  streamerContextObj.streamerMode = streamerMode
  streamerContextObj.setStreamerMode = setStreamerMode

  

  useEffect(() => {
      console.log(`streamerMode is set to ${streamerMode}`)
  }, [streamerMode])
  
  return (
    <StreamerModeContext.Provider value={streamerContextObj}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        { streamerMode ?
        <span>
          <Grid 
          templateColumns='repeat(6, 1fr)' >
            <GridItem colSpan={2}>
              <Pomodoro></Pomodoro>
              <ToDo></ToDo>
            </GridItem>
            <GridItem colSpan={4}>
              <WebcamPlaceholder></WebcamPlaceholder>
            </GridItem>
          </Grid> 
        </span> 
          : 
          <span>
            <Header />
            <SimpleGrid columns={[1, null, 2]}>
              <Pomodoro></Pomodoro>
              <ToDo></ToDo>
            </SimpleGrid>   
            <Footer />
          </span>
          }
      </ChakraProvider>
    </StreamerModeContext.Provider>

  )
}

export default App