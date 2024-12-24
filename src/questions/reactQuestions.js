const questions = [
  {
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces.",
    code: `
      const colors = ['Red', 'GREEN', 'Blue'];
      const result = colors.map(e => e.toLocaleLowerCase()).includes('green');`,
  },
  {
    question: "What are the key features of React?",
    answer:
      "Key features include: Virtual DOM for better performance, Component-based architecture, Unidirectional data flow, JSX syntax, and Rich ecosystem.",
    code: `
      // Component example
      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }`,
  },
  {
    question: "What is JSX?",
    answer:
      "JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It makes it easier to describe UI components.",
    code: `
      const element = (
        <div className="greeting">
          <h1>Hello, World!</h1>
          <p>Welcome to React</p>
        </div>
      );`,
  },
  {
    question: "What is the difference between state and props?",
    answer:
      "Props are read-only and passed from parent to child components, while state is managed within a component and can be updated using setState().",
    code: `
      // Props example
      function Child(props) {
        return <div>{props.message}</div>;
      }
      
      // State example
      function Counter() {
        const [count, setCount] = useState(0);
        return (
          <button onClick={() => setCount(count + 1)}>
            Count: {count}
          </button>
        );
      }`,
  },
  {
    question: "What are React Hooks?",
    answer:
      "Hooks are functions that allow you to use state and other React features in functional components. Common hooks include useState, useEffect, useContext, etc.",
    code: `
      function ExampleHook() {
        const [data, setData] = useState(null);
        
        useEffect(() => {
          fetchData().then(result => setData(result));
        }, []);
        
        return <div>{data}</div>;
      }`,
  },
  {
    question: "What is the Virtual DOM?",
    answer:
      "Virtual DOM is a lightweight copy of the actual DOM. React uses it to improve performance by minimizing direct manipulation of the DOM.",
    code: `
      // React handles DOM updates automatically
      function App() {
        const [text, setText] = useState('');
        return (
          <input 
            value={text} 
            onChange={e => setText(e.target.value)} 
          />
        );
      }`,
  },
  {
    question: "What is the purpose of useEffect?",
    answer:
      "useEffect is a hook for handling side effects in functional components, such as data fetching, subscriptions, or DOM manipulations.",
    code: `
      function DataFetcher() {
        const [data, setData] = useState([]);
        
        useEffect(() => {
          // Effect runs after render
          const fetchData = async () => {
            const response = await fetch('api/data');
            const json = await response.json();
            setData(json);
          };
          
          fetchData();
          
          // Cleanup function
          return () => {
            // Cleanup code here
          };
        }, []); // Empty dependency array = run once
        
        return <div>{/* render data */}</div>;
      }`,
  },
  {
    question: "What are controlled components?",
    answer:
      "Controlled components are form elements whose values are controlled by React state, making React the single source of truth.",
    code: `
      function ControlledForm() {
        const [input, setInput] = useState('');
        
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log('Submitted:', input);
        };
        
        return (
          <form onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        );
      }`,
  },
  {
    question: "What is React Context?",
    answer:
      "Context provides a way to pass data through the component tree without having to pass props manually at every level.",
    code: `
      const ThemeContext = React.createContext('light');
      
      function App() {
        return (
          <ThemeContext.Provider value="dark">
            <ThemedButton />
          </ThemeContext.Provider>
        );
      }
      
      function ThemedButton() {
        const theme = useContext(ThemeContext);
        return <button className={theme}>Themed Button</button>;
      }`,
  },
  {
    question: "What are React fragments?",
    answer:
      "Fragments let you group multiple children elements without adding extra nodes to the DOM.",
    code: `
      function List() {
        return (
          <>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </>
        );
      }`,
  },
];

export default questions;
