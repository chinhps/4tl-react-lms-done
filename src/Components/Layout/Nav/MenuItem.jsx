import React from 'react';

const MenuItem = ({ path, title }) => {
    return (
        <li className="menu-item">
            <a className="menu-link" href={path}>
                {title}
            </a>
        </li>
    );
};

export default MenuItem;
