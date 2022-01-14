import React, { useContext, useEffect } from 'react';

import { 
  Icon, 
  Button, 
  Center, 
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter, 
  Flex,
  VStack,
  InputGroup,
  Input,
  InputRightAddon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'

import { IoMdSettings } from 'react-icons/io'

import { PomoButtonsContext, PomoLogicContext } from '../../App'

const ButtonConfig = () => {
  const PomoButtonsObj = useContext(PomoButtonsContext)
  const PomoLogicObj = useContext(PomoLogicContext)

  // the best const you've ever seen AGAIN
  const seconds_60 = 60

  useEffect(() => {
    PomoLogicObj.setCustomPomo(PomoLogicObj.inputValue)
  }, [PomoLogicObj.inputValue])

  const submit = e => {
    localStorage.setItem('pomos', JSON.stringify(PomoLogicObj.customPomo))
  }

  const formatTimeString = userInput => {
    // formats userInput 
    parseInt(userInput)
    let minutes = Math.floor(userInput * seconds_60)

    return minutes
  }

  return (
    <Center>
    <Popover isLazy>
      <PopoverTrigger>
        <Button title='Settings'>
          {' '}
          <Icon as={IoMdSettings} />
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
                      PomoLogicObj.setInputValue({
                        ...PomoLogicObj.customPomo,
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
                      PomoLogicObj.setInputValue({
                        ...PomoLogicObj.customPomo,
                        breakPomo: formatTimeString(e.target.value)
                      })
                    }
                    placeholder='Break timer'
                  />
                      <InputRightAddon children='Minutes' />

                </InputGroup>
              </Center>
            </VStack>
            </Center>
          </Flex>

        </PopoverBody>
        <PopoverFooter>
          <InputGroup>
            <Input as='button' onClick={() => submit()}>Update</Input>
          </InputGroup>
        </PopoverFooter>
        </form>

      </PopoverContent>
    </Popover>
  </Center>
  )
}

export default ButtonConfig