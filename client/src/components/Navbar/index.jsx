import { Link } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useLogout from '../../hooks/auth/useLogout';
import { useState } from "react";

export const Navbar = () => {
    const { auth } = useAuth();
    const logout = useLogout();

    const [headerClass, setHeaderClass] = useState('');
    const menuToggle = () => { headerClass === 'open' ? setHeaderClass('') : setHeaderClass('open'); }
    
    return (
        <header className={headerClass}>
            <div className="nav__hamburger" onClick={menuToggle}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            
            <ul className="navbar">
                <li className="logo"><Link to="/">Logo</Link></li>

                <div className='nav__menu'>
                    <li><Link to="/" onClick={menuToggle}>Home</Link></li>
                    <li><Link to="/private" onClick={menuToggle}>Private</Link></li>
                    <li><Link to="/admin" onClick={menuToggle}>Admin</Link></li>
                </div>
            </ul>

            {auth?.username ? <button className="button" onClick={logout}>Log out</button> : <Link className="button" to="/login">Log in</Link>}
        </header>
    )
}
