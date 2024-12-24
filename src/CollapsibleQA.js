import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import "./CollapsibleQA.css";

function CollapsibleQA({ question, answer, code }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="collapsible-qa">
      <p onClick={toggleCollapse} className="question">
        Question: {question}
      </p>
      {/* <button onClick={toggleCollapse}>
        {isOpen ? "Hide" : "Show"} Answer
      </button> */}
      {isOpen && (
        <div>
          <p>
            <strong>Answer:</strong> {answer}
          </p>
          <pre>
            <code>{code}</code>
            <FaCopy
              onClick={copyToClipboard}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            />
          </pre>
        </div>
      )}
    </div>
  );
}

export default CollapsibleQA;
