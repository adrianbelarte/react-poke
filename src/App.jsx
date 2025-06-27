import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchTerm === '') {
      setPokemon(null);
      setError('');
      return;
    }

    const fetchPokemon = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Pokémon no encontrado');
            setPokemon(null);
          } else {
            throw new Error('Error en la API');
          }
        } else {
          const data = await response.json();
          setPokemon(data);
          setError('');
        }
      } catch (err) {
        setError('Error al buscar el Pokémon');
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    // Añadimos un pequeño delay para evitar peticiones excesivas
    const timer = setTimeout(() => {
      fetchPokemon();
    }, 500); 

    return () => clearTimeout(timer);

  }, [searchTerm]);

  return (
    <div className="app">
      <h1>Buscador de Pokémon</h1>
      <input
        type="text"
        placeholder="Escribe el nombre del Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {pokemon && (
        <div className="pokemon-result">
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          {/* Puedes agregar más datos si quieres */}
        </div>
      )}
    </div>
  );
}

export default App;
