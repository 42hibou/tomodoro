import React, { useState, useEffect } from 'react'
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

const audioJingle = new Audio(jingle)

const seconds_60 = 60

let timeLeftInSeconds
let isPaused = true
let isEditable = false
let timerStarted = false
let interval
let endPomo

const Pomodoro = () => {
  const defaultPomo = { workPomo: 10, breakPomo: 5 }

  const persistentPomo = localStorage.getItem('pomos')
    ? JSON.parse(localStorage.getItem('pomos'))
    : defaultPomo


  const [pomodoro, setPomodoro] = useState(persistentPomo.workPomo)

  const [playPause, setPlayPause] = useState(isPaused)
  const [timer, setTimer] = useState(persistentPomo.workPomo)

  const [customPomo, setCustomPomo] = useState(persistentPomo)
  const [inputValue, setInputValue] = useState('')

  const [restart, setRestart] = useState(false)
  // const [switchTimer, setSwitchTimer] = useState(true)

  useEffect(() => {
    if (restart) {
      setTimer(pomodoro)
      setRestart(false)
      isPaused = true
      setPlayPause(isPaused)
    }
  }, [restart])

  useEffect(() => {
    console.log("useEffect: play/pause button pressed")
    if (JSON.parse(localStorage.getItem('pomos')).length === 0) {
      JSON.stringify(localStorage.setItem('pomos', JSON.stringify(defaultPomo)))
      // setPomodoro(defaultPomo)
      // setTimer(pomodoro)
      console.log("I AM HERE AND THE LOCAL STORAGE IS EMPTY")
    }
  }, [playPause])

  useEffect(() => {
    setCustomPomo(inputValue)
    localStorage.setItem('pomos', JSON.stringify(customPomo))
  }, [inputValue])

  const startTimer = () => {
    setPlayPause(false)
    timerStarted = true
    endPomo = (Date.now() + 1000 * pomodoro)
    timeLeftInSeconds = (endPomo - Date.now()) / 1000
    // endPomo = (Date.now() + pomodoro * 1000)
    // updateTimer()
    // timeLeftInSeconds = pomodoro 
  }

  const stopTimer = () => {
    clearInterval(interval)
  }

  const playPauseTimer = () => {
    console.log(`PlayPauseTimer: endPomo: ${endPomo}`)
 
    // every time this function is called (when the play/pause button is pressed)
    // it sets the current timer to endPomo. 
    // endPomo being the time left until the end of the timer that was ORIGINALY SET
    // it then creates an issue in the expected behavior of the timer for 
    // every time the timer goes from pause back to play it starts from its 
    // very beginning. 


    console.log(`timerStared: ${timerStarted}`)


    // }
    
    // endPomo = (Date.now() + 1000 * pomodoro)
    // timeLeftInSeconds = (endPomo - Date.now()) / 1000
 
    if (timeLeftInSeconds <= 0) {
      timerStarted = false
      startTimer()

      // timeLeftInSeconds = pomodoro
      setTimer(pomodoro)
    }
    isPaused = !isPaused

    if (!timerStarted) {
      startTimer()
    }

    timerStarted = true

    isPaused
      ? (setPlayPause(isPaused), stopTimer())
      : (setPlayPause(isPaused), (interval = setInterval(updateTimer, 500)))
  }

  const updateTimer = () => {
    console.log(timeLeftInSeconds)

    // timeLeftInSeconds = Math.floor((pomodoro - Date.now()))
    // timeLeftInSeconds--
    // setTimer(timeLeftInSeconds)
    // endPomo = ()
    timeLeftInSeconds = (endPomo - Date.now()) / 1000
    if (timeLeftInSeconds < 0) {
      timeLeftInSeconds = 0
    }
    setTimer(timeLeftInSeconds)
    if (timeLeftInSeconds === 0) {
      stopTimer()
      setPlayPause(true)

      playJingle()
    }
  }

  const playJingle = () => {
    audioJingle.play()
  }

  const displayTimeString = timeRemainingInSeconds => {


    let minutes = Math.floor(timeRemainingInSeconds / seconds_60)
    let seconds = Math.floor(timeRemainingInSeconds) % seconds_60


    return `${leftPad(`${minutes}`, 2, '0')}:${leftPad(`${seconds}`, 2, '0')}`
  }

  const formatTimeString = userInput => {
    parseInt(userInput)
    let minutes = Math.floor(userInput * seconds_60)

    return minutes
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

  const restartCountdown = () => {
    timeLeftInSeconds = pomodoro
    setTimer(timeLeftInSeconds)

    setRestart(true)

    stopTimer()
  }

  const submit = e => {
    // e.preventDefault()
    localStorage.setItem('pomos', JSON.stringify(customPomo))
  }

  return (
    <Center minH={["45vh","80vh"]}>
      <VStack spacing={6}>
        <Box>
          <Heading className='pomodoro' as='h2' size='3xl'>
            {isEditable ? (
              <Editable
                textAlign='center'
                defaultValue={displayTimeString(timer)}
              >
                <Container maxW='sm' centerContent>
                  <EditablePreview />
                  <EditableInput />
                </Container>
              </Editable>
            ) : (
              displayTimeString(timer)
            )}
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
            <Button title="Restart Current Timer" onClick={restartCountdown}>
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
                            maxLength='2'
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
                            maxLength='2'
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
                    <Box align='right' flex={2}>
                      <VStack>
                      {/* <IoMdNotificationsOutline></IoMdNotificationsOutline> */}
                      <Icon as={IoMdNotificationsOutline}/>
                    
                        <Slider
                          aria-label='slider-ex-3'
                          defaultValue={30}
                          orientation='vertical'
                          minH='32'
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                        {/* Content of the sound slider */}
                      </VStack>
                      </Box>
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
