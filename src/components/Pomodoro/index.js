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
  InputRightAddon
} from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Heading, Text } from '@chakra-ui/react'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter
} from '@chakra-ui/react'

import {
  IoMdPlay,
  IoMdPause,
  IoMdRepeat,
  IoMdHourglass,
  IoMdSettings,
  IoMdOptions,
  IoMdNotificationsOutline
} from 'react-icons/io'

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'


import jingle from '../../audio/PomJingle.wav'
import { StreamerModeContext } from '../../App'
import ButtonSwitchTimer from '../ButtonSwitchTimer'

const audioJingle = new Audio(jingle)

const seconds_60 = 60

let timeLeftInSeconds
let isPaused = true
let isEditable = false
let interval
let endPomo

let potato

const Pomodoro = () => {

  const streamerContextObj = useContext(StreamerModeContext)
  const [customHeight, setCustomHeight] = useState()

  const defaultPomo = { workPomo: 1500, breakPomo: 300 }

  const persistentPomo = localStorage.getItem('pomos')
    ? JSON.parse(localStorage.getItem('pomos'))
    : defaultPomo

  const [pomodoro, setPomodoro] = useState(persistentPomo.workPomo)

  const [timerStarted, setTimerStarted] = useState(false)
  const [playPause, setPlayPause] = useState(isPaused)
  const [timer, setTimer] = useState(persistentPomo.workPomo)

  const [customPomo, setCustomPomo] = useState(persistentPomo)
  const [inputValue, setInputValue] = useState('')

  const [restart, setRestart] = useState(false)



  useEffect(() => {
    console.log(restart)
    if (restart) {
      setTimer(pomodoro)
      setPlayPause(true)
      setTimerStarted(false)
      setRestart(false)
      stopTimer()
    }
  }, [restart])

  useEffect(() => {
    // if the localStorage somehow got corrupted, this helps.
    if (JSON.parse(localStorage.getItem('pomos')).length === 0) {
      JSON.stringify(localStorage.setItem('pomos', JSON.stringify(defaultPomo)))
    }
  }, [playPause])

  useEffect(() => {
    setCustomPomo(inputValue)
    localStorage.setItem('pomos', JSON.stringify(customPomo))
  }, [inputValue])

  useEffect(() => {
    streamerContextObj.streamerMode ? 
      setCustomHeight("40vh")
    : setCustomHeight(["45vh", "80vh"]) 
    console.log(customHeight)
  }, [streamerContextObj.streamerMode])

  // sets the play/Pause button to Pause and TimerStarted to true
  const startTimer = () => {
    isPaused = false
    setPlayPause(false)
    setTimerStarted(true)
  }

  // stops the setInterval going in "interval" var
  const stopTimer = () => {
    clearInterval(interval)
    isPaused = true
  }

  // when the play/pause button is pressed
  const playPauseTimer = () => {
    endPomo = (Date.now() + 1000 * pomodoro)
    timeLeftInSeconds = (endPomo - Date.now()) / 1000
    if (timeLeftInSeconds <= 0) {
      timeLeftInSeconds = pomodoro
      setTimer(timeLeftInSeconds)
    }
    isPaused = !isPaused

    if (!timerStarted) {
      startTimer()
    }

    setTimerStarted(true)

    isPaused
      ? (setPlayPause(isPaused), stopTimer())
      : (setPlayPause(isPaused), (interval = setInterval(updateTimer, 500)))
  }


  // update the timer displayed. 
  const updateTimer = () => {
    timeLeftInSeconds = (endPomo - Date.now()) / 1000
    if (timeLeftInSeconds < 0) {
      timeLeftInSeconds = 0
    }
    setTimer(timeLeftInSeconds)
    if (timeLeftInSeconds === 0) {
      stopTimer()
      isPaused = true
      setPlayPause(isPaused)
      playJingle()
    }
  }

  const updateDuration = () => {
    if(isPaused) {
      if (pomodoro === persistentPomo.workPomo) {
        setPomodoro(persistentPomo.breakPomo)
  
        timeLeftInSeconds = persistentPomo.breakPomo
        setTimer(persistentPomo.breakPomo)
      } else {
        setPomodoro(persistentPomo.workPomo)
  
        timeLeftInSeconds = persistentPomo.workPomo
        setTimer(persistentPomo.workPomo)
      }
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

  const formatTimeString = userInput => {
    // formats userInput 
    parseInt(userInput)
    let minutes = Math.floor(userInput * seconds_60)

    return minutes
  }

  const submit = e => {
    localStorage.setItem('pomos', JSON.stringify(customPomo))
  }


  return (

<Center minH={customHeight}>
      <VStack spacing={6}>
        <Box>
          <Heading className='pomodoro' as='h2' size='3xl'>
              {displayTimeString(timer)}
          </Heading>
        </Box>
        <Box>
          <ButtonGroup size='md' spacing={4} direction='row' align='center'>
            <Button title="Switch timers" onClick={updateDuration}>
              <Icon as={IoMdHourglass} />
            </Button>
            <Button title="Play/Pause Current Timer" onClick={playPauseTimer}>
              {playPause ? <Icon as={IoMdPlay} /> : <Icon as={IoMdPause} />}
            </Button>
            <Button title="Restart Current Timer" onClick={() => setRestart(!restart)}>
              <Icon as={IoMdRepeat} />
            </Button>
          </ButtonGroup>
        </Box>
        <Box>
          <Center>
            <Popover isLazy>
              <PopoverTrigger>
                <Button title='Settings'>
                  {' '}
                  <Icon as={IoMdSettings} />
                  {/* <IoMdOptions></IoMdOptions> */}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight='semibold'>
                  <Center>Settings</Center>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <form onSubmit={submit}>

                <PopoverBody>

                  <Flex>
                    <Center flex={5}>
                      <VStack spacing={8}>
                      <Center>
                        <InputGroup size='md'>

                          <Input
                            isRequired
                            type='text'
                            maxLength='3'
                            onChange={e =>
                              setInputValue({
                                ...customPomo,
                                workPomo: formatTimeString(e.target.value)
                              })
                            }
                            placeholder='Work timer'
                          />
                              <InputRightAddon children='Minutes' />

                        </InputGroup>
                      </Center>
                      <Center>
                        <InputGroup size='md'>

                          <Input
                            isRequired
                            type='text'
                            maxLength='3'
                            onChange={e =>
                              setInputValue({
                                ...customPomo,
                                breakPomo: formatTimeString(e.target.value)
                              })
                            }
                            placeholder='Break timer'
                          />
                              <InputRightAddon children='Minutes' />

                        </InputGroup>
                      </Center>
                    </VStack>
                      {/* Content of the actual Popover */}
                    </Center>
                  </Flex>

                </PopoverBody>
                <PopoverFooter>
                  <InputGroup>
                    <Input as='button' onClick={submit}>Update</Input>
                  </InputGroup>
                </PopoverFooter>
                </form>

              </PopoverContent>
            </Popover>
          </Center>
        </Box>
      </VStack>
    </Center>
  )
}

export default Pomodoro
