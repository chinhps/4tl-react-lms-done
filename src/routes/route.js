import Upload from '../pages/Upload/Upload';
import { AuthLayout, HomeLayout } from '../Layout';
import Classes from '../pages/Classes/Classes';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Course from '../Components/Core/Course';
import { ProtectedAuth } from '../guards';

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
    },
    {
        path: '/upload',
        component: Upload,
        layout: HomeLayout,
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
    },
];

export { publicRoutes };
