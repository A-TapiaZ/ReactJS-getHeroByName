import React from 'react'
import queryString from 'query-string'
import HeroCard from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';

const SearchScreen = ({history}) => {

  const location = useLocation();
  // instalamos la libreria queryString de npm, la cual toma la direccion web y nos retorna un objeto que contiene las query que se encuentren en la direccion web busqueda
  // console.log(queryString.parse(location.search));
  
  //ponemos " ='' " para que su valor sea por defecto '' (por defecto retorna undefined y nos daria problemas), en caso de que la direccion web no contenga queries.  
  const {q=''}= queryString.parse(location.search);

  
  const [formValues, handleInputChange]= useForm({
    // pasamos como valor por defecto lo que sea que venga en la query
    searchText:q
  });
  
  const {searchText} = formValues;

  // Esta instruccion la usamos para que cada vez que ingrese una letra, el componente no se renderice de nuevo. La verdad a mi me gusta que cada vez que vaya escribiendo una letra este se vaya filtrando en tiempo real, por eso lo dejo así, pero si quiero que mi busqueda sea mas eficiente deberia usar useMemo.
  // useMemo(() => getHeroesByName(q), [q])
  // Llamamos la funcion que creamos para filtrar por lo que sea que busquen en el buscador
  const heroesFiltered= getHeroesByName(searchText);
  
  const handleSearch= (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  } 
  
  return (
    <div>
      <h1>Search Screen</h1>
      <hr/>

      <div className= "row" >
        
        <div className= "col-5">
          <h4>Search Form</h4>
          <hr/>

          <form onSubmit={handleSearch}>

            <input 
              type="text"
              placeholder="Find ur hero"
              className="form-control"
              name="searchText"
              value={searchText}
              onChange={handleInputChange}
              />

            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary" 
            >
              Search 
            </button>

          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>

          {heroesFiltered.map(hero => (
            <HeroCard
              key={hero.id}
              {...hero}
            />
          )
          
          )}

        </div>

      </div>
    </div>
  )
}

export default SearchScreen
