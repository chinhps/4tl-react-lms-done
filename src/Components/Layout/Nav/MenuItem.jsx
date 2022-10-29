import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ path, title }) => {
    return (
        <li className="menu-item">
            <Link className="menu-link" to={path}>
                {title}
            </Link>
        </li>
    );
};

export default MenuItem;
