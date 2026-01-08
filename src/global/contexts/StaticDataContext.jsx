import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { languageList } from "../config";
import { getData, setData } from "../storage";
import { enLangs, kaLangs } from "../langs";

export const StaticDataContext = createContext();

export const StaticDataProvider = ({ children }) => {
    let navigate = useNavigate();
    const [lang, setLang] = useState(getData('Lang') || languageList[0]);
    const [langs, setLangs] = useState(lang === 'en' ? enLangs : kaLangs);

    useEffect(() => {
        if (!getData('Lang')) {
            setData('Lang', languageList[0]);
        }
    }, [])

    const changeLanguage = () => {
        let newLang = lang === 'en' ? 'ka' : 'en';
        setLang(newLang);
        setData('Lang', newLang);
        navigate(`/${newLang}`);
        setLangs(newLang === 'en' ? enLangs : kaLangs);
    }

    return (
        <StaticDataContext.Provider value={{ lang, langs, changeLanguage }}>
            {children}
        </StaticDataContext.Provider>
    )
}
