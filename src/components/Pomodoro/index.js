import React, { useState, useEffect, useContext } from 'react'

import leftPad from 'just-left-pad'

import {
  Flex,
  Box,
  Button,
  ButtonGroup,
  VStack,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  VisuallyHiddenInput,
  SimpleGrid,
  Icon,
  InputRightAddon,
  Center,
  Heading,
  Text
} from '@chakra-ui/react'

import jingle from '../../audio/PomJingle.wav'

import { 
  PomoButtonsContext, 
  PomoLogicContext, 
  StreamerModeContext
} from '../../App'

import ButtonRestart from '../ButtonRestart'
import ButtonPlayPause from '../ButtonPlayPause'
import ButtonSwitchTimer from '../ButtonSwitchTimer'
import ButtonConfig from '../ButtonConfig'

const audioJingle = new Audio(jingle)

// the best const you've ever seen
const seconds_60 = 60

let timeLeftInSeconds
let isPaused = true
let isEditable = false
let interval
let pomoTotalTimeLeft

const Pomodoro = () => {

  const streamerContextObj = useContext(StreamerModeContext)
  const PomoButtonsObj = useContext(PomoButtonsContext)
  const PomoLogicObj = useContext(PomoLogicContext)

  const [customHeight, setCustomHeight] = useState()

  const defaultPomo = { workPomo: 1500, breakPomo: 300 }

  const [pomodoro, setPomodoro] = useState(PomoLogicObj.persistentPomo.workPomo)

  const [timerStarted, setTimerStarted] = useState(false)
  const [timer, setTimer] = useState(PomoLogicObj.persistentPomo.workPomo)

  useEffect(() => {
    if (PomoButtonsObj.restart) {
      setTimer(pomodoro)
      PomoButtonsObj.setPlayPause(false)
      setTimerStarted(false)
      PomoButtonsObj.setRestart(false)
      stopTimer()
    }
  }, [PomoButtonsObj.restart])

  useEffect(() => {
    // if the localStorage somehow got corrupted, this helps.
    if (JSON.parse(localStorage.getItem('pomos')).length === 0) {
      JSON.stringify(localStorage.setItem('pomos', JSON.stringify(defaultPomo)))
    }
    if (PomoButtonsObj.playPause) {
      pomoTotalTimeLeft = (Date.now() + 1000 * pomodoro)
      timeLeftInSeconds = (pomoTotalTimeLeft - Date.now()) / 1000
    
      if (timeLeftInSeconds <= 0) {
        console.log("timeLeftInSeconds <= 0")
        timeLeftInSeconds = pomodoro
        setTimer(timeLeftInSeconds)
      }

      startTimer()  
      PomoButtonsObj.setPlayPause(true), (interval = setInterval(updateTimer, 500))
    } else {
      PomoButtonsObj.setPlayPause(false), stopTimer()
    }
  }, [PomoButtonsObj.playPause])

  useEffect(() => {
    if (PomoButtonsObj.switchTimer) {
      switchTimer()
    }
  }, [PomoButtonsObj.switchTimer])

  useEffect(() => {
    streamerContextObj.streamerMode ? 
      setCustomHeight("40vh")
    : setCustomHeight(["45vh", "80vh"]) 
  }, [streamerContextObj.streamerMode])

  // sets the play/Pause button to Pause and TimerStarted to true
  const startTimer = () => {
    PomoButtonsObj.setPlayPause(true)
    setTimerStarted(true)
  }

  // stops the setInterval going in "interval" var
  const stopTimer = () => {
    clearInterval(interval)
    PomoButtonsObj.setPlayPause(false)
  }

  // update the timer displayed. 
  const updateTimer = () => {
    timeLeftInSeconds = (pomoTotalTimeLeft - Date.now()) / 1000
    if (timeLeftInSeconds < 0) {
      timeLeftInSeconds = 0
    }
    setTimer(timeLeftInSeconds)
    if (timeLeftInSeconds === 0) {
      stopTimer()
      PomoButtonsObj.setPlayPause(true)
      playJingle()
    }
  }

  // switch between work and break timer
  const switchTimer = () => {
    if(!PomoButtonsObj.playPause) {
      if (pomodoro === PomoLogicObj.persistentPomo.workPomo) {
        setPomodoro(PomoLogicObj.persistentPomo.breakPomo)
  
        timeLeftInSeconds = PomoLogicObj.persistentPomo.breakPomo
        setTimer(PomoLogicObj.persistentPomo.breakPomo)
      } else {
        setPomodoro(PomoLogicObj.persistentPomo.workPomo)
  
        timeLeftInSeconds = PomoLogicObj.persistentPomo.workPomo
        setTimer(PomoLogicObj.persistentPomo.workPomo)
      }
      PomoButtonsObj.setSwitchTimer(false)
    }
  }

  const playJingle = () => {
    audioJingle.volume = .25
    audioJingle.play()
  }

  const displayTimeString = timeRemainingInSeconds => {
    let minutes = Math.floor(timeRemainingInSeconds / seconds_60)
    let seconds = Math.floor(timeRemainingInSeconds) % seconds_60


    return `${leftPad(`${minutes}`, 2, '0')}:${leftPad(`${seconds}`, 2, '0')}`
  }

  return (

    <Center minH={customHeight}>
      <VStack spacing={6}>
        <Box>
          <Heading className='pomodoro' as='h2' size='3xl'>
              {displayTimeString(timer)}
          </Heading>
        </Box>
        { streamerContextObj.streamerMode ?
        ""
      :
      <span>
        <VStack spacing={6}>
          <Box> 
            <ButtonGroup size='md' spacing={4} direction='row' align='center'>
              <ButtonSwitchTimer />
              <ButtonPlayPause />
              <ButtonRestart />
            </ButtonGroup>
          </Box>
          <Box>
            <ButtonConfig />
          </Box>
      </VStack>
    </span> 
        }

      </VStack>
    </Center>
  )
}

export default Pomodoro
