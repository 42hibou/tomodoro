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
let interval
let endPomo

const Pomodoro = () => {
  const defaultPomo = { workPomo: 5, breakPomo: 3 }

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
  const [autoPlay, setAutoPlay] = useState(false)

  useEffect(() => {
    if (restart) {
      setTimer(pomodoro)
      setRestart(false)
      isPaused = true
      setTimerStarted(false)
      setPlayPause(isPaused)
    }
  }, [restart])

  useEffect(() => {  
    if (autoPlay) {
      updateDuration()
      playPauseTimer()
      console.log('in true')
      // updateTimer()
    }
    console.log('out of true')
  }, [autoPlay])

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
    console.log(`playPauseTimer pomodoro === ${pomodoro}`)
    // endPomo is equal to the current time in miliseconds plus the time of the
    // current pomodoro timer in milliseconds.  
    // The total that is endPomo is an exact time in the future for when the 
    // timer ends, relying on Date.now() gives us accuracy that we don't have
    // otherwise.
    endPomo = (Date.now() + 1000 * pomodoro)
    // timeLeftInSeconds is the current time left in seconds until endPomo. DUH
    // timeLeftInSeconds = (endPomo - Date.now()) / 1000

    // the timer isn't paused anymore. at this point i'll document anything to 
    // find my bug.

    // if the timer isn't Started start the timer.
    if (!timerStarted) {
      startTimer()
    } else {
      console.log("timer is started")
    }

    // if the timer isPausedd stops the timer, otherwise updates the timer
    // every X milliseconds
    console.log(isPaused)
    isPaused
      ? (setPlayPause(isPaused), stopTimer())
      : (setPlayPause(isPaused), (interval = setInterval(updateTimer, 500)))
  }


  // update the timer displayed. 
  const updateTimer = () => {

    timeLeftInSeconds = (endPomo - Date.now()) / 1000
    // console.log(timeLeftInSeconds)

    timeLeftInSeconds < 0 
      ? timeLeftInSeconds = 0 
      : setTimer(timeLeftInSeconds)

    // console.log(timeLeftInSeconds)
    // console.log(`${pomodoro} : ${JSON.parse(localStorage.getItem('pomos')).workPomo}`)
    // console.log(`${pomodoro} : ${JSON.parse(localStorage.getItem('pomos')).breakPomo}`)

    if (timeLeftInSeconds === 0) {
      // console.log("current timeLeftInSeconds === 0")
      // console.log("JSON.work " + JSON.parse(localStorage.getItem('pomos')).workPomo)
      // console.log("JSON.break " + JSON.parse(localStorage.getItem('pomos')).breakPomo)
      if (pomodoro === JSON.parse(localStorage.getItem('pomos')).workPomo) {
          
          setPomodoro(JSON.parse(localStorage.getItem('pomos')).breakPomo)  
          endPomo = (Date.now() + 1000 * pomodoro)

          setAutoPlay(true)
        } else {
          setPomodoro(JSON.parse(localStorage.getItem('pomos')).workPomo)
          
          stopTimer()
          setPlayPause(true)
          setAutoPlay(false)
        }
      // if(pomodoro === JSON.parse(localStorage.getItem('pomos')).workPomo) {
        // console.log("00000000000000000000000000000000000000000000")
      // console.log("pomodoro in updateTIMER"  + pomodoro)
      // console.log(`${pomodoro} : ${JSON.parse(localStorage.getItem('pomos')).workPomo}`)
      // console.log(`${pomodoro} : ${JSON.parse(localStorage.getItem('pomos')).breakPomo}`)

      // } else {
      // }
      playJingle()
    }

  }



  const updateDuration = () => {
    if(isPaused) {
      // console.log("pomodoro in updateduration"  + pomodoro)
      console.log("updateDuration called")
      console.log(`${pomodoro} === ${JSON.parse(localStorage.getItem('pomos')).workPomo}`)
      if (pomodoro === JSON.parse(localStorage.getItem('pomos')).workPomo) {
      // if current pomodoro timer equals workTimer set it to breakTimer
        // console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")

        
        setPomodoro(JSON.parse(localStorage.getItem('pomos')).breakPomo)
        setAutoPlay(true)
        timeLeftInSeconds = pomodoro

        // timeLeftInSeconds = JSON.parse(localStorage.getItem('pomos')).breakPomo
        setTimer(pomodoro)
      } else {
      // if current pomodoro timer equals breakTimer set it to workTimer
        // console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
        setPomodoro(JSON.parse(localStorage.getItem('pomos')).workPomo)
  
        // timeLeftInSeconds = JSON.parse(localStorage.getItem('pomos')).workPomo
        setTimer(pomodoro)
      }
      setTimerStarted(false)
    }

  }

  const restartCountdown = () => {
    timeLeftInSeconds = pomodoro
    setTimer(timeLeftInSeconds)

    setRestart(true)

    stopTimer()
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
    // formats userInput 
    parseInt(userInput)
    let minutes = Math.floor(userInput * seconds_60)

    return minutes
  }

  const submit = e => {
    e.preventDefault()
    localStorage.setItem('pomos', JSON.stringify(customPomo))
  }

  return (
    <Center minH={["45vh","80vh"]}>
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
