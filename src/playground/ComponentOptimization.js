import React, { useState } from "react";

// Child component wrapped in React.memo
const ListItem = React.memo(({ item }) => {
  console.log("Rendering:", item.name);
  return <li> {item.name} </li>;
});

const List = ({ items }) => {
  return (
    <ul>
      {" "}
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}{" "}
    </ul>
  );
};

const ComponentOptimization = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, name: "Item A" },
    { id: 2, name: "Item B" },
    { id: 3, name: "Item C" },
  ]);

  const updateItem = () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === 1 ? { ...item, name: "Updated Item A" } : item
      )
    );
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}> Click Me </button>{" "}
      <button onClick={updateItem}> Update Item A </button>{" "}
      <List items={items} />{" "}
    </div>
  );
};

export default ComponentOptimization;
