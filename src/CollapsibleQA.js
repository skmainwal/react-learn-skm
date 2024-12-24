import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import "./CollapsibleQA.css";
import Pagination from "./Pagination";
import CodeCompiler from "./CodeCompiler";

function CollapsibleQA({ questions = [] }) {
  const [isOpen, setIsOpen] = useState(null);
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!questions || questions.length === 0) {
    return <div className="qa-container"> No questions available. </div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuestions = questions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setIsOpen(null);
  };

  const toggleCollapse = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="qa-container">
      {" "}
      {currentQuestions.map((item, index) => (
        <div key={index} className="collapsible-qa">
          <p onClick={() => toggleCollapse(index)} className="question">
            Question: {item.question}{" "}
          </p>{" "}
          {isOpen === index && (
            <div>
              <p>
                <strong> Answer: </strong> {item.answer}{" "}
              </p>{" "}
              <div className="code-container">
                <CodeCompiler initialCode={item.code} language="javascript" />
                <div className="copy-wrapper">
                  <FaCopy
                    className="copy-icon"
                    onClick={() => copyToClipboard(item.code)}
                  />{" "}
                  {copied && <span className="copied-text"> Copied! </span>}{" "}
                </div>{" "}
              </div>{" "}
            </div>
          )}{" "}
        </div>
      ))}{" "}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}{" "}
    </div>
  );
}

export default CollapsibleQA;
