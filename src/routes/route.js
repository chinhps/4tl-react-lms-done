import { HomeLayout } from '../Layout';
import Home from '../pages/Home/Home';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: HomeLayout,
    },
];

export { publicRoutes };
