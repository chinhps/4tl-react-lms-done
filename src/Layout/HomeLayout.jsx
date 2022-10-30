import React from 'react';
import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";

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
