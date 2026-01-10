import { createContext, useEffect, useState } from "react"
import { getAllCategories, getAllProducts } from "../api/endpoints";

export const ProductsDataContext = createContext();

export const ProductsDataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getAllProducts();
            if (products) {
                setProducts(products);
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

    return (
        <ProductsDataContext.Provider value={{ products, categories }}>
            {children}
        </ProductsDataContext.Provider>
    )
}
