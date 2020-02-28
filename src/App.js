import React, { useState, useEffect } from 'react';


export default function App() {
  const [repositories, setRepositories] = useState([])
  const [location, setLocation] = useState({})

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/diego3g/repos')
    const data = await response.json()

    setRepositories(data)
  }, [])

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `Você tem ${filtered.length} favoritos`
  }, [repositories])

  useEffect(() => {
    navigator.geolocation.watchPosition(handlePositionReceived)
  }, [])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRepositories(newRepositories)
  }

  function handlePositionReceived({ coords }){
    const { latitude, longitude } = coords
    
    setLocation({ latitude, longitude })
  }

  return (
    <>
      <h2>Repositórios</h2>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <span>{repo.name} </span>
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>

      <div>
        <h2>Localização</h2>
        <p>Latitude: {location.latitude}</p>
        <p>Longitude: {location.longitude}</p>
      </div>
    </>
  )
}