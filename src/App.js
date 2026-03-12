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
    options: ["Veebilehe www.stat.ee avamine", "Kaardirakenduse loomine", "Elektroonilise andmeedastuskanali eSTAT kasutuselevõtmine"],
    correct: "Elektroonilise andmeedastuskanali eSTAT kasutuselevõtmine",
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
  //const [introFinished, setIntroFinished] = useState(localStorage.getItem("introPlayed") === "true");
  const [start, setStart] = useState(localStorage.getItem("quizStart") === "true");
  const [currentQuestion, setCurrentQuestion] = useState(Number(localStorage.getItem("quizCurrent")) || 0);
  const [selectedAnswer, setSelectedAnswer] = useState(localStorage.getItem("quizSelected") || null);
  const [showFeedback, setShowFeedback] = useState(localStorage.getItem("quizFeedback") === "true");
  const [score, setScore] = useState(Number(localStorage.getItem("quizScore")) || 0);
  const [finish, setFinish] = useState(localStorage.getItem("quizFinish") === "true");
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem("quizAnswers")) || []);

  const [shuffledQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem("quizQuestions");

    if (savedQuestions) {
      return JSON.parse(savedQuestions);
    }

    const shuffled = shuffleArray(
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

  // if (!introFinished) {
  //   return (
  //     <video
  //       autoPlay
  //       muted
  //       className="background-video"
  //       onEnded={() => {
  //         localStorage.setItem("introPlayed", "true");
  //         setIntroFinished(true);
  //       }}
  //     >
  //       <source src="/ES_LogoAnimation.mp4" type="video/mp4" />
  //     </video>
  //   );
  // }

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
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            data-type="primary"
            data-size="default"
          >
            Alusta uuesti
          </button>

          {/* <h3>Tulemused</h3> */}

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
        <p data-size="medium">Küsimus {currentQuestion + 1} / {shuffledQuestions.length}</p>
        <h2 data-testid="question">{question.question}</h2>
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

        {showFeedback && (
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
