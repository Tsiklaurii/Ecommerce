import { useContext, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";
import { StaticDataContext } from "../../../global/contexts/StaticDataContext"
import { ProductsDataContext } from "../../../global/contexts/ProductsDataContext";

export const Filters = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { lang, langs } = useContext(StaticDataContext);
    const { categories } = useContext(ProductsDataContext);
    const [priceFrom, setPriceFrom] = useState(searchParams.get('priceFrom') || '');
    const [priceTo, setPriceTo] = useState(searchParams.get('priceTo') || '');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');

    const handlePrice = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        if (!value.match(/^\d*\.?\d*$/)) {
            return;
        }
        if (value.length > 0) {
            if (parseFloat(value) >= 10000 || parseFloat(value) < 0) {
                return;
            }
        }
        if (value.includes('.')) {
            let arr = value.split('.');
            if (arr[1].length > 2) {
                return;
            }
        }
        if (name === 'priceFrom') {
            if (parseFloat(value) > parseFloat(priceTo) && priceTo.length > 0) {
                return;
            }
            setPriceFrom(value);
        } else {
            setPriceTo(value);
        }
    }

    const chckPriceToRange = () => {
        if (parseFloat(priceTo) < parseFloat(priceFrom) && priceFrom.length > 0) {
            setPriceTo(parseFloat(priceFrom) + 1)
        }
    }

    const updateUrl = (key, value) => {
        let newSearchParams = new URLSearchParams(searchParams.toString());
        if (value.length > 0) {
            newSearchParams.set(key, value);
        } else {
            newSearchParams.delete(key);
        }
        setSearchParams(newSearchParams);
    }

    const handleSortBy = (e) => {
        let value = e.target.value;
        setSortBy(value);
        updateUrl('sortBy', value);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            updateUrl('priceFrom', priceFrom);
        }, 500);
        return () => clearTimeout(timer);
    }, [priceFrom])

    useEffect(() => {
        const timer = setTimeout(() => {
            updateUrl('priceTo', priceTo);
        }, 500);
        return () => clearTimeout(timer);
    }, [priceTo])

    useEffect(() => {
        if (!searchParams.get('priceFrom')) {
            setPriceFrom('');
        }
        if (!searchParams.get('priceTo')) {
            setPriceTo('');
        }
        if (!searchParams.get('sortBy')) {
            setSortBy('');
        }
    }, [searchParams]);

    return (
        <div className="flex flex-col gap-1 w-full max-w-40">
            <h1 className="font-bold text-xl pt-2 pb-3">{langs.search.filters}</h1>
            {categories.length > 0 ?
                categories.map((category, i) => (
                    <Link to={`/${lang}/search?category=${category}`} key={i} className="hover:bg-blue-300 duration-150 p-1.25">
                        {category}
                    </Link>
                ))
                : null}
            <h2 className="pt-1.25 pb-1.25">{langs.search.price}</h2>
            <div className="flex gap-2">
                <input type="text" placeholder="From" name="priceFrom" className="border w-17 focus:outline-none" value={priceFrom} onChange={handlePrice} /> -
                <input type="text" placeholder="To" name="priceTo" className="border w-17 focus:outline-none" value={priceTo} onChange={handlePrice} onBlur={chckPriceToRange} />
            </div>
            <h2 className="pt-1.25 pb-1.25">{langs.search.sort}</h2>
            <div>
                <select className="border" name="sortBy" value={sortBy} onChange={handleSortBy}>
                    <option value=''>{langs.search.sortBy}</option>
                    <option value='price-asc'>{langs.search.sortBypriceASC}</option>
                    <option value='price-desc'>{langs.search.sortBypriceDESC}</option>
                    <option value='rating-rate'>{langs.search.sortByRatingRate}</option>
                    <option value='rating-count'>{langs.search.sortByRatingCount}</option>
                </select>
            </div>
        </div>
    )
}
