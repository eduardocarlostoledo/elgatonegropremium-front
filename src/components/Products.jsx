import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import {
  filterByBrands,
  filterByPrice,
  filterByType,
  getAllBrands,
  getAllProducts,
  getAllProductsName,
  getAllTypes
} from "../redux/actions/ProductActions";
import Card from '../components/Card';
import Paginado from "./Paginado";

import "../styles/Products.css";

export const Products = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(20);
  const [name, setName] = useState('');

  const product = useSelector((state) => state.products);
  const brand = useSelector((state) => state.brands);
  const type = useSelector((state) => state.types);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllProducts());
        await dispatch(getAllBrands());
        await dispatch(getAllTypes());
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    setCurrentPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(getAllProductsName(name));
      setCurrentPage(1);
    } catch (error) {
      console.error("Error al buscar productos por nombre:", error.message);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await dispatch(getAllProducts());
    } catch (error) {
      console.error("Error al recargar productos:", error.message);
    }
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
    dispatch(filterByPrice(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="DivProducts">
      <div className="Products">
        <div className="DivCardsFilters">
          <div className="DivFilter">
            <button className="Todos" onClick={handleClick}>
              Recargar
            </button>
            <div className="SearchButton" id="InputB">
              <input
                className="InputB"
                type="text"
                placeholder="Buscar..."
                onChange={handleInputChange}
              />
              <button className="SubmitB" type="submit" onClick={handleSubmit}>
                <HiOutlineSearch className="icon" />
              </button>
            </div>
            <div className="ContainerFilters">
              <select
                id="filterBrandsSelect"
                className="Filter"
                onChange={handleFilterBrands}
              >
                <option value="All" defaultValue='default'>
                  Calidad
                </option>
                {brand.map((b, index) => (
                  <option key={index} type="reset" value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
              <select
                id="filterTypesSelect"
                className="Filter"
                onChange={handleFilterTypes}
              >
                <option value="All" defaultValue='default'>
                  Por tipos
                </option>
                {type.map((t, index) => (
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
                <option value="all" disabled={true}>
                  Por Precio
                </option>
                <option value="ASC">Mas Barato</option>
                <option value="DES">Mas Caro</option>
              </select>
            </div>
          </div>
          <div className="CardContainer">
            {product
              .slice(
                (currentPage - 1) * charactersPerPage,
                currentPage * charactersPerPage
              )
              .map((p, index) => (
                <Card
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  key={index}
                />
              ))}
          </div>
        </div>
        <Paginado
          charactersPerPage={charactersPerPage}
          product={product.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
};

// refactorizado
// import "../styles/Products.css";
// import { HiMagnifyingGlass } from 'react-icons/hi2';
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { useSelector, useNavigate } from "react-redux";
// import { filterByBrands, filterByPrice, filterByType, getAllBrands, getAllProducts, getAllProductsName, getAllTypes } from "../redux/actions/ProductActions";
// import Card from '../components/Card'

// import Paginado from "./Paginado";

// export const Products = () => {
//     const dispatch = useDispatch()
//     const product = useSelector((state) => state.products)
//     const brand = useSelector((state) => state.brands)
//     const type = useSelector((state) => state.types)
//     // const navigate = useNavigate();
    
//     useEffect(() => {
//       dispatch(getAllProducts())
//       dispatch(getAllBrands())
//       dispatch(getAllTypes())
//     },[dispatch]);

//     // useEffect(() => {
//     //     const isAuthenticated = localStorage.getItem('isAuthenticated');
//     //     if (isAuthenticated === "afuera") {
//     //       navigate('/login');
//     //     }
//     //   }, [navigate]);

//     const [currentPage, setCurrentPage] = useState(1)
//     const [charactersPerPage, ] = useState(20) //setCharactersPerPage en 20 para que muestre 20 productos por pagina
//     const indexOfLastCharacter = currentPage * charactersPerPage
//     const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
//     const currentProducts = product.slice(indexOfFirstCharacter, indexOfLastCharacter)

//     const paginado = (pageNumber) => {
//         setCurrentPage(pageNumber)
//     }

//              /* search */

//     const [name, setName] = useState('')
    
    
//     const handleInputChange = (e) => {
//         e.preventDefault();
//         setName(e.target.value);
//         console.log(name)
//         setCurrentPage(1);
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         dispatch(getAllProductsName(name))
//         setCurrentPage(1);
//     }

//     /* Click que trae todos los productos de nuevo */

//     const handleClick = (e) => {
//         e.preventDefault();
//         dispatch(getAllProducts());
//     }

//     const handleFilterBrands = (e) => {
//         dispatch(filterByBrands(e.target.value))
//         setCurrentPage(1)
//     }

//     /* Filtrado por Types */
//     const handleFilterTypes = (e) => {
//         dispatch(filterByType(e.target.value))
//         setCurrentPage(1) 
       
//     }

//     /* Filtrado por precio */

//     const [,setPrice] = useState('')
//     const handleFilterPrice = (e) => {
//         dispatch(filterByPrice(e.target.value));
//         setCurrentPage(1);
//         setPrice(`Price ${e.target.value}`)
//     }

//     return (
//         <div className="DivProducts">
//             <div className="Products">
//                 <div className="DivCardsFilters">
//                     <div className="DivFilter">                        
//                         <button className="Todos" onClick={(e) => handleClick(e)}> Recargar </button>
//                         <div className="SearchButton" id="InputB">
//                             <input className='InputB' type='text' placeholder="Buscar..." onChange={(e) => handleInputChange(e)}/> 
//                             <button className='SubmitB' type="submit" onClick={(e) => handleSubmit(e)}> < HiMagnifyingGlass className="icon"/></button>
//                         </div>
//                         <div className="ContainerFilters">
                            
//                             <select id="filterBrandsSelect" className="Filter" onChange={(e) => handleFilterBrands(e)}>
//                                 <option value="All" defaultValue='default'> Calidad</option>
//                                 {brand.map((b, index) => ( 
//                                     <option key={index} type="reset" value={b.name}>{b.name}</option>
//                                 ))}
//                             </select>
                            
//                             <select id="filterTypesSelect" className="Filter" onChange={(e) => handleFilterTypes(e)}>
//                                 <option value="All" defaultValue='default'>Por tipos</option>
//                                 {type.map((t, index) => {
//                                     return <option key={index} value={t.name}>{t.name}</option>
//                                 })} 
//                             </select>
                            
//                             <select id="filterPriceSelect" className="Filter" onChange={(e) => handleFilterPrice(e)}>
//                                 <option value="all" disabled={true}>Por Precio</option>
//                                 <option value="ASC">Mas Barato</option>
//                                 <option value="DES">Mas Caro</option>
//                             </select>
//                         </div>
//                     </div>
                    
                
//                     <div className="CardContainer">
//                         {currentProducts?.map((p, index) => (
//                             <Card
//                             id={p.id}
//                             name={p.name}
//                             price={p.price}
//                             image={p.image}
//                             key={index}
//                         />
//                         ))}
//                     </div>
                    
//                 </div>
//                 <Paginado
//                     charactersPerPage={charactersPerPage}
//                     product={product.length}
//                     paginado={paginado}

//                 />
//             </div>
//         </div>
//     );
// };