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

  useEffect(() => {
      console.log(`streamerMode is set to ${streamerMode}`)
  }, [streamerMode])
  
  return (
    <StreamerModeContext.Provider value={[streamerMode, setStreamerMode]}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        { streamerMode ?
        <span>
          <Grid 
          templateColumns='repeat(6, 1fr)' >
            <GridItem bg="#F2E8DD" colSpan={2}>
              <Pomodoro></Pomodoro>
              <ToDo></ToDo>
            </GridItem>
            <GridItem bg="#F2E8DD" colSpan={4}>
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