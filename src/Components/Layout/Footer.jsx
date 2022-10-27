import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/4TL_Logo_png.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__logo">
                <Link to="/">
                    <img src={logo} alt="logo" width={300} />
                </Link>
            </div>

            <div className="footer__contact">
                <h3>Contact</h3>
                <ul className="menu">
                    <li className="menu__item">
                        <p className="menu__link">
                            <i className="fa-solid fa-house"></i> 778/B1 Nguyễn Kiệm, P.4, Q. Phú Nhuận, TP. Hồ Chí
                            Minh.
                        </p>
                    </li>
                    <li className="menu__item">
                        <p className="menu__link">
                            <i className="fa-solid fa-phone"></i> 02873088800
                        </p>
                    </li>
                    <li className="menu__item">
                        <p className="menu__link">
                            <i className="fa-solid fa-envelope"></i> dvsvpoly.hcm@poly.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i>
                            Đào tạo:daotaofpoly.hcm@fe.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i> khaothi.fplhcm@fe.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i> taichinhfplhcm@fe.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i> qhdn.fplhcm@fe.edu.vn
                        </p>
                    </li>
                </ul>
            </div>

            <div className="footer__contact">
                <h3>Contact</h3>
                <ul className="menu">
                    <li className="menu__item">
                        <p className="menu__link">
                            <i className="fa-solid fa-house"></i> 778/B1 Nguyễn Kiệm, P.4, Q. Phú Nhuận, TP. Hồ Chí
                            Minh.
                        </p>
                    </li>
                    <li className="menu__item">
                        <p className="menu__link">
                            <i className="fa-solid fa-phone"></i> 02873088800
                        </p>
                    </li>
                    <li className="menu__item">
                        <p className="menu__link">
                            <i className="fa-solid fa-envelope"></i> dvsvpoly.hcm@poly.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i>
                            Đào tạo:daotaofpoly.hcm@fe.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i> khaothi.fplhcm@fe.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i> taichinhfplhcm@fe.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i> qhdn.fplhcm@fe.edu.vn
                        </p>
                    </li>
                </ul>
            </div>

            <div className="footer__contact">
                <h3>Contact</h3>
                <ul className="menu">
                    <li className="menu__item">
                        <p className="menu__link">
                            <i className="fa-solid fa-house"></i> 778/B1 Nguyễn Kiệm, P.4, Q. Phú Nhuận, TP. Hồ Chí
                            Minh.
                        </p>
                    </li>
                    <li className="menu__item">
                        <p className="menu__link">
                            <i className="fa-solid fa-phone"></i> 02873088800
                        </p>
                    </li>
                    <li className="menu__item">
                        <p className="menu__link">
                            <i className="fa-solid fa-envelope"></i> dvsvpoly.hcm@poly.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i>
                            Đào tạo:daotaofpoly.hcm@fe.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i> khaothi.fplhcm@fe.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i> taichinhfplhcm@fe.edu.vn
                            <br />
                            <i className="fa-solid fa-envelope"></i> qhdn.fplhcm@fe.edu.vn
                        </p>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
