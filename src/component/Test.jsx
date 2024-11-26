import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/test.css";

function Test() {
  // Taking previous data from home page
  const location = useLocation();
  const result = location.state || "";

  // To store questions
  const [questions, setQuestions] = useState([]);

  // To store answers (user selected answers)
  const [answers, setAnswers] = useState(Array(5).fill(null));

  // To store correct answers (simulated for this example)
  const [correctAnswers, setCorrectAnswers] = useState([true, false, true, false, true]);

  // To track submission state
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  // Reset all states to their initial values
  const resetState = () => {
    setQuestions([]);
    setAnswers(Array(5).fill(null));
    setSubmitted(false);
  };

  const fetchQuestions = async () => {
    resetState(); // Reset state each time a new set of questions is generated

    const response = await axios.post(
      import.meta.env.VITE_REACT_GEMINI_API_BACKEND_URL,
      {
        prompt: `Generate five questions based on this ${result}, each question can only have two answers: either 'true' or 'false'. Do not write the answers in the question itself. Each question should be separated by ' | '.`
      }
    );
    console.log(response.data.result);

    const questionArray = response.data.result.split(' | ');
    console.log(questionArray);

    setQuestions(questionArray);
  };

  // Handle answer change
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  // Handle answer submit
  const handleSubmit = () => {
    console.log("User answers:", answers);
    setSubmitted(true); // Set submission flag
  };

  // Handle back to home button
  const handleBackToHome = () => {
    navigate('/'); // Navigate back to home
  };

  return (
    <div className='test-container'>
      <button className='generate-questions-button' onClick={fetchQuestions}>Generate Questions</button>
      {submitted && (
        <button className='back-to-home-button' onClick={handleBackToHome}>Back to Home</button>
      )}
      <ul className="question-list">
        {questions.map((q, index) => (
          <li key={index} className={`question-item ${submitted ? (answers[index] === correctAnswers[index] ? 'correct' : 'incorrect') : ''}`}>
            <p className="question-text">{q}</p>
            <div className="answer-options">
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="true"
                  onChange={() => handleAnswerChange(index, true)}
                  checked={answers[index] === true}
                  disabled={submitted} // Disable after submission
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="false"
                  onChange={() => handleAnswerChange(index, false)}
                  checked={answers[index] === false}
                  disabled={submitted} // Disable after submission
                />
                False
              </label>
            </div>
          </li>
        ))}
      </ul>
      {questions.length > 0 && !submitted && (
        <button onClick={handleSubmit} className='generate-questions-button'>Submit</button>
      )}
    </div>
  );
}

export default Test;