import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [animals, setAnimals] = useState([]);

  // cache results in browser
  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);
  

  // handle fetch data from server
  const search = async (q) => {
    const response = await fetch(
      "http://localhost:2000?" + new URLSearchParams({q})
    );
    const data = await response.json();
    setAnimals(data);
    
    localStorage.setItem('lastQuery', q);
  }

  return (
    <main className="App">
      <h1>Search Animal</h1>

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal} />
        ))}

        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  )
}

// Search UI component
function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

export default App
