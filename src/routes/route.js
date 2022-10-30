import Upload from '../pages/Upload/Upload';
import { HomeLayout, LoginLayout } from '../Layout';
import Classes from '../pages/Classes/Classes';
import Home from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';

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
];

export { publicRoutes };
