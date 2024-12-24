import React from "react";
import CollapsibleQA from "../CollapsibleQA";
import questions from "./javaScriptQuestions";

function JavaScriptQuestion() {
  return (
    <div>
      {questions.map((question, index) => (
        <CollapsibleQA
          key={index}
          question={question.question}
          answer={question.answer}
          code={question.code}
        />
      ))}
    </div>
  );
}

export default JavaScriptQuestion;
