import Upload from '../pages/Upload/Upload';
import { AuthIllustration, HomeLayout } from '../Layout';
import Classes from '../pages/Classes/Classes';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
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
        layout: AuthIllustration,
    },
    {
        path: '/course/:id',
        component: Course,
        layout: HomeLayout,
    },
];

export { publicRoutes };
