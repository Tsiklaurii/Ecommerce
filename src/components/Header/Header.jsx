import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import search from '../../assets/images/search.png';
import cart from '../../assets/images/cart.png';
import favorite from '../../assets/images/favorite.png';
import { useContext } from 'react';
import { StaticDataContext } from '../../global/contexts/StaticDataContext';

export const Header = () => {
    const { lang, langs, changeLanguage } = useContext(StaticDataContext);

    return (
        <div className="flex border-b p-[5px_30px] justify-between items-center">
            <div>
                <Link to={`/${lang}`}>
                    <img src={logo} alt="Logo" className='h-12.5 cursor-pointer' />
                </Link>
            </div>
            <div className='flex relative'>
                <input type="text" placeholder='Search...' name='search' className='border border-gray-500 p-[2px_5px] rounded-[5px] focus:outline-none w-100' />
                <button className='cursor-pointer absolute right-1.25 bottom-1.75'>
                    <img src={search} alt="search" />
                </button>
            </div>
            <div className='flex gap-7.5 w-85 justify-center'>
                <Link to={`/${lang}/about`}>{langs.menu.about}</Link>
                <Link to={`/${lang}/gallery`}>{langs.menu.gallery}</Link>
                <Link to={`/${lang}/contact`}>{langs.menu.contact}</Link>
            </div>
            <div className="flex gap-3 w-auto items-center">
                <img src={cart} alt="cart" className='cursor-pointer' />
                <img src={favorite} alt="favorite" className='cursor-pointer' />

                <div onClick={changeLanguage} className='cursor-pointer'>
                    {lang === 'en' ? 'KA' : 'EN'}
                </div>
            </div>
        </div>
    )
}
