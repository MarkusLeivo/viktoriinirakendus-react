import './App.css';
import { useState, useEffect } from 'react';
import Layout from "./components/Layout";
import { questions } from "./data/questions";
import { shuffleArray } from './utils/shuffle';


function App() {
  const [start, setStart] = useState(localStorage.getItem("quizStart") === "true");
  const [currentQuestion, setCurrentQuestion] = useState(Number(localStorage.getItem("quizCurrent")) || 0);
  const [selectedAnswer, setSelectedAnswer] = useState(localStorage.getItem("quizSelected") || null);
  const [showFeedback, setShowFeedback] = useState(localStorage.getItem("quizFeedback") === "true");
  const [score, setScore] = useState(Number(localStorage.getItem("quizScore")) || 0);
  const [finish, setFinish] = useState(localStorage.getItem("quizFinish") === "true");
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem("quizAnswers")) || []);

  const [shuffledQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem("quizQuestions");

    if (savedQuestions) {  // Kui lokaalselt on juba kindel küsimuste järjekord olemas, siis tagastab need. Järjekord jääb samaks ka peale refreshi.
      return JSON.parse(savedQuestions);
    }

    const shuffled = shuffleArray(  // Kui lokaalselt küsimused puuduvad, siis tekitab uue juhusliku järjestuse nii küsimustele kui vastusevariantidele.
      questions.map(q => ({
        ...q,
        options: shuffleArray(q.options)
      }))
    );

    localStorage.setItem("quizQuestions", JSON.stringify(shuffled));

    return shuffled;
  });


  useEffect(() => {
    localStorage.setItem("quizStart", start);
    localStorage.setItem("quizCurrent", currentQuestion);
    localStorage.setItem("quizScore", score);
    localStorage.setItem("quizFinish", finish);
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    localStorage.setItem("quizSelected", selectedAnswer);
    localStorage.setItem("quizFeedback", showFeedback);
  }, [start, currentQuestion, score, finish, answers, selectedAnswer, showFeedback]);

  if (!start) {
    return (
      <Layout>
        <div className="content-box">
          <h2>Tere tulemast Statistikaameti teemalisse viktoriini!</h2>

          <div className="answer-result">
            <p data-size="large">Pane proovile oma teadmised Eesti statistika ja Statistikaameti ajaloo kohta.
              <br></br>
              Viktoriin koosneb kümnest küsimusest ning iga küsimuse juures on kolm vastusevarianti.</p>
            <p data-size="large">Kas oled valmis?</p>
          </div>

          <button data-testid="start-button" onClick={() => setStart(true)} data-type="primary" data-size="default">
            Alusta
          </button>
        </div>

      </Layout>
    );
  }

  if (finish) {
    let message = "";

    if (score === 10) {
      message = "Täiuslik tulemus! Tunned Statistikaameti ajalugu suurepäraselt.";
    } else if (score >= 8) {
      message = "Väga hea tulemus! Sul on Statistikaameti kohta tugevad teadmised.";
    } else if (score >= 5) {
      message = "Hea töö! On veel mõned asjad, mida tasub järgi uurida, aga oled õigel teel. Proovi uuesti!";
    } else {
      message = "Tundub, et Statistikaameti ajalooga tasub veel tutvuda. Proovi uuesti!";
    }

    return (
      <Layout>
        <div className="content-box">
          <h2>Viktoriin on lõppenud!</h2>

          <h2 data-testid="score">Sinu skoor on: {score} / {shuffledQuestions.length}</h2>

          <div className="answer-result">
            <p data-size="large">{message}</p>
          </div>
          <button
            onClick={() => { // Uuesti alustamise korral tühjendab lokaalsed andmed (sealhulgas valitud vastused ja küsimuste järjekorra).
              localStorage.clear();
              window.location.reload();
            }}
            data-type="primary"
            data-size="default"
          >
            Alusta uuesti
          </button>

          <table data-testid="results-table" className="results-table" border="1">
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
    setSelectedAnswer(option);  // Salvestab kasutaja valitud vastuse.
    setShowFeedback(true);  // Näitab küsimuse tagasisidet.

    const isCorrect = option === question.correct;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([  // Salvestab küsimused ja vastused, et hiljem oleks võimalik neid tulemuste tabelis kuvada.
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
    if (currentQuestion === shuffledQuestions.length - 1) {  // Kontrollib, kas tegu on viimase küsimusega, et lõpetada viktoriin.
      setFinish(true);
      return;
    }

    setSelectedAnswer(null); //Vastasel juhul nullib valitud vastuse/küsimuse, kaotab feedbacki ja liigub järgmise juurde.
    setShowFeedback(false);
    setCurrentQuestion(currentQuestion + 1);
  }

  return (
    <Layout>
      <div className="content-box">
        <p data-size="medium">Küsimus {currentQuestion + 1} / {shuffledQuestions.length}</p>
        <h2 data-testid="question">{question.question}</h2>
        {question.options.map(option => {  // Loob nupud kõigile vastusevariantidele.

          let buttonClass = "answer-button";

          if (showFeedback) {
            if (option === question.correct) {
              buttonClass += " correct";
            } else {
              buttonClass += " wrong";
            }
          }

          return (
            <button className={buttonClass}
              data-testid="answer-button"
              data-correct={option === question.correct}
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

        {showFeedback && (   // Kuvab peale küsimusele vastamist konkreetse küsimuse tagasiside.
          <div className="answer-result" data-testid="feedback">
            {selectedAnswer === question.correct ? (
              <p data-size="large">Õige vastus!</p>
            ) : (
              <p data-size="large">Vale vastus! <br></br> Õige vastus on: {question.correct}</p>
            )}

            <button data-testid="next-button" onClick={nextQuestion} data-type="primary" data-size="default">
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
