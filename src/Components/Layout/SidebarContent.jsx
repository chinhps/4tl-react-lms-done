import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiUser,
  FiUserPlus,
  FiBookOpen,
  FiBook,
  FiBriefcase,
  FiBookmark,
  FiPlus,
  FiChevronRight,
} from 'react-icons/fi';

const LinkItems = [
  { name: 'Trang chủ', icon: FiHome, to: '/' },
  { name: 'Kho kiến thức', icon: FiTrendingUp, to: '/branches' },
  {
    name: 'Tin nhắn',
    icon: FiCompass,
    children: [
      {
        to: '/',
        name: 'Danh sách',
      }
    ],
  },
  {
    name: 'Khóa học',
    icon: FiBookmark,
    children: [
      {
        to: '/admin/courses',
        name: 'Danh sách',
      },
      {
        to: '/admin/courses/new',
        name: 'Thêm khóa học',
      }
    ],
  },
  {
    name: 'Môn học',
    icon: FiBook,
    children: [
      {
        to: '/subject/list',
        name: 'Danh sách',
      },
      {
        to: '/subject/new',
        name: 'Thêm môn học',
      }
    ],
  },
  {
    name: 'Ngành học',
    icon: FiBriefcase,
    children: [
      {
        to: '/major/list',
        name: 'Danh sách',
      },
      {
        to: '/major/new',
        name: 'Thêm ngành học',
      }
    ],
  },
  {
    name: 'Người dùng',
    icon: FiUser,
    children: [
      {
        to: '/user/list',
        name: 'Danh sách',
      },
      {
        to: '/user/new',
        name: 'Thêm tài khoản',
      }
    ],
  },
  {
    name: 'Ngân hàng câu hỏi',
    icon: FiBriefcase,
    children: [
      {
        to: '/question-bank/list',
        name: 'Danh sách',
      },
      {
        to: '/question-bank/new',
        name: 'Thêm mới câu hỏi',
      }
    ],
  },
  {
    name: 'Phân quyền',
    icon: FiBriefcase,
    children: [
      {
        to: '/role/list',
        name: 'Danh sách',
      },
      {
        to: '/role/new',
        name: 'Thêm mới quyền',
      }
    ],
  }
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
        <Accordion allowMultiple>
          {LinkItems.map((link) => (
            <AccordionItem border="0" key={link.name}>
              <AccordionButton padding="0" w="100%">
                <NavItem icon={link.icon} link={link.to}>
                  {link.name}
                </NavItem>
              </AccordionButton>
              {link.children
                ? link.children.map((child, index) => (
                    <AccordionPanel py="0" key={index}>
                      <NavItem icon={FiChevronRight} link={child.to}>
                        {child.name}
                      </NavItem>
                    </AccordionPanel>
                  ))
                : null}
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </>
  );
}

const NavLink = ({ link, children }) => {
  return (
    <>
      {link ? (
        <Link as={ReachLink} to={link} style={{ textDecoration: 'none' }} w="100%" _focus={{ boxShadow: 'none' }}>
          {children}
        </Link>
      ) : (
        <Link style={{ textDecoration: 'none' }} w="100%" _focus={{ boxShadow: 'none' }}>
          {children}
        </Link>
      )}
    </>
  );
};

const NavItem = ({ link, icon, children, ...rest }) => {
  return (
    <NavLink link={link ?? null}>
      <Flex
        align="center"
        px="25px"
        py="15px"
        mx="0"
        w="100%"
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
    </NavLink>
  );
};

export default SidebarContent;
