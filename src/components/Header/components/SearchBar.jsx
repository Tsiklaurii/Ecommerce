import { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import { ProductsDataContext } from '../../../global/contexts/ProductsDataContext';
import { StaticDataContext } from '../../../global/contexts/StaticDataContext';
import search from '../../../assets/images/search.png';

export const SearchBar = () => {
    let [searchParams] = useSearchParams();
    const { lang } = useContext(StaticDataContext);
    const { baseProducts, categories } = useContext(ProductsDataContext);
    const [searchValue, setSearchValue] = useState(searchParams.get('keyword') || '');
    const [suggestions, setSuggestions] = useState({ products: [], categories: [] });

    const changeValue = (e) => {
        let value = e.target.value;
        setSearchValue(value)
    }

    const onFormSubmit = () => {
        setSuggestions({
            products: [],
            categories: []
        })
    }

    const resetVars = () => {
        setTimeout(() => {
            setSearchValue('')
            setSuggestions({
                products: [],
                categories: []
            })
        }, 300)
    }

    useEffect(() => {
        if (searchValue && baseProducts && categories &&
            searchValue.length >= 2 && searchValue !== searchParams.get('keyword')
        ) {
            let productList = baseProducts.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()));
            let categoryList = categories.filter(category => category.toLowerCase().includes(searchValue.toLowerCase()));
            setSuggestions({
                products: productList,
                categories: categoryList
            })
        } else {
            setSuggestions({
                products: [],
                categories: []
            })
        }
    }, [searchValue, baseProducts, categories, searchParams])

    return (
        <div className='relative'>

            <form method='GET' action={`/${lang}/search`} className='flex relative' autoComplete='off'>
                <input name='keyword' type="text" value={searchValue} onChange={changeValue} onBlur={resetVars} placeholder='Search' required className='border border-gray-500 p-[2px_5px] rounded-[5px] focus:outline-none w-100' />
                <button type="submit" onClick={onFormSubmit} className='cursor-pointer absolute right-1.25 bottom-1.75'>
                    <img src={search} alt='search' />
                </button>
            </form>

            {(suggestions.products.length > 0 || suggestions.categories.length > 0) ?
                <div className='border border-gray-400 rounded-xl absolute top-8 bg-white p-2 z-2'>
                    {suggestions.categories.length > 0 ?
                        <div className='p-1.25'>
                            <h3 className='font-bold'>Categories</h3>
                            <div className='flex flex-col'>
                                {suggestions.categories.map((suggestion, index) => (
                                    <Link to={`/${lang}/search?category=${suggestion}`} key={index} className='hover:bg-blue-300 p-0.5 transition-all'>
                                        {suggestion}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        : null}
                    {suggestions.products.length > 0 ?
                        <div className='p-1.25'>
                            <h3 className='font-bold'>Products</h3>
                            <div className='flex flex-col'>
                                {suggestions.products.map((suggestion, index) => (
                                    <Link to={`/${lang}/product/${suggestion.id}`} key={index}className='hover:bg-blue-300 p-0.5 transition-all' >
                                        {suggestion.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        : null}
                </div>
                : null}
        </div>
    );
}