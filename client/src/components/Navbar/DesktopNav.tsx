import { useColorModeValue } from "@chakra-ui/color-mode"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/popover"
import { Box, Flex, Icon, IconButton, Stack, Text } from "@chakra-ui/react"
import { Collapse } from '@chakra-ui/transition'
import { NAV_ITEMS, NavItem } from "./navData"

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
                    {/* <Icon color={'pink.400'} boxSize={5} as={ChevronRightIcon} /> */}
                </Flex>
            </Stack>
        </Box>
    )
}

export default DesktopNav;