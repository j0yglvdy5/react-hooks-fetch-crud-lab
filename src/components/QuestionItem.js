import React from "react";

function QuestionItem({ question,onDeleteQuestion,onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteQuestion(){

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(() => onDeleteQuestion(id));
  }

  function handleChange(e){
    const updatedQuestion = {
      ...question,
      correctIndex: parseInt(e.target.value),
    };

    fetch("http://localhost:4000/questions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
      .then((r) => r.json())
      .then(() => onUpdateQuestion(updatedQuestion));
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
