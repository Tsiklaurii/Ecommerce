import { _getRequest } from "./axios"

export const getAllProducts = async () => {
    return await _getRequest('products');
}