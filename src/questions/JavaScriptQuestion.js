import React from "react";
import CollapsibleQA from "../CollapsibleQA";
import questions from "./javaScriptQuestions";

function JavaScriptQuestion() {
  return <CollapsibleQA questions={questions} />;
}

export default JavaScriptQuestion;
