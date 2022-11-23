import React from 'react';
import { Box, CloseButton, Flex, Icon, useColorModeValue, Link, Text } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiUser, FiUserPlus, FiBookOpen, FiBook, FiBriefcase, FiBookmark, FiPlus } from 'react-icons/fi';

const LinkItems = [
  { name: 'Trang chủ', icon: FiHome, to: '/' },
  { name: 'Khóa học', icon: FiTrendingUp, to: '/branches' },
  // { name: 'Tin nhắn', icon: FiCompass, to: '/chat' },
  { name: 'Danh sách khóa học', icon: FiBookmark, to: '/admin/courses' },
  { name: 'Thêm khóa học', icon: FiPlus, to: '/admin/courses/new' },
  { name: 'Danh sách tài khoản', icon: FiUser, to: '/user/list' },
  { name: 'Thêm mới tài khoản', icon: FiUserPlus, to: '/user/new' },
  { name: 'Danh sách môn học', icon: FiBookOpen, to: '/subject/list' },
  { name: 'Thêm mới môn học', icon: FiBook, to: '/subject/new' },
  { name: 'Danh sách ngành học', icon: FiBriefcase, to: '/major/list' },
  { name: 'Thêm mới ngành học', icon: FiBriefcase, to: '/major/new' },
  { name: 'Danh sách câu hỏi', icon: FiBriefcase, to: '/question-bank/list' },
  { name: 'Thêm mới câu hỏi', icon: FiBriefcase, to: '/question-bank/new' },
];

function SidebarContent({ onClose, ...rest }) {
  return (
    <>
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="center">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            4TL LMS
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} link={link.to}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </>
  );
}

const NavItem = ({ link, icon, children, ...rest }) => {
  return (
    <Link as={ReachLink} to={link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default SidebarContent;
