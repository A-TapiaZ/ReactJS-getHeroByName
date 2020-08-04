import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import HeroCard from './HeroCard'

export const HeroList = ({publisher}) => {

  // Si hiciera cualquier cosa, que volviera a disparar mi render, pero la informacion no cambiara, se volveria a ejecutar la funcion paara obtener la informacion de los heroes y no cambiaria nada, respecto a la informacion que trae la funcion. Para evitar que se vuelva a hacer un llamado a la funcion que trae la info, sin tener la necesidad, pódemos usar el useMemo, el cual dependiendo de la "subscripcion" evita que se vuelva a ejecutar nuestra funcion, si es que no detecta un cambio.

  // Forma nueva, si detecta un cambio en el publisher, vuelve y llama a la funcion para actualizar la informacion.
  const heroes= useMemo(() => getHeroesByPublisher(publisher), [publisher])

  // Forma antigua que cada vez que renderice de nuevo, vuelve a disparar la funcion. 
  // const heroes = getHeroesByPublisher(publisher)
   
  return (
    <div className="card-columns animate__animated animate__fadeIn">
        {
          heroes.map(hero => (
                        
            <HeroCard
              key={hero.id}
              // No se porque, pero pasarle las propiedades de hero lo tengo que enviar asi
              {...hero}
            /> 

          ))
        }
    </div >
  ) 
}
