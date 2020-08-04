import React, { useMemo } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroesById'

const HeroScreen = ({history}) => {

  // Existe un hook que extrae los parametros que vienen por url, unico y exclusivo de react router.
  const {heroeId} = useParams()


  // Forma nueva, si detecta un cambio en el publisher, vuelve y llama ala funcion para actualizar la informacion. (Revisar HEROLIST.JS)
  const hero= useMemo(() => getHeroesById(heroeId), [heroeId])

  // Forma antigua que cada vez que renderice de nuevo, vuelve a disparar la funcion. 
  // const hero= getHeroesById(heroeId);

  // En caso tal que lo que ingrese el usuario en la direccion web no sea valido (escriba una direccion que no exista), vamos a ver que como no retorno ningun hero, inmediatamente lo vamos a redireccionar a la pagina web principal. Es practicamente lo mismo que se hizo en el DashBoard con el redirect.
  if (!hero) { return <Redirect to="/"/> }

  const { 
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
  }=hero;

  // Separe los nombres por coma para mostrarlos en forma de lista
  const chara= characters.split(",")

  // Como habiamos mencionado en el componente "login", el history es un prop por defecto que contiene el router dom. En esta funcion lo que hacemos es comprobar que exista un historial cosa, que si apretamos el boton return, no nos vaya a sacar de la pagina, sino que nos lleve a la pagina ppal de la pagina (valga la redundancia).
  const handleReturn= () => {
    if (history.length <= 2) {
      history.push("/")
    } else {
      history.goBack()
    }
  }
  

  return (
    <div className="row mt-5">
      
      <div className="col-4">
        <img 
          alt={superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
          src={`../assets/heroes/${heroeId}.jpg`}
        ></img>
      </div>

      <div className="col-8">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>Alterego:</b> {alter_ego}</li>
          <li className="list-group-item"><b>Publisher:</b> {publisher}</li>
          <li className="list-group-item"><b>First appearance:</b> {first_appearance}</li>

        </ul>

        <h5>Characters</h5>

        <ul>
            {/* Me costo medio huevo saber como imprimir una lista con map, pero aquí esta !!!! */}
          { chara.map((pj,idx) => (<li key={idx}>{pj}</li>))}
        </ul>


        <button 
          className="btn btn-outline-info mt-4"
          onClick={handleReturn}
        >Return</button>
      </div>    
    
    
    
    </div>
  )
}

export default HeroScreen
