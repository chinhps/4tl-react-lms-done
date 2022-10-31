import Upload from '../pages/Upload/Upload';
import { HomeLayout, LoginLayout } from '../Layout';
import Classes from '../Components/Core/ClassItem';
import Home from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';
import Course from '../Components/Core/Course';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: HomeLayout,
    },
    {
        path: '/class/*',
        component: Classes,
        layout: HomeLayout,
    },
    {
        path: '/upload',
        component: Upload,
        layout: HomeLayout,
    },
    {
        path: '/login',
        component: Login,
        layout: LoginLayout,
    },
    {
        path: '/course',
        component: Course,
        layout: HomeLayout,
    },
];

export { publicRoutes };
