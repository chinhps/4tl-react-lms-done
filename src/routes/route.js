import Upload from '../pages/Upload/Upload';
import { AuthLayout, HomeLayout } from '../Layout';
import Branches from '../pages/Branches/Branches';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import { ProtectedAuth } from '../guards';
import DoingQuiz from '../Components/Core/DoingQuiz';
import Coures from '../pages/Course/Coures';

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
    path: '/course',
    component: Coures,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
  {
    path: '/doing-quiz',
    component: DoingQuiz,
    layout: HomeLayout,
    guard: ProtectedAuth,
  },
];

export { publicRoutes };
