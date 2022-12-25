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
  Image,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiUser,
  FiBook,
  FiBriefcase,
  FiBookmark,
  FiChevronRight,
  FiSlack,
  FiDatabase,
  FiGitPullRequest,
  FiUsers,
  FiGitCommit,
  FiCodepen,
  FiFileText,
  FiMessageCircle,
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import logoDark from '../../assets/images/logo_dark.png';
import logoLight from '../../assets/images/logo_light.png';

const LinkItems = [
  { name: 'Trang chủ', icon: FiHome, to: '/' },
  { name: 'Kho kiến thức', role: ['STUDENT', 'LECTURER', 'ADMIN'], icon: FiTrendingUp, to: '/branches' },
  {
    name: 'Tin nhắn',
    role: ['STUDENT', 'LECTURER'],
    icon: FiMessageCircle,
    to: '/chat',
  },
  {
    name: 'Tin tức',
    role: ['STUDENT', 'LECTURER','ADMIN'],
    icon: FiCompass,
    to: '/news',
  },
  {
    name: 'Thống kê',
    role: ['ADMIN'],
    icon: FiSlack,
    to: '/dashboard',
  },
  {
    name: 'Khóa học',
    role: ['ADMIN'],
    icon: FiBookmark,
    children: [
      {
        to: '/admin/courses',
        name: 'Danh sách',
      },
      {
        to: '/admin/courses/new',
        name: 'Thêm khóa học',
      },
    ],
  },
  {
    name: 'Môn học',
    role: ['ADMIN'],
    icon: FiBook,
    children: [
      {
        to: '/subject/list',
        name: 'Danh sách',
      },
      {
        to: '/subject/new',
        name: 'Thêm môn học',
      },
    ],
  },
  {
    name: 'Ngành học',
    role: ['ADMIN'],
    icon: FiBriefcase,
    children: [
      {
        to: '/major/list',
        name: 'Danh sách',
      },
      {
        to: '/major/new',
        name: 'Thêm ngành học',
      },
    ],
  },
  {
    name: 'Người dùng',
    role: ['ADMIN'],
    icon: FiUser,
    children: [
      {
        to: '/user/list',
        name: 'Danh sách',
      },
      {
        to: '/user/new',
        name: 'Thêm tài khoản',
      },
    ],
  },
  {
    name: 'Ngân hàng câu hỏi',
    role: ['ADMIN'],
    icon: FiDatabase,
    children: [
      {
        to: '/question-bank/list',
        name: 'Danh sách',
      },
      {
        to: '/question-bank/new',
        name: 'Thêm mới câu hỏi',
      },
    ],
  },
  {
    name: 'Phân quyền',
    role: ['ADMIN'],
    icon: FiGitPullRequest,
    children: [
      {
        to: '/permission/list',
        name: 'Danh sách',
      },
      {
        to: '/permission/new',
        name: 'Thêm mới quyền',
      },
    ],
  },
  {
    name: 'Vai trò',
    role: ['ADMIN'],
    icon: FiUsers,
    children: [
      {
        to: '/role/list',
        name: 'Danh sách',
      },
      {
        to: '/role/new',
        name: 'Thêm mới vai trò',
      },
    ],
  },
  {
    name: 'Loại phân quyền',
    role: ['ADMIN'],
    icon: FiGitCommit,
    children: [
      {
        to: '/permission-group/list',
        name: 'Danh sách',
      },
      {
        to: '/permission-group/new',
        name: 'Thêm mới loại phân quyền',
      },
    ],
  },
  {
    name: 'Lớp',
    role: ['ADMIN'],
    icon: FiCodepen,
    children: [
      {
        to: '/classes/list',
        name: 'Danh sách',
      },
      {
        to: '/classes/new',
        name: 'Thêm mới lớp',
      },
    ],
  },
  {
    name: 'Bảng điểm',
    role: ['ADMIN'],
    icon: FiFileText,
    to: '/point-submit/list',
  },
];

function SidebarContent({ onClose, ...rest }) {
  const { user } = useSelector((state) => state.user);
  const logo = useColorModeValue(logoLight, logoDark);

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
        overflowY="auto"
        {...rest}
      >
        <Flex alignItems="center" mx="8" justifyContent="center">
          <Link as={ReachLink} to="/">
            <Image name="4TL LMS" src={logo} py={5} />
          </Link>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        <Accordion allowMultiple>
          {LinkItems.map((link) => {
            if (link.role?.findIndex((vl) => vl === user.role.role_code) === -1) {
              return null;
            } else {
              return (
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
              );
            }
          })}
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
