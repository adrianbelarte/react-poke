import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [namePokemon, setNamePokemon] = useState('')
  const [resultPokemon, setResultPokemon] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getPokemon = async (pokemon) => {
    
    try{
      setIsLoading(true)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

      if(!res.ok) {
        throw new Error(`Pokemon no encontrado ${res.status}`)
      }

      const data = await res.json()
      setResultPokemon(data)

    }catch(err){
      setError(err.message)
      console.error(err)

    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
      setError(null)
      const trimName = namePokemon.trim()
      if(!trimName){
        setResultPokemon(null)
        setError(null)
        return
      }

      const delay = setTimeout(() => {
        getPokemon(namePokemon)
      }, 500)
      
      return () => clearTimeout(delay)

    }, [namePokemon])

  return(
   <>
      <input
        type="text"
        placeholder="nombre pokemon"
        value={namePokemon}
        onChange={e => setNamePokemon(e.target.value)}
      />
      {isLoading && <div className='spinner'></div>}
      {error && <p>{error}</p>}

      {resultPokemon && (
        <>
          <h2>{resultPokemon.name}</h2>
          <img src={resultPokemon.sprites?.front_default} alt={resultPokemon.name} />
        </>
      )}
    </>
  );
}

export default App;


