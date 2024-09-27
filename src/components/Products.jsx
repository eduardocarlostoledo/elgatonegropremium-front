import "../styles/Products.css";
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { filterByBrands, filterByPrice, filterByType, getAllBrands, getAllProducts, getAllProductsName, getAllTypes } from "../redux/actions/ProductActions";
import Card from '../components/Card';
import Paginado from "./Paginado";

import "../styles/Products.css";

export const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const brands = useSelector((state) => state.brands);
    const types = useSelector((state) => state.types);

    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 20;
    const [name, setName] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllBrands());
        dispatch(getAllTypes());
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const paginado = (pageNumber) => setCurrentPage(pageNumber);

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

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
            if (e.target.value === 'ASC') return a.price - b.price;
            return b.price - a.price;
        });
        setFilteredProducts(sortedProducts);
        setCurrentPage(1);
    };

    const handleClick = () => {
        dispatch(getAllProducts());
        setName('');
    };

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstCharacter, indexOfLastCharacter);

    return (
        <div className="DivProducts">
            <div className="Products">
                <div className="DivCardsFilters">
                    <div className="DivFilter">                        
                        <button className="Todos" onClick={handleClick}>Recargar</button>
                        <div className="SearchButton" id="InputB">
                            <input 
                                className="InputB" 
                                type="text" 
                                placeholder="Buscar..." 
                                value={name}
                                onChange={handleInputChange}
                            /> 
                            <button className="SubmitB" type="submit" onClick={handleSubmit}>
                                <HiMagnifyingGlass className="icon" />
                            </button>
                        </div>

                    </div>

                    <div className="ContainerFilters">
                            <select id="filterBrandsSelect" className="Filter" onChange={handleFilterBrands}>
                                <option value="All">Marcas</option>
                                {brands.map((b, index) => (
                                    <option key={index} value={b.name}>{b.name}</option>
                                ))}
                            </select>
                            
                            <select id="filterTypesSelect" className="Filter" onChange={handleFilterTypes}>
                                <option value="All">Tipos</option>
                                {types.map((t, index) => (
                                    <option key={index} value={t.name}>{t.name}</option>
                                ))}
                            </select>
                            
                            <select id="filterPriceSelect" className="Filter" onChange={handleFilterPrice}>
                                <option value="all">Precio</option>
                                <option value="ASC">Más Barato</option>
                                <option value="DES">Más Caro</option>
                            </select>
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
            </div>
        </div>
    );
};

// import "../styles/Products.css";
// import { HiMagnifyingGlass } from 'react-icons/hi2';
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { useSelector, useNavigate } from "react-redux";
// import { filterByBrands, filterByPrice, filterByType, getAllBrands, getAllProducts, getAllProductsName, getAllTypes } from "../redux/actions/ProductActions";
// import Card from '../components/Card'
// import Paginado from "./Paginado";

// export const Products = () => {
//     const product = useSelector((state) => state.products)
//     const brand = useSelector((state) => state.brands)
//     const type = useSelector((state) => state.types)
//     const dispatch = useDispatch()
//     const [currentPage, setCurrentPage] = useState(1)
//     const [charactersPerPage, ] = useState(20) //setCharactersPerPage en 20 para que muestre 20 productos por pagina
//     const [filtros1y2, setFiltros1y2] = useState(true)
//     const [filtroPrecio, setFiltroPrecio] = useState(false)
//     const [productsByPrice, setProductsByPrice] = useState([""])
    
//     useEffect(() => {
//       dispatch(getAllProducts())
//       dispatch(getAllBrands())
//       dispatch(getAllTypes())
//     },[dispatch]);

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

//     const [Price, setPrice] = useState('')

//     const handleFilterPrice = (e) => {        
//         setFiltros1y2=false
//         setFiltroPrecio=true
//         productsByPrice=product.sort((a,b) =>( a.price-b.price))
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
//                                 <option value="All" defaultValue='default'>Marcas</option>
//                                 {brand.map((b, index) => ( 
//                                     <option key={index} type="reset" value={b.name}>{b.name}</option>
//                                 ))}
//                             </select>
                            
//                             <select id="filterTypesSelect" className="Filter" onChange={(e) => handleFilterTypes(e)}>
//                                 <option value="All" defaultValue='default'>Tipos</option>
//                                 {type.map((t, index) => {
//                                     return <option key={index} value={t.name}>{t.name}</option>
//                                 })} 
//                             </select>
                            
//                             <select id="filterPriceSelect" className="Filter" onChange={(e) => handleFilterPrice(e)}>
//                                 <option value="all" defaultValue="default">Precio</option>
//                                 <option value="ASC">Mas Barato</option>
//                                 <option value="DES">Mas Caro</option>
//                             </select>
//                         </div>
//                     </div>
                    
                
//                     { filtros1y2 && <div className="CardContainer">
//                         {currentProducts?.map((p, index) => (
//                             <Card
//                             id={p.id}
//                             name={p.name}
//                             price={p.price}
//                             image={p.image}
//                             key={index}
//                         />
//                         ))}
//                     </div>} : {
//                         filtroPrecio &&  {productsByPrice.map((p, index) => (
//                             <Card
//                             id={p.id}
//                             name={p.name}
//                             price={p.price}
//                             image={p.image}
//                             key={index}
//                         />
//                         ))}
//                     }
                    
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