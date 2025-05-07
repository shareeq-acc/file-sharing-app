import { useColorModeValue } from "@chakra-ui/color-mode"
import { Box, Flex, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { NAV_ITEMS, NavItem } from "./navData"
import { Collapse } from "@chakra-ui/transition"

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
                {/* {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transitionProperty={'all'}
                        transitionDuration={'.25s'}
                        transitionTimingFunction={'ease-in-out'}
                        transform={open ? 'rotate(180deg)' : ''}
                        boxSize={6}
                    />
                )} */}
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


export default MobileNav;