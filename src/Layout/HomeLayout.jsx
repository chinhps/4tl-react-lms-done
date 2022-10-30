import React from 'react';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';

function HomeLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container">{children}</div>
            <Footer />
        </>
    );
}

export default HomeLayout;
