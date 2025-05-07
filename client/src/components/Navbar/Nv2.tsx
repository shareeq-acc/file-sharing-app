
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Icon,
    useBreakpointValue,
    useDisclosure,
  } from '@chakra-ui/react'
  
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
  } from '@chakra-ui/popover'
  
  
  import { useColorModeValue } from '@chakra-ui/color-mode'
  import { Collapse } from '@chakra-ui/transition'
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons'
  
  const Navbar = () =>  {
      const { open, onToggle } = useDisclosure()
  
    return (
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minHeight={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottomWidth={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          alignItems={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
           <IconButton
              onClick={onToggle}
              _icon={open ? CloseIcon : HamburgerIcon}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
              />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              Logo
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
              bg={'pink.400'}
              >
              Sign Up
              </Button>
          </Stack>
        </Flex>
  
        <Collapse in={open} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    )
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')
  
    return (
      <Stack direction={'row'} gap={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Box
                  p={2}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Box>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  borderWidth={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minWidth={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    )
  }
  
  const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
      <Box
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
        <Stack direction={'row'} alignItems={'center'}>
          <Box>
            <Text
              transitionProperty={'all'}
              transitionDuration={'.3s'}
              transitionTimingFunction={'ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transitionProperty={'all'}
            transitionDuration={'.3s'}
            transitionTimingFunction={'ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justifyContent={'flex-end'}
            alignItems={'center'}
            flex={1}>
            <Icon color={'pink.400'} boxSize={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    )
  }
  
  const MobileNav = () => {
    return (
      <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    )
  }
  
  const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { open, onToggle } = useDisclosure()
  
    return (
      <Stack gap={4} onClick={children && onToggle}>
        <Flex
          py={2}
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            textDecoration: 'none',
          }}>
          <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transitionProperty={'all'}
              transitionDuration={'.25s'}
              transitionTimingFunction={'ease-in-out'}
              transform={open ? 'rotate(180deg)' : ''}
              boxSize={6}
            />
          )}
        </Flex>
  
        <Collapse in={open} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeftWidth={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            alignItems={'start'}>
            {children &&
              children.map((child) => (
                <Box as="a" key={child.label} py={2}>
                  {child.label}
                </Box>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    )
  }
  
  interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
  }
  
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Inspiration',
      children: [
        {
          label: 'Explore Design Work',
          subLabel: 'Trending Design to inspire you',
          href: '#',
        },
        {
          label: 'New & Noteworthy',
          subLabel: 'Up-and-coming Designers',
          href: '#',
        },
      ],
    },
    {
      label: 'Find Work',
      children: [
        {
          label: 'Job Board',
          subLabel: 'Find your dream design job',
          href: '#',
        },
        {
          label: 'Freelance Projects',
          subLabel: 'An exclusive list for contract work',
          href: '#',
        },
      ],
    },
    {
      label: 'Learn Design',
      href: '#',
    },
    {
      label: 'Hire Designers',
      href: '#',
    },
  ]
  
  export default Navbar;