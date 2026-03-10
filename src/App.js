
//import video from './ES_LogoAnimation.mp4';
import './App.css';
import { useState } from 'react';
import Layout from "./components/Layout";

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
  const [introFinished, setIntroFinished] = useState(localStorage.getItem("introPlayed") === "true");
  const [start, setStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [answers, setAnswers] = useState([]);



  if (!introFinished) {
    return (
      <video
        autoPlay
        muted
        className="background-video"
        onEnded={() => {
          localStorage.setItem("introPlayed", "true");
          setIntroFinished(true);
        }}
      >
        <source src="/ES_LogoAnimation.mp4" type="video/mp4" />
      </video>
    );
  }

  if (!start) {
    return (
      <Layout>
        <div className="content-box">
          <h1>Tere tulemast!</h1>
          
          <div className="answer-result">
            <p data-size="large">Testi oma teadmisi.</p>
          </div>

          <button onClick={() => setStart(true)} data-type="primary" data-size="default">
            Alusta
          </button>
        </div>
      </Layout>
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
      <Layout>
        <div className="content-box">
          <h2>Viktoriin on lõppenud!</h2>

          <h2>Sinu skoor on: {score} / {questions.length}</h2>

          <div className="answer-result">
            <p data-size="large">{message}</p>
          </div>
          {/* <h3>Tulemused</h3> */}

          <table className="results-table" border="1">
            <thead>
              <tr>
                <th>Küsimus</th>
                <th>Õige vastus</th>
                <th>Sinu vastus</th>
                <th>Tulemus</th>
              </tr>
            </thead>

            <tbody>
              {answers.map((a) => (
                <tr key={a.id}>
                  <td><p data-size="medium">{a.question}</p></td>
                  <td><p data-size="medium">{a.correctAnswer}</p></td>
                  <td><p data-size="medium">{a.selected}</p></td>
                  <td className={a.correct ? "result-correct" : "result-wrong"}>
                    <p data-size="medium">{a.correct ? "Õige" : "Vale"}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </Layout>

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
        id: question.id,
        question: question.question,
        selected: option,
        correctAnswer: question.correct,
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
    <Layout>
      <div className="content-box">
        <h1>{question.question}</h1>
        {question.options.map((option) => {

          let buttonClass = "answer-button";

          if (showFeedback) {
            if (option === question.correct) {
              buttonClass += " correct";
            } else {
              buttonClass += " wrong";
            }
          }

          return (
            <button
              className={buttonClass}
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              data-type={showFeedback ? "disabled" : "secondary"}
              data-size="default"
            >
              <h3>{option}</h3>
            </button>
          );
        })}

        {showFeedback && (
          <div className="answer-result">
            {selectedAnswer === question.correct ? (
              <p data-size="large">Õige vastus!</p>
            ) : (
              <p data-size="large">Vale! Õige vastus on: {question.correct}</p>
            )}

            <button onClick={nextQuestion} data-type="primary" data-size="default">
              {currentQuestion === questions.length - 1
                ? "Lõpeta viktoriin"
                : "Järgmine küsimus"
              }
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
