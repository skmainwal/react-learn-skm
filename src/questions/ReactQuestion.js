import React from "react";
import CollapsibleQA from "../CollapsibleQA";
import questions from "./reactQuestions";

function ReactQuestion() {
  return <CollapsibleQA questions={questions} />;
}

export default ReactQuestion;
