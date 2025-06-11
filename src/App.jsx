import React, { useState } from 'react';
import './App.css'
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: 2,
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    correct: 3,
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 1,
  },
  {
    question: "What year was React released?",
    choices: ["2010", "2013", "2015", "2012"],
    correct: 1,
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  function handleAnswer(choiceIndex) {
    if (selectedAnswer !== null) return; // prevent multiple selections

    setSelectedAnswer(choiceIndex);
    if (choiceIndex === currentQuestion.correct) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    setSelectedAnswer(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsQuizFinished(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizFinished(false);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <header className="w-full max-w-4xl mb-16">
        <nav className="sticky top-0 bg-white flex justify-between items-center py-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 select-none">
            Quiz App
          </h1>
          <div>
            {/* Placeholder for future nav items */}
          </div>
        </nav>
      </header>

      <main className="w-full max-w-3xl bg-gray-50 rounded-xl shadow-lg p-8">
        {!isQuizFinished ? (
          <>
            <h2 className="text-3xl font-semibold text-gray-900 leading-snug mb-6">
              Question {currentIndex + 1} of {questions.length}
            </h2>
            <p className="text-xl text-gray-800 mb-8 font-semibold">{currentQuestion.question}</p>
            <ul className="space-y-4">
              {currentQuestion.choices.map((choice, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = currentQuestion.correct === index;
                const isAnswered = selectedAnswer !== null;

                let bgClass = "bg-white hover:bg-gray-100";
                let borderClass = "border border-gray-300";
                let textClass = "text-gray-800";

                if (isAnswered) {
                  if (isSelected && isCorrect) {
                    bgClass = "bg-green-100";
                    borderClass = "border border-green-400";
                    textClass = "text-green-800 font-semibold";
                  } else if (isSelected && !isCorrect) {
                    bgClass = "bg-red-100";
                    borderClass = "border border-red-400";
                    textClass = "text-red-800 font-semibold line-through";
                  } else if (isCorrect) {
                    bgClass = "bg-green-100";
                    borderClass = "border border-green-400";
                    textClass = "text-green-800";
                  } else {
                    bgClass = "bg-gray-100";
                    borderClass = "border border-gray-200";
                    textClass = "text-gray-400";
                  }
                }

                return (
                  <li key={index}>
                    <button
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleAnswer(index)}
                      className={`${bgClass} ${borderClass} ${textClass} w-full text-left px-6 py-3 rounded-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    >
                      {choice}
                    </button>
                  </li>
                );
              })}
            </ul>

            {selectedAnswer !== null && (
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={handleNext}
                  className="bg-black text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-300"
                >
                  {currentIndex + 1 === questions.length ? "Finish" : "Next Question"}
                </button>
                <p className="text-gray-700 font-medium select-none">
                  Score: {score} / {questions.length}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
              Quiz Completed!
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              You scored <span className="font-semibold">{score}</span> out of{" "}
              <span className="font-semibold">{questions.length}</span>.
            </p>
            <button
              onClick={handleRestart}
              className="bg-black text-white font-semibold px-8 py-4 rounded-md shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-300"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

