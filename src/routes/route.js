import Upload from '../pages/Upload/Upload';
import { HomeLayout } from '../Layout';
import Home from '../pages/Home/Home';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: HomeLayout,
    },
    {
        path: '/upload',
        component: Upload
    }
];

export { publicRoutes };
