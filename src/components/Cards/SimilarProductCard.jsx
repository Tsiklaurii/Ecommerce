import { useContext } from "react"
import { Link } from "react-router-dom"
import { StaticDataContext } from '../../global/contexts/StaticDataContext';

export const SimilarProductCard = ({ product }) => {
    const { lang } = useContext(StaticDataContext);

    return (
        <Link to={`/${lang}/product/${product.id}`}>
            <div className="border border-gray-200 p-3 flex flex-col cursor-pointer h-100">
                <img src={product.image} alt={product.name} className="h-50 object-contain mb-5" />
                <h3 className="text-xl font-bold line-clamp-2">{product.title}</h3>
                <p className="text-lg">${product.price}</p>
                <p className="line-clamp-2">{product.description}</p>
            </div>
        </Link>
    )
}
