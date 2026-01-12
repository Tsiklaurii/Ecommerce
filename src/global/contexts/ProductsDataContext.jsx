import { createContext, useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getAllProducts, getAllCategories } from '../../global/api/endpoints';

export const ProductsDataContext = createContext();

export const ProductsDataProvider = ({ children }) => {
    let location = useLocation();
    let [searchParams] = useSearchParams();
    const [baseProducts, setBaseProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 4, total: 0 });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getAllProducts();
            if (products) {
                setBaseProducts(products);
                setPagination(prev => ({
                    ...prev,
                    total: products.length
                }));
            }
        }
        const fetchCategories = async () => {
            const categories = await getAllCategories();
            if (categories) {
                setCategories(categories);
            }
        }
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (location.pathname.includes('search')) {
            if (location.search) {
                const params = new URLSearchParams(location.search);
                let resultProducts = [...baseProducts];
                params.forEach((value, key) => {
                    switch (key) {
                        case 'category':
                            resultProducts = resultProducts.filter(product => product.category === value);
                            break;
                        case 'priceFrom':
                            if (!parseFloat(value)) {
                                return;
                            }
                            resultProducts = resultProducts.filter(product => product.price >= parseFloat(value));
                            break;
                        case 'priceTo':
                            if (!parseFloat(value)) {
                                return;
                            }
                            resultProducts = resultProducts.filter(product => product.price <= parseFloat(value));
                            break;
                        case 'sortBy':
                            switch (value) {
                                case 'price-asc':
                                    resultProducts.sort((a, b) => a.price - b.price);
                                    break;
                                case 'price-desc':
                                    resultProducts.sort((a, b) => b.price - a.price);
                                    break;
                                case 'rating-rate':
                                    resultProducts.sort((a, b) => b.rating.rate - a.rating.rate);
                                    break;
                                case 'rating-count':
                                    resultProducts.sort((a, b) => b.rating.count - a.rating.count);
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                });
                let page = parseInt(params.get('page')) || 1;
                let resProdLength = resultProducts.length;
                setPagination(prev => ({
                    ...prev,
                    total: resProdLength
                }));
                resultProducts = resultProducts.slice(
                    (parseInt(page) - 1) * pagination.limit,
                    parseInt(page) * pagination.limit
                );
                setProducts(resultProducts);
            } else {
                setProducts(baseProducts);
            }
        }
    }, [location, baseProducts, pagination.limit]);

    useEffect(() => {
        let page = parseInt(searchParams.get('page'));
        if (page) {
            setPagination(prev => ({
                ...prev,
                page
            }));
        }
    }, [searchParams]);

    return (
        <ProductsDataContext.Provider value={{ products, categories, pagination, baseProducts }}>
            {children}
        </ProductsDataContext.Provider>
    );
}