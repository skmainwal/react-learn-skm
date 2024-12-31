import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Babel from "@babel/standalone";
import ReactDOM from "react-dom";
import "./CodeCompiler.css";

function CodeCompiler({ initialCode = "", language = "javascript" }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const previewRef = useRef(null);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const compileAndRunReact = () => {
    try {
      // Transform JSX to JavaScript
      const transformedCode = Babel.transform(code, {
        presets: ["react"],
        filename: "preview.js",
      }).code;

      // Create a new Function from the transformed code
      const consoleLog = [];
      const mockConsole = {
        log: (...args) => consoleLog.push(args.join(" ")),
        error: (...args) => consoleLog.push("Error: " + args.join(" ")),
        warn: (...args) => consoleLog.push("Warning: " + args.join(" ")),
      };

      const context = {
        React,
        ReactDOM,
        console: mockConsole,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        Math,
        Date,
        String,
        Number,
        Array,
        Object,
        JSON,
        RegExp,
        Error,
      };

      // Wrap the code to return the React component
      const wrappedCode = `
        let __ReactComponent;
        with (context) {
          ${transformedCode}
          __ReactComponent = typeof App !== 'undefined' ? App : null;
        }
        return __ReactComponent;
      `;

      // Execute the code and get the component
      const Component = new Function("context", wrappedCode)(context);

      if (Component) {
        // Render the React component to the preview div
        ReactDOM.render(React.createElement(Component), previewRef.current);
        setOutput(consoleLog.join("\n"));
      } else {
        setOutput("No React component named 'App' found in the code.");
      }
    } catch (err) {
      setError(err.toString());
    }
  };

  const runJavaScript = () => {
    try {
      const consoleLog = [];
      const mockConsole = {
        log: (...args) => consoleLog.push(args.join(" ")),
        error: (...args) => consoleLog.push("Error: " + args.join(" ")),
        warn: (...args) => consoleLog.push("Warning: " + args.join(" ")),
      };

      const context = {
        console: mockConsole,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        Math,
        Date,
        String,
        Number,
        Array,
        Object,
        JSON,
        RegExp,
        Error,
      };

      const wrappedCode = `
        with (context) {
          ${code}
        }
      `;

      new Function("context", wrappedCode)(context);
      setOutput(consoleLog.join("\n"));
    } catch (err) {
      setError(err.toString());
    }
  };

  const runCode = () => {
    setError("");
    setOutput("");

    if (language === "react") {
      compileAndRunReact();
    } else {
      runJavaScript();
    }
  };

  return (
    <div className="code-compiler">
      <div className="editor-container">
        <Editor
          height="300px"
          defaultLanguage={language === "react" ? "javascript" : language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            automaticLayout: true,
          }}
        />{" "}
      </div>{" "}
      <div className="controls">
        <button onClick={runCode} className="run-button">
          Run Code{" "}
        </button>{" "}
      </div>{" "}
      <div className="output-container">
        {" "}
        {language === "react" && (
          <div className="preview-container" ref={previewRef}>
            {" "}
          </div>
        )}{" "}
        <h3> Console Output: </h3>{" "}
        {error ? (
          <pre className="error"> {error} </pre>
        ) : (
          <pre className="output"> {output} </pre>
        )}{" "}
      </div>{" "}
    </div>
  );
}

export default CodeCompiler;
