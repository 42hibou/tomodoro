import React, { useEffect, useRef, useState, useContext } from 'react'

import { StreamerModeContext } from '../../App'

import {
  Text,
  VStack,
  Center,
  Heading,
  Input,
  Container,
  Checkbox
} from '@chakra-ui/react'

import { v4 as uuidv4 } from 'uuid'

const ToDo = () => {
  const [inputValue, setInputValue] = useState('')
  const [firstClick, setFirstClick] = useState(false)
  const timer = useRef()

  const streamerContextObj = useContext(StreamerModeContext)

  const [customHeight, setCustomHeight] = useState()

  useEffect(() => {
    streamerContextObj.streamerMode ? 
      setCustomHeight("60vh")
    : setCustomHeight(["45vh", "80vh"]) 
    console.log(customHeight)
  }, [streamerContextObj.streamerMode])

  useEffect(() => {
    if (firstClick) {
      timer.current = setTimeout(() => {
        setFirstClick(false)
      }, 300)
    }

    return () => {
      clearTimeout(timer.current)
    }
  }, [firstClick])

  const todoListPersisted = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [
        { id: uuidv4(), label: 'Click me', state: false },
        { id: uuidv4(), label: 'Double click me', state: false }
      ]
  const [todoList, setTodoList] = useState(todoListPersisted)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList))
  }, [todoList])

  const submit = e => {
    e.preventDefault()
    setTodoList([
      ...todoList,
      { id: uuidv4(), label: inputValue, state: false }
    ])
    setInputValue('')
  }

  const deleteToDo = id => {
    const newToDosArray = todoList.filter(todo => todo.id !== id)
    setTodoList(newToDosArray)
  }

  const doneToDo = todo => {
    const currentTask = todoList.findIndex(todoItem => todoItem.id === todo.id)

    const newArray = todoList
    newArray.splice(currentTask, 1, {
      ...todo,
      state: !todo.state
    })
    setTodoList([...newArray])
  }

  const handleClick = todo => {
    if (!firstClick) {
      setFirstClick(true)
      doneToDo(todo)
    } else {
      deleteToDo(todo.id)
    }
  }

  return (
    <Center minH={customHeight}>
      <VStack spacing={8}>
        <Heading>To-Do</Heading>
        <form onSubmit={submit}>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            name='todo'
            placeholder='Keep it simple.'
            size='md'
          />
        </form>
        <VStack align='left'>
          {todoList.map(todo => {
            return (
              <Checkbox
                key={todo.id}
                isChecked={todo.state}
                onChange={() => handleClick(todo)}
              >
                <Container maxW='sm'>
                { todo.state 
                  ? <Text as='s' color='gray.500'>{todo.label}</Text>
                  : <Text>{todo.label}</Text>
                } 
                </Container>
              </Checkbox>
            )
          })}{' '}
        </VStack>
      </VStack>
    </Center>
  )
}

export default ToDo
