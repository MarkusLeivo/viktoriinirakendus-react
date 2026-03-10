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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [answers, setAnswers] = useState([]);


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

  if (finish) {
    let message = "";

    if (score === questions.length) {
      message = "Täiuslik tulemus! Tunned Eestit väga hästi!";
    } else if (score >= 2) {
      message = "Peaaegu kõik õige! Tubli töö!";
    } else {
      message = "Päris kõike veel ei tea... Võiksid uuesti proovida!";
    }

    return (
      <div>
        <h1>Viktoriin on lõppenud!</h1>

        <h2>Sinu skoor: {score} / {questions.length}</h2>

        <p>{message}</p>

        <h3>Tulemused</h3>

        <table border="1">
          <thead>
            <tr>
              <th>Küsimus</th>
              <th>Sinu vastus</th>
              <th>Tulemus</th>
            </tr>
          </thead>

          <tbody>
            {answers.map((a, index) => (
              <tr key={index}>
                <td>{a.question}</td>
                <td>{a.selected}</td>
                <td>{a.correct ? "Õige" : "Vale"}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    );
  }


  const question = questions[currentQuestion];

  function handleAnswer(option) {
    setSelectedAnswer(option);
    setShowFeedback(true);

    const isCorrect = option === question.correct;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([
      ...answers,
      {
        question: question.question,
        selected: option,
        correct: isCorrect
      }
    ]);
  }

  function nextQuestion() {
  if (currentQuestion === questions.length - 1) {
    setFinish(true);
    return;
  }

    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestion(currentQuestion + 1);
  }

  return (
    <div>
      <h2>{question.question}</h2>
      {question.options.map((option) => (
        <button
          key={option}
          onClick={() => handleAnswer(option)}
          disabled={showFeedback}
          >
            {option}
          </button>
      ))}

      {showFeedback && (
        <div>
          {selectedAnswer === question.correct ? (
            <p>Õige vastus!</p>
          ) : (
            <p>Vale! Õige vastus oli: {question.correct}</p>
          )}

          <button onClick={nextQuestion}>
            {currentQuestion === questions.length - 1
              ? "Lõpeta viktoriin"
              : "Järgmine küsimus"
            }
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
