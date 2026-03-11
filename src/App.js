
//import video from './ES_LogoAnimation.mp4';
import './App.css';
import { useState, useEffect} from 'react';
import Layout from "./components/Layout";

const questions = [
  {
    id: 1,
    question: "Mis kuupäeva peetakse Eesti statistika sünnipäevaks?",
    options: ["10. mai 1937", "20. august 1991", "1. märts 1921"],
    correct: "1. märts 1921",
  },
  {
    id: 2,
    question: "Kus asub Statistikaameti peakontor?",
    options: ["Tallinnas", "Tartus", "Pärnus"],
    correct: "Tallinnas",
  },
  {
    id :3,
    question: "Mis aastal asutati Statistikaameti eelkäija Riigi Statistika Keskbüroo?",
    options: ["1921", "1922", "1925"],
    correct: "1921",
  },
  {
    id :4,
    question: "Millise saavutuse eest pälvis Statistikaamet esikoha riigikantselei konkursil „Parim uuendus 2006“?",
    options: ["Veebilehe www.stat.ee avamine", "Kaardirakenduse loomine", "Elektroonilise andmeedastuskanali eSTAT kasutusele võtmine"],
    correct: "Elektroonilise andmeedastuskanali eSTAT kasutusele võtmine",
  },
  {
    id :5,
    question: "Mis aastal tegi Statistikaamet statistika andmebaasi kättesaadavaks tarbijatele?",
    options: ["1999", "2001", "2004"],
    correct: "2001",
  },
  {
    id :6,
    question: "Millised on Statistikaameti kolm peamist põhiväärtust?",
    options: ["Usaldusväärsus, koostöö ja uuenduslikkus", "Usaldusväärsus, läbipaistvus ja konfidentsiaalsus", "Täpsus, kiirus ja kontroll"],
    correct: "Usaldusväärsus, koostöö ja uuenduslikkus",
  },
  {
    id :7,
    question: "Millised on Statistikaameti kolm peamist põhimõtet?",
    options: ["Täpsus, kliendikesksus ja kontroll", "Innovatsioon, teenuspõhisus ja kliendikesksus", "Kliendikesksus, teenuspõhisus ja keskkonnasäästlikkus"],
    correct: "Kliendikesksus, teenuspõhisus ja keskkonnasäästlikkus",
  },
  {
    id :8,
    question: "Millise blogisarjaga alustas Statistikaamet 2023. aastal?",
    options: ["Andmeblogi", "Andmekool", "Andmelabor"],
    correct: "Andmekool",
  },
  {
    id :9,
    question: "Kellelt sai Statistikaamet 2024. aastal tunnustuse DGINS konverentsi korraldamise eest?",
    options: ["Tartu linnalt", "Euroopa Liidult", "Tallinna linnalt"],
    correct: "Tallinna linnalt",
  },
  {
    id :10,
    question: "Millal tähistas Statistikaamet Eesti statistika 100. aastapäeva?",
    options: ["2019", "2021", "2022"],
    correct: "2021",
  }
];

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function App() {
  const [introFinished, setIntroFinished] = useState(localStorage.getItem("introPlayed") === "true");
  const [start, setStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [shuffledQuestions] = useState(() => shuffleArray(questions.map(q => ({...q, options: shuffleArray(q.options)}))));


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

    if (score === shuffledQuestions.length) {
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

          <h2>Sinu skoor on: {score} / {shuffledQuestions.length}</h2>

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

  const question = shuffledQuestions[currentQuestion];

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
  if (currentQuestion === shuffledQuestions.length - 1) {
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
              key={option + question.id}
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
              {currentQuestion === shuffledQuestions.length - 1
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
