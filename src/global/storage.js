export const existData = (key) => {
    return localStorage.getItem(key) !== null;
}

export const getData = (key) => {
    if (existData(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
    return null;
}

export const setData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}