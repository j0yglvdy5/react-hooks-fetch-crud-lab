import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions]=useState([]);


  useEffect(()=>{
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  },[])

  function handleAddQuestion(newQuestion){
    setQuestions([...questions,newQuestion])
  }

  function handleDeleteQuestion(deleteQuestion){
    setQuestions(...questions.filter((question)=>question.id !== deleteQuestion.id))
  }
  function handleUpdateQuestion(updatedQuestion){
    const updatedQuestions = questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/>
       : <QuestionList
      questions={questions}
      onDeleteQustion={handleDeleteQuestion}
      onUpdateQuestion={handleUpdateQuestion}
       />}
    </main>
  );
}

export default App;
