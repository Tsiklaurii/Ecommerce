import { useContext } from "react"
import { StaticDataContext } from "../../global/contexts/StaticDataContext"
import { Filters } from "./components/Filters";
import { SearchProductCard } from "../../components/Cards/SearchProductCard";
import { Pagination } from "./components/Pagination";
import { ProductsDataContext } from "../../global/contexts/ProductsDataContext";

export const Search = () => {
  const { langs } = useContext(StaticDataContext);
  const { products } = useContext(ProductsDataContext);

  return (
    <div className="pt-6 pl-10">
      <h1 className="font-bold text-2xl">{langs.search.title}</h1>
      <div className="flex gap-10">

        <Filters />

        <div className="flex flex-wrap gap-5">
          {products.length > 0 ?
            products.map((product, i) => (
              <SearchProductCard product={product} key={i} />
            ))
            : null}
          <Pagination />
        </div>
      </div>
    </div>
  )
}
