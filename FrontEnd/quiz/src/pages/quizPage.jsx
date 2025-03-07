import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Quiz() {
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [answered, setAnswered] = useState(false);
  let [selectedAnswer, setSelectedAnswer] = useState(null);
  let [score, setScore] = useState(0);
  let [showScore, setShowScore] = useState(false);
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState({});
  let [submissionMessage, setSubmissionMessage] = useState(null); // New state
  let location = useLocation();

  let { value, user } = location.state || {};

  useEffect(() => {
    fetch(`http://localhost:5000/api/${value}`)
      .then((res) => res.json())
      .then((res) => {
        setQuestions(res);
      })
      .catch((err) => {
        console.log("Error Occurred", err);
      });
  }, []);

  let handleAnswerOption = (index, isCorrect) => {
    let newAnswers = { ...answers, [currentQuestion]: { index, isCorrect } };
    setAnswers(newAnswers);
    setSelectedAnswer(index);
    setAnswered(true);

    let newScore = Object.values(newAnswers).reduce(
      (acc, answer) => (answer.isCorrect ? acc + 1 : acc),
      0
    );
    setScore(newScore);
  };

  let nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
      submitScore(); // Call submitScore when the quiz ends
    }
    setSelectedAnswer(answers[currentQuestion + 1]?.index ?? null);
    setAnswered(answers.hasOwnProperty(currentQuestion + 1));
  };

  let prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]?.index ?? null);
      setAnswered(answers.hasOwnProperty(currentQuestion - 1));
    }
  };

  // Function to submit the score to the backend
  let submitScore = () => {
    let payload = {
      username: user,
      score: score,
      topic: value,
    };

    fetch("http://localhost:5000/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmissionMessage(data.message);
      })
      .catch((error) => {
        console.error("Error submitting score:", error);
        setSubmissionMessage("Error saving score");
      });
  };

  return (
    <>
      {questions.length > 0 ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <div className="card shadow-lg">
              <div className="card-header text-center fw-bold fs-4 bg-light">
                Quiz App
              </div>
              <div className="card-body">
                {showScore ? (
                  <div className="text-center">
                    <h4>You Scored {score} out of {questions.length}</h4>
                    {submissionMessage && <p className="text-success">{submissionMessage}</p>}
                  </div>
                ) : (
                  <div>
                    {/* Progress Bar */}
                    <div className="progress mb-3">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{
                          width: `${((currentQuestion + 1) / questions.length) * 100}%`
                        }}
                      ></div>
                    </div>

                    <h5 className="mb-3">
                      {questions[currentQuestion].questionText}
                    </h5>
                    {questions[currentQuestion].answerOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerOption(index, option.isCorrect)}
                        className={`btn w-100 my-2 ${
                          answered
                            ? option.isCorrect
                              ? "btn-success"
                              : selectedAnswer === index
                              ? "btn-danger"
                              : "btn-outline-secondary"
                            : "btn-outline-primary"
                        }`}
                        disabled={answered}
                      >
                        {option.answerText}
                      </button>
                    ))}

                    {/* Buttons for navigation */}
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-secondary"
                        onClick={prevQuestion}
                        disabled={currentQuestion === 0}
                      >
                        Previous Question
                      </button>

                      <button
                        className={`btn ${
                          answered ? "btn-success" : "btn-secondary disabled"
                        }`}
                        onClick={nextQuestion}
                        disabled={!answered}
                      >
                        {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-center mt-5">Loading...</h3>
      )}
    </>
  );
}

export default Quiz;
