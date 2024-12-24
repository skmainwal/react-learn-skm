import React from "react";
import CollapsibleQA from "./CollapsibleQA";

const JavaScriptQuestion = () => {
    // Sample questions data
    const questionsData = [{
            question: "What is JavaScript?",
            answer: "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification.",
            code: `// Example JavaScript code
const greeting = "Hello, World!";
console.log(greeting);`,
        },
        {
            question: "What are closures in JavaScript?",
            answer: "A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).",
            code: `function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
        },
        {
            question: "How does the 'this' keyword work in JavaScript?",
            answer: "The 'this' keyword refers to the object that is currently executing the code.",
            code: `const person = {
  name: 'John',
  greet: function() {
    console.log('Hello, ' + this.name);
  }
};
person.greet(); // Hello, John`,
        },
        {
            question: "What is Promise in JavaScript?",
            answer: "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.",
            code: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

promise.then(result => {
  console.log(result); // Success!
});`,
        },
        {
            question: "What is destructuring in JavaScript?",
            answer: "Destructuring is a JavaScript expression that allows us to extract data from arrays, objects, and maps and set them into new, distinct variables.",
            code: `// Array destructuring
const [a, b] = [1, 2];

// Object destructuring
const { name, age } = {
  name: 'John',
  age: 30
};

console.log(name); // John
console.log(age);  // 30`,
        },
        {
            question: "What are arrow functions?",
            answer: "Arrow functions are a concise way to write function expressions in JavaScript, with a focus on being short and lexically binding 'this'.",
            code: `// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

console.log(addArrow(1, 2)); // 3`,
        },
    ];

    return ( <
        div >
        <
        h1 > JavaScript Interview Questions < /h1>{" "} <
        CollapsibleQA questions = { questionsData }
        />{" "} <
        /div>
    );
};

export default JavaScriptQuestion;