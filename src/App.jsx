import React, { useEffect, useState } from "react";
import './App.css';

export default function App() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [search, updateSearch] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/users/jeremarques/repos')
      .then(response => response.json())
      .then(data => setRepos(data));
  }, []);

  useEffect(() => {
    setFilteredRepos(repos.filter(repo => repo.name.includes(search)))
  }, [search]);

  useEffect(() => {
    document.title = `${repos.length} Repositórios encontrados`
  }, [repos])

  function handleModalSearch() {
    if (!search.length || search.length && !filteredRepos.length) {
      return
    } else {
      setFilteredRepos([]);
    };
  };

  return (
    <div className="App" onClick={handleModalSearch}>
      <input className="ipt-repos" onChange={ e => updateSearch(e.target.value) } type="text" placeholder="Search" />
      <div className="filtered-repos">
        {
          search.length ? (
            filteredRepos.map(filteredRepo => {
              return (
                <li key={filteredRepo.full_name}><a href={'https://github.com/' + filteredRepo.full_name} target='_blank' className="filtered-repo">{ filteredRepo.name }</a></li>
              )
            })
          ) : null
        }
      </div>
      <ul className="repositories">
        {
          repos.map(repo => {
            return (
              <li key={ repo.name }>
                { repo.name }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
};
