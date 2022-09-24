import React, { useState, useEffect } from "react";

export default function App() {
  const [repos, setRepos] = useState([]);
  const [filtredRepos, setFiltredRepos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchRepositories() {
      const response = await fetch('https://api.github.com/usersjeremarques/repos');
      const data = await response.json();
      setRepos(data);
    };
    fetchRepositories();
  }, []);

  useEffect(() => {
    setFiltredRepos(repos.filter(repo => repo.name.includes(search)))
  }, [search]);

  return (
    <div className="App">
      <input type="text" placeholder="Buscar" onChange={e => setSearch(e.target.value)} />
      {
        search.length > 0 ? (
          <ul>
            {
              filtredRepos.map(repo => {
                return (
                  <li key={repo.name}>{ repo.name }</li>
                )
              }) 
            }
          </ul>
        ) : (
          <ul>
          {
            repos.map(repo => {
              return (
                <li key={repo.name}>{ repo.name }</li>
              )
            })
          }
        </ul>
        )
      }
      {
        // Verifica se o search é maior que 0, pois 0 é false, se for true continua, e se a quantidade de filtredRepos for 0 ele retorna true pois um número diferente de 0 é true e 0 é false, sendo assim todos true ele retorna a mensage de nunhum dado encontrado, e se uma das condições for false o alert fica vazio.
        search.length && !filtredRepos.length ? <span className="alert">Nenhum resultado encontrado</span> : <span className="alert"></span>
      }
      
    </div>
  )
};
