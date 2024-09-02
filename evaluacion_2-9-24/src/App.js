import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [termino, setTermino] = useState([]);
  const [term, setTerm] = useState("");
  const [consejo, setConsejo] = useState("");

  const getConsejo = () => {
    fetch(`https://api.adviceslip.com/advice`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        console.log(data);
        setConsejo(data.slip.advice);
      })
      .catch(error => console.error(error));
  };
  const getTermino = () => {
    fetch(`	https://api.adviceslip.com/advice/search/${term}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        console.log(data);
        setTermino(data.slips);
      })
      .catch(error => console.error(error));
  };
  useEffect(getConsejo, []);

  const handleTermChange = event => setTerm(event.target.value);

  return (
    <main>
      <h1>Evaluación React - Requests</h1>
      <h1>Consejos de vida</h1>

      <div>
        <h2>Obtener un consejo aleatorio</h2>
        <button onClick={getConsejo}>Obtener</button>
        <p className="result-box">{consejo}</p>
      </div>

      <div>
        <h2>Buscar un consejo</h2>
        <input type="text" value={term} onChange={handleTermChange} />
        <button onClick={getTermino}>Enviar</button>
        <h3>Resultados de búsqueda:</h3>
        <p className="result-box"></p>
        <ul>
          {termino.map((consejo, index) => (
            <li key={index}>{consejo.slips.advice}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
