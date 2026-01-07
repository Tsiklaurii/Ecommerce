import { Link } from 'react-router-dom';
import logo from '../../theme/images/logo.png';
import search from '../../theme/images/search.png';
import cart from '../../theme/images/cart.png';
import favorite from '../../theme/images/favorite.png';
import { useContext } from 'react';
import { StaticDataContext } from '../../global/contexts/StaticDataContext';

export const Header = () => {
    const { lang, changeLanguage } = useContext(StaticDataContext);

    return (
        <div className="header">
            <div>
                <Link to={`/${lang}`}>
                    <img src={logo} alt="Logo" className='logo' />
                </Link>
            </div>
            <div className='search'>
                <input type="text" placeholder='Search...' />
                <button>
                    <img src={search} alt="search" />
                </button>
            </div>
            <div className='menu'>
                <Link to={`/${lang}/about`}>About</Link>
                <p>Gallery</p>
                <p>Contact</p>
            </div>
            <div className="icons">
                <img src={cart} alt="cart" />
                <img src={favorite} alt="favorite" />

                <div onClick={changeLanguage} style={{ cursor: 'pointer' }}>
                    {lang === 'en' ? 'KA' : 'EN'}
                </div>
            </div>
        </div>
    )
}
