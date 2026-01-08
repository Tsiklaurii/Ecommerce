import { _getRequest } from "./axios"

export const getAllProducts = async () => {
    return await _getRequest('products');
}

export const getProductById = async (id) => {
    return await _getRequest(`products/${id}`);
}

export const getProductsByCategory = async (categoryName) => {
    return await _getRequest(`products/category/${categoryName}`);
}