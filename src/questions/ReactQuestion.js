import React from "react";
import CollapsibleQA from "../CollapsibleQA";
import questions from "./reactQuestions";

function ReactQuestion() {
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

export default ReactQuestion;
