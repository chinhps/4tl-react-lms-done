import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Outlet } from 'react-router-dom';
import axiosClient from './api/axiosClient';
import DefaultLayout from './Layout/HomeLayout';
import { fetchUser } from './reducer/userSlide';
import { publicRoutes } from './routes/route';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    csrf();
  }, []);

  const csrf = async () => {
    const csrf = await axiosClient.get('/sanctum/csrf-cookie');
  };

  return (
    <>
      <Routes>
        {publicRoutes.map((routee, index) => {
          const Page = routee.component;
          const Layout = routee.layout || DefaultLayout;
          const Guard = routee.guard || Fragment;
          return (
            <Route
              key={index}
              path={routee.path}
              element={
                <Guard>
                  <Layout title={routee.title}>{routee.children ? <Outlet /> : <Page />}</Layout>
                </Guard>
              }
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
    </>
  );
}

export default App;
