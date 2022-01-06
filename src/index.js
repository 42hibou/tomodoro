import React, { useEffect }  from 'react'

import { ColorModeScript, Heading } from '@chakra-ui/react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { ChakraProvider, SimpleGrid } from '@chakra-ui/react'

import Header from './components/Header'
import Pomodoro from './components/Pomodoro'
import ToDo from './components/ToDo'
import Footer from './components/Footer'

import theme from './config/theme'

ReactDOM.render(

  <React.StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Header></Header>
        <SimpleGrid columns={[1, null, 2]}>
          <Pomodoro></Pomodoro>
          <ToDo></ToDo>
        </SimpleGrid>
          <Footer></Footer>
      </ChakraProvider>

  </React.StrictMode>,
  document.getElementById('root')
)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
