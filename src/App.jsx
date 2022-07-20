import { useState } from 'react'
import './App.css'

function App() {
  const [animals, setAnimals] = useState([]);

  // handle fetch data from server
  const search = async (q) => {
    const response = await fetch(
      "http:localhost:2000?" + new URLSearchParams({q})
    );
    const data = await response.json();
    setAnimals(data);
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

export default App
