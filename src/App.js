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
export const PomoButtonsContext = createContext()
export const PomoLogicContext = createContext()

const App = () => {
  
  const [streamerMode, setStreamerMode] = useState(false)

  const streamerContextObj = new Object()
  streamerContextObj.streamerMode = streamerMode
  streamerContextObj.setStreamerMode = setStreamerMode

  const [restart, setRestart] = useState(false)
  const [playPause, setPlayPause] = useState(false) // false: Pause, true: Play
  const [switchTimer, setSwitchTimer] = useState(false)

  const PomoButtonsObj = new Object()
  PomoButtonsObj.restart = restart
  PomoButtonsObj.setRestart = setRestart
  PomoButtonsObj.playPause = playPause
  PomoButtonsObj.setPlayPause = setPlayPause
  PomoButtonsObj.switchTimer = switchTimer
  PomoButtonsObj.setSwitchTimer = setSwitchTimer

  const persistentPomo = localStorage.getItem('pomos')
    ? JSON.parse(localStorage.getItem('pomos'))
    : defaultPomo
  const [inputValue, setInputValue] = useState('')
  const [customPomo, setCustomPomo] = useState(persistentPomo)

  const PomoLogicObj = new Object()
  PomoLogicObj.inputValue = inputValue
  PomoLogicObj.setInputValue = setInputValue
  PomoLogicObj.customPomo = customPomo
  PomoLogicObj.setCustomPomo = setCustomPomo
  PomoLogicObj.persistentPomo = persistentPomo


  return (
    <StreamerModeContext.Provider value={streamerContextObj}>
      <PomoButtonsContext.Provider value={PomoButtonsObj}>
        <PomoLogicContext.Provider value={PomoLogicObj}>
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
        </PomoLogicContext.Provider>
      </PomoButtonsContext.Provider>
    </StreamerModeContext.Provider>

  )
}

export default App