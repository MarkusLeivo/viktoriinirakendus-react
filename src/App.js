import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "Mis on Eesti pealinn?",
    options: ["Tallinn", "Tartu", "Narva"],
    correct: "Tallinn",
  },
  {
    id: 2,
    question: "Mis on Eesti suurim saar?",
    options: ["Vormsi", "Hiiumaa", "Saaremaa"],
    correct: "Saaremaa",
  },
  {
    id :3,
    question: "Mitu päeva on nädalas?",
    options: ["5", "7", "10"],
    correct: "7",
  },
];

function App() {
  const [start, setStart] = useState(false);

  if (!start) {
    return (
      <div>
        <h1>Tere tulemast!</h1>
        <p>Testi oma teadmisi.</p>

        <button onClick={() => setStart(true)}>
          Alusta
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Viktoriin</h1>

    </div>
  );
}

export default App;
