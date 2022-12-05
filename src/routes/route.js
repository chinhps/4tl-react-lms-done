import FileUpload from '../pages/Upload/FileUpload';
import { AuthLayout, HomeLayout } from '../Layout';
import Branches from '../pages/Branches/Branches';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import { ProtectedAuth } from '../guards';
import DoingQuiz from '../Components/Core/DoingQuiz';
import Coures from '../pages/Course/Coures';

import CoursesU from '../pages/Admin/Courses/CourseU';

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
import CoursesC from '../pages/Admin/Courses/CoursesC';
import ListQuestion from '../pages/QuestionBank/ListQuestion/ListQuestion';
import CreateQuestion from '../pages/QuestionBank/CreateQuestion/CreateQuestion';
import ListRole from '../pages/Role/ListRole/ListRole';
import CreateRole from '../pages/Role/CreateRole/CreateRole';
import UpdateRole from '../pages/Role/UpdateRole/UpdateRole';
import Quiz from '../pages/Course/Quiz/Quiz';

const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/branches',
    component: Branches,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/branches/:slug',
    component: Branches,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/branches/:slug/:table',
    component: Branches,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/upload',
    component: FileUpload,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/login',
    component: Login,
    layout: AuthLayout,
  },
  {
    path: '/course/:slugCourse',
    component: Coures,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/course/:slugCourse/quiz/:slugQuiz',
    component: Quiz,
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
    component: CoursesC,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/admin/courses/:id',
    guard: ProtectedAuth,
    component: CoursesU,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
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
  {
    path: '/question-bank/list',
    component: ListQuestion,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/role/list',
    component: ListRole,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/question-bank/new',
    component: CreateQuestion,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/role/new',
    component: CreateRole,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/role/update/:id',
    component: UpdateRole,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
];
export { publicRoutes };
