import React from "react";
import CollapsibleQA from "../../components/CollapsibleQA/CollapsibleQA";
import questions from "../../data/reactQuestions";

function ReactQuestions() {
  return <CollapsibleQA questions={questions} />;
}

export default ReactQuestions;
