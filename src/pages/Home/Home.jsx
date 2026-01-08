import { useEffect, useState } from "react";
import { getAllProducts } from "../../global/api/endpoints";
import { Carousel } from "../../components/Sliders/Carousel";
import { HomeProductCard } from "../../components/Cards/HomeProductCard";

export const Home = () => {
    const [products, setProducst] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getAllProducts();
            if (products) {
                setProducst(products);
            }
        }
        fetchProducts();
    }, [])

    return (
        <div className="flex p-10">
            {products.length > 0 ?
                <Carousel>
                    {products.map((product) => (
                        <HomeProductCard key={`product-${product.id}`} product={product} />
                    ))}
                </Carousel>
                :
                null
            }
        </div>
    )
}
