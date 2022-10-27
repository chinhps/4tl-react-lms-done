import React, { useState } from 'react';
import Menu from '../../pages/Nav/Menu';
import { Link } from 'react-router-dom';
import { logo, user } from '../../assets/images';
import { itemSettings } from '../../utils/constants';

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const [display, setDisplay] = useState('none');

    const showSetting = () => {
        setToggle(!toggle);
        if (toggle === true) {
            setDisplay('none')
        } else {
            setDisplay('flex')
        }
    }

    return (
        <header className='header'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className='header__icon'>
                    <i class="fa-solid fa-bars"></i>
                </div>

                <div className='header__logo'>
                    <Link to='/'>
                        <img 
                            src={logo}
                            alt='logo'
                            width='150px'
                        />
                    </Link>
                </div>

                <Menu />
            </div>

            <div className='header__user'>
                <div className='user__notification'>
                    <i class="fa fa-bell"></i>
                    <div className='notification__circle'>1</div>
                </div>

                <div className='user__image'>
                    <p className='user__image--name'>Chung Chí Lâm</p>
                    <img src={user} alt='user' width={46} onClick={showSetting} />
                </div>

                <ul className='user__setting' style={{ display }}>
                    <li className='user__setting--item'>
                        {itemSettings.map((item) => (
                            <Link key={item} to={item.link} className='user__setting--link'>
                                <i className={item.icon}></i> {item.title}
                            </Link>
                        ))}
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
