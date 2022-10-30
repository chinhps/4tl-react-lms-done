import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { OAuthButtonGroup } from './OAuthButtonGroup';
import { PasswordField } from './PasswordField';

export const Login = () => (
    <Container
        w="100%"
        py={{
            base: '12',
            md: '24',
        }}
        px={{
            base: '0',
            sm: '8',
        }}
        className="login_container"
    >
        <Stack spacing="8">
            <Stack spacing="6">
                <Stack
                    spacing={{
                        base: '2',
                        md: '3',
                    }}
                    textAlign="center"
                >
                    <Heading
                        className="login_heading"
                        size={useBreakpointValue({
                            base: 'md',
                            md: '20px',
                        })}
                        fontSize="50px"
                    >
                        Log in to your account
                    </Heading>
                </Stack>
            </Stack>
            <Box
                py={{
                    base: '0',
                    sm: '8',
                }}
                px={{
                    base: '4',
                    sm: '10',
                }}
                bg={useBreakpointValue({
                    base: 'transparent',
                    sm: 'bg-surface',
                })}
                boxShadow={{
                    base: 'none',
                    sm: useColorModeValue('md', 'md-dark'),
                }}
                borderRadius={{
                    base: 'none',
                    sm: 'xl',
                }}
            >
                <Stack spacing="6">
                    <Stack spacing="5">
                        <FormControl>
                            <FormLabel fontSize="3xl" htmlFor="email">
                                Email
                            </FormLabel>
                            <Input id="email" type="email" height="40px" fontSize="20px" />
                        </FormControl>
                        <PasswordField />
                    </Stack>
                    <HStack justify="space-between">
                        <Checkbox size="xl" defaultChecked borderRadius="6px">
                            Remember me
                        </Checkbox>
                        <Button variant="link" colorScheme="blue" size="xl">
                            Forgot password?
                        </Button>
                    </HStack>
                    <Stack spacing="6">
                        <Button variant="primary">Sign in</Button>
                        <HStack>
                            <Divider />
                            <Text fontSize="xxl" whiteSpace="nowrap" color="muted">
                                or continue with
                            </Text>
                            <Divider />
                        </HStack>
                        <OAuthButtonGroup />
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    </Container>
);
