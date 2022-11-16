import Upload from '../pages/Upload/Upload';
import { AuthLayout, HomeLayout } from '../Layout';
import Classes from '../pages/Classes/Classes';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Course from '../Components/Core/Course';
import { ProtectedAuth } from '../guards';
import DoingQuiz from '../Components/Core/DoingQuiz';
import AdminCourseCU from '../pages/Admin/Courses/CoursesCU';
import AdminCourse from '../pages/Admin/Courses/Course';
import ListUser from '../pages/User/ListUser/ListUser';
import CreateUser from '../pages/User/CreateUser/CreateUser';
import UpdateUser from '../pages/User/UpdateUser/UpdateUser';
import ListSubject from '../pages/Subject/ListSubject/ListSubject';
import CreateSubject from '../pages/Subject/CreateSubject/CreateSubject';
import UpdateSubject from '../pages/Subject/UpdateSubject/UpdateSubject';
import ListMajor from '../pages/Major/ListMajor/ListMajor';
import CreateMajor from '../pages/Major/CreateMajor/CreateMajor';
import UpdateMajor from '../pages/Major/UpdateMajor/UpdateMajor';

const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/class/*',
    component: Classes,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/upload',
    component: Upload,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/login',
    component: Login,
    layout: AuthLayout,
  },
  {
    path: '/course/:id',
    component: Course,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/doing-quiz',
    component: DoingQuiz,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/admin/courses',
    component: AdminCourse,
    layout: HomeLayout,

    guard: ProtectedAuth,
  },
  {
    path: '/admin/courses/new',
    // children: [{ path: '/courses' }],
    component: AdminCourseCU,
    layout: HomeLayout,

    guard: ProtectedAuth,
  },
  {
    path: '/admin/courses/:id',
    // children: [{ path: '/courses' }],
    component: AdminCourseCU,
    layout: HomeLayout,

    path: '/user/list',
    component: ListUser,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/user/new',
    component: CreateUser,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/user/update/:id',
    component: UpdateUser,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/subject/list',
    component: ListSubject,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/subject/new',
    component: CreateSubject,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/subject/update/:id',
    component: UpdateSubject,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/major/list',
    component: ListMajor,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/major/new',
    component: CreateMajor,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/major/update/:id',
    component: UpdateMajor,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
];

export { publicRoutes };
