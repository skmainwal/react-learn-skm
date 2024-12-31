import React from "react";
import CollapsibleQA from "../../components/CollapsibleQA/CollapsibleQA";
import questions from "../../data/javascriptQuestions";

function JavaScriptQuestions() {
  return <CollapsibleQA questions={questions} />;
}

export default JavaScriptQuestions;
