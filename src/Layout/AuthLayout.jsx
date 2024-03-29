import React from 'react'
// Chakra imports
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
// Custom components
import { NavLink } from "react-router-dom";
// Assets
import { FaChevronLeft } from "react-icons/fa";

function AuthLayout({children}) {
    return (
        <Flex position='relative' h='max-content'>
          <Flex
            h={{
              sm: "initial",
              md: "unset",
              lg: "100vh",
              xl: "100vh",
            }}
            w='100%'
            maxW={{ md: "66%", lg: "1313px" }}
            mx='auto'
            pt={{ sm: "50px", md: "0px" }}
            px={{ lg: "30px", xl: "0px" }}
            ps={{ xl: "70px" }}
            justifyContent='start'
            direction='column'>
            {children}
            <Box
              display={{ base: "none", md: "block" }}
              h='100%'
              minH='100vh'
              w={{ lg: "50vw", "2xl": "44vw" }}
              position='absolute'
              right='0px'>
              <Flex
                bg={`url('/4TL.png')`}
                justify='center'
                align='end'
                w='100%'
                h='100%'
                bgSize='cover'
                bgPosition='50%'
                position='absolute'
                borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}></Flex>
            </Box>
          </Flex>
        </Flex>
      );
}

export default AuthLayout