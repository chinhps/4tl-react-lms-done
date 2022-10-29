import React from 'react';
import Menu from './Nav/Menu';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/4TL_Logo_png.png';
import user from '../../assets/images/user.png';
import { IoIosNotifications } from 'react-icons/io';

const Header = () => {
    return (
        <header className="header">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="logo" width="150px" />
                    </Link>
                </div>

                <Menu />
            </div>

            <div className="header__user">
                <div className="user__notification">
                    <IoIosNotifications fontSize={30} />
                    <div className="notification__circle">1</div>
                </div>

                <div className="user__image center">
                    <p className="user__image--name">Chung chi lam</p>
                    <img src={user} alt="" width={50} />
                </div>

                <ul className="user__setting">
                    <li className="user__setting--item">
                        <Link to="/" className="user__setting--link">
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
