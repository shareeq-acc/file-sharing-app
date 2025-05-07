import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'


import { useColorModeValue } from '@chakra-ui/color-mode'
import { Collapse } from '@chakra-ui/transition'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const Navbar = () =>  {
    const { open, onToggle } = useDisclosure()

  return (
    <Box>
      <Flex
        color={useColorModeValue('gray.600', 'white')}
        minHeight={'60px'}
        py={{ base: 3.5 }}
        px={{base:14 }}
        borderBottomWidth={1}
        borderStyle={'solid'}
        alignItems={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
         <IconButton
            onClick={onToggle}
            // _icon={open ? CloseIcon : HamburgerIcon}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={"cursive"}
            color={useColorModeValue('#5D3FD3', 'white')}
            fontSize={'3xl'}
            fontWeight={600}
            >
            capShare
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          gap={6}>
          <Button fontSize={'sm'} fontWeight={400} >
            Sign In
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'#5D3FD3'}
            >
            Sign Up
            </Button>
        </Stack>
      </Flex>

      <Collapse in={open} animateOpacity> */
        <MobileNav />
      </Collapse>
    </Box>
  )
}




export default Navbar;