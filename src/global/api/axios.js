import axios from "axios"
import { apiUrl } from "../config";

export const _getRequest = async (url, params = {}) => {
    const response = await axios.get(apiUrl + url, params);
    return response.data;
}