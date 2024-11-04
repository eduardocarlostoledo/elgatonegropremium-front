import "../styles/Products.css";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterByBrands,
  filterByPrice,
  filterByType,
  getAllBrands,
  getAllProducts,
  getAllProductsName,
  getAllTypes,
} from "../redux/slices/productSlice.js";
import Card from "../components/Card";
import Paginado from "./Paginado";

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  const brands = useSelector((state) => state.products.brands);
  const types = useSelector((state) => state.products.types);

  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 20;
  const [name, setName] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getAllProducts());
      await dispatch(getAllBrands());
      await dispatch(getAllTypes());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const paginado = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllProductsName(name));
    setCurrentPage(1);
  };

  const handleFilterBrands = (e) => {
    dispatch(filterByBrands(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterTypes = (e) => {
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterPrice = (e) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (e.target.value === "ASC") return a.price - b.price;
      return b.price - a.price;
    });
    setFilteredProducts(sortedProducts);
    setCurrentPage(1);
  };

  const handleClick = () => {
    dispatch(getAllProducts());
    setName("");
  };

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  return (
    <div className="DivProducts">
      <div className="Products">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            <div className="DivCardsFilters">
              <div className="DivFilter">
                <div className="SearchButton" id="InputB">
                  <input
                    className="InputB"
                    type="text"
                    placeholder="Buscar..."
                    value={name}
                    onChange={handleInputChange}
                  />
                  <div
                    className="SubmitButton"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <HiMagnifyingGlass className="icon" />
                  </div>
                </div>
                <div className="ContainerFilters">
                  <select
                    id="filterBrandsSelect"
                    className="Filter"
                    onChange={handleFilterBrands}
                  >
                    <option value="All">Marcas</option>
                    {brands.map((b, index) => (
                      <option key={index} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>

                  <select
                    id="filterTypesSelect"
                    className="Filter"
                    onChange={handleFilterTypes}
                  >
                    <option value="All">Tipos</option>
                    {types.map((t, index) => (
                      <option key={index} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>

                  <select
                    id="filterPriceSelect"
                    className="Filter"
                    onChange={handleFilterPrice}
                  >
                    <option value="all">Precio</option>
                    <option value="ASC">Más Barato</option>
                    <option value="DES">Más Caro</option>
                  </select>
                </div>
              </div>

              <div className="CardContainer">
                {currentProducts.map((p, index) => (
                  <Card
                    key={index}
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    image={p.image}
                    description={p.description}
                    calification={p.calification}
                  />
                ))}
              </div>
            </div>
            <Paginado
              charactersPerPage={charactersPerPage}
              product={filteredProducts.length}
              paginado={paginado}
            />
          </>
        )}
      </div>
    </div>
  );
};
