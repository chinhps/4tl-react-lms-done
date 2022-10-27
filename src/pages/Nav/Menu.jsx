import React from 'react';
import MenuItem from './MenuItem';

const menuItem = [
    { name: 'Home', path: '/' },
    { name: 'Class', path: 'class' },
    { name: 'Chat', path: 'chat' },
];
const Menu = () => {
    return (
        <ul className="header__menu">
            {menuItem.map((item) => (
                <MenuItem title={item.name} path={item.path} key={item.name} />
            ))}
        </ul>
    );
};

export default Menu;
