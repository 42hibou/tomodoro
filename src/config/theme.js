import { extendTheme } from '@chakra-ui/react'
import { MdBluetooth } from 'react-icons/md'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({
  fonts: {
    heading: 'Zen Antique Soft, serif',
    body: 'Open Sans, sans-serif',
  },
  config,
})

export default theme
