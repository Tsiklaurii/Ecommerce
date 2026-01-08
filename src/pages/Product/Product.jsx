import { useContext, useEffect, useState } from "react"
import { getProductById, getProductsByCategory } from "../../global/api/endpoints";
import { useParams } from "react-router-dom";
import { StaticDataContext } from "../../global/contexts/StaticDataContext";
import { SimilarCarousel } from "../../components/Sliders/SimilarCarousel";
import { SimilarProductCard } from "../../components/Cards/SimilarProductCard";

export const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { lang, langs } = useContext(StaticDataContext);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(productId);
      if (product) {
        setProduct(product);
      }
    }
    fetchProduct();
  }, [productId])

  useEffect(() => {
    const fetchSimilarProduct = async () => {
      const products = await getProductsByCategory(product.category);
      if (products) {
        setSimilarProducts(products);
      }
    }
    if (product) {
      fetchSimilarProduct();
    }
  }, [product])

  return (
    <div className="p-[30px_70px]">
      {product ?
        <>
          <div className="flex p-10 border-2 border-gray-300 rounded-2xl">
            <div className="basis-1/2 flex flex-col items-center gap-6">
              <h1 className="text-xl font-bold">{product.title}</h1>
              <img src={product.image} alt={product.title} className="w-70" />
            </div>
            <div className="basis-1/2 flex flex-col gap-4">
              <p><span className="font-bold">{langs.product.price}: </span>${product.price}</p>
              <p><span className="font-bold">{langs.product.category}: </span>{product.category}</p>
              <p><span className="font-bold">{langs.product.rate}: </span>{product.rating.count} {product.rating.rate}</p>
              <p><span className="font-bold">{langs.product.description}: </span>{product.description}</p>
            </div>
          </div>
          <div>
            <h3 className="text-3xl p-10 font-bold">{langs.product.similar}</h3>
            <div>
              <SimilarCarousel>
                {similarProducts.map((product, index) => (
                  <SimilarProductCard key={`similar-product-${index}`} product={product} />
                ))}
              </SimilarCarousel>
            </div>
          </div>
        </>
        :
        <p>{langs.common.productNotFound}</p>
      }
    </div>
  )
}
