import React, { useState } from 'react';
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
// Assets
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../reducer/userSlide';
import { useEffect } from 'react';
import { setLogin } from '../../utils/auth';
import userAPI from '../../api/userAPI';
import { useParams, useSearchParams } from 'react-router-dom';

function Login() {
    // Chakra color mode
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorSecondary = 'gray.400';
    const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
    const textColorBrand = useColorModeValue('brand.500', 'white');
    const brandStars = useColorModeValue('brand.500', 'brand.400');
    const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
    const googleText = useColorModeValue('navy.700', 'white');
    const googleHover = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.300' });
    const googleActive = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.200' });
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [pendingGoogle,setPendingGoogle] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const toast = useToast({
        position: 'top',
    });
    const dispatch = useDispatch();

    const { user: GetUser, pending: GetPending, error: GetError } = useSelector((state) => state.user);

    const onSubmit = (data) => {
        dispatch(
            fetchLogin({
                email: data.email,
                password: data.password,
            }),
        );
    };

    useEffect(() => {
        if (GetError) {
            toast({
                title: 'Đăng nhập thất bại',
                status: 'error',
                isClosable: true,
            });
        }
        if (GetUser && !GetError) {
            setLogin();
        }
        console.log(GetUser);
    }, [GetPending]);

    useEffect(() => {
        if(searchParams.get('code')) {
            setPendingGoogle(true)
            userAPI.loginWithGoogle(searchParams.get('code')).then(data => {
                console.log('google',data);
                setLogin();
            });
        }

    },[]);

    const handelLoginWithGoogle = async () => {
        const url = await userAPI.urlLoginGoogle();
        window.location = url.url;
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex
                    maxW={{ base: '100%', md: 'max-content' }}
                    w="100%"
                    mx={{ base: 'auto', lg: '0px' }}
                    me="auto"
                    h="100%"
                    alignItems="start"
                    justifyContent="center"
                    mb={{ base: '30px', md: '60px' }}
                    px={{ base: '25px', md: '0px' }}
                    mt={{ base: '40px', md: '14vh' }}
                    flexDirection="column"
                >
                    <Box me="auto">
                        <Heading color={textColor} fontSize="36px" mb="10px">
                            Đăng nhập
                        </Heading>
                        <Text mb="36px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md">
                            Hệ thống quản lý học tập 4TL
                        </Text>
                    </Box>
                    <Flex
                        zIndex="2"
                        direction="column"
                        w={{ base: '100%', md: '420px' }}
                        maxW="100%"
                        background="transparent"
                        borderRadius="15px"
                        mx={{ base: 'auto', lg: 'unset' }}
                        me="auto"
                        mb={{ base: '20px', md: 'auto' }}
                    >
                        <Button
                            fontSize="sm"
                            me="0px"
                            mb="26px"
                            py="15px"
                            h="50px"
                            borderRadius="16px"
                            bg={googleBg}
                            color={googleText}
                            fontWeight="500"
                            _hover={googleHover}
                            _active={googleActive}
                            _focus={googleActive}
                            onClick={() => handelLoginWithGoogle()}
                            isLoading={pendingGoogle}
                            loadingText='Đang đăng nhập'
                        >
                            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                            Đăng nhập với Google
                        </Button>

                        <FormControl>
                            <FormLabel
                                display="flex"
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColor}
                                mb="8px"
                            >
                                Email<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant="outline"
                                fontSize="sm"
                                {...register('email')}
                                ms={{ base: '0px', md: '0px' }}
                                type="email"
                                placeholder="Nhập Email"
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor} display="flex">
                                Mật khẩu<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <InputGroup size="md">
                                <Input
                                    isRequired={true}
                                    fontSize="sm"
                                    placeholder="Nhập mật khẩu"
                                    {...register('password')}
                                    mb="24px"
                                    size="lg"
                                    type={show ? 'text' : 'password'}
                                    variant="outline"
                                />
                                <InputRightElement display="flex" alignItems="center" mt="4px">
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{ cursor: 'pointer' }}
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClick}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <Flex justifyContent="space-between" align="center" mb="24px">
                                <FormControl display="flex" alignItems="center">
                                    <Checkbox id="remember-login" colorScheme="brandScheme" me="10px" />
                                    <FormLabel
                                        htmlFor="remember-login"
                                        mb="0"
                                        fontWeight="normal"
                                        color={textColor}
                                        fontSize="sm"
                                    >
                                        Ghi nhớ đăng nhập
                                    </FormLabel>
                                </FormControl>
                            </Flex>
                            <Button
                                isLoading={GetPending}
                                fontSize="sm"
                                type="submit"
                                variant="brand"
                                fontWeight="500"
                                w="100%"
                                h="50"
                                mb="24px"
                            >
                                Đăng nhập
                            </Button>
                        </FormControl>
                        <Flex flexDirection="column" justifyContent="center" alignItems="start" maxW="100%" mt="0px">
                            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                                Bạn chưa có tài khoản?
                                <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                                    Phòng công tác sinh viên
                                </Text>
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </form>
        </>
    );
}

export default Login;
