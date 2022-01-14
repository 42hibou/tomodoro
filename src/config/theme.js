import { extendTheme } from '@chakra-ui/react'
import { MdBluetooth } from 'react-icons/md'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config })

export default theme
