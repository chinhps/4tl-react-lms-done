import { Routes, Route, Outlet } from 'react-router-dom';
import DefaultLayout from './Layout/HomeLayout';
import { publicRoutes } from './routes/route';

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((routee, index) => {
                    const Page = routee.component;
                    const Layout = routee.layout || DefaultLayout;
                    return (
                        <Route
                            key={index}
                            path={routee.path}
                            element={<Layout>{routee.children ? <Outlet /> : <Page />}</Layout>}
                        >
                            {routee.children ? <Route index element={<Page />} /> : null}
                            {routee.children !== undefined
                                ? routee.children.map((routeChild, i) => {
                                    const PageChild = routeChild.component;
                                    return <Route key={i} path={routeChild.path} element={<PageChild />} />;
                                })
                                : null}
                        </Route>
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
