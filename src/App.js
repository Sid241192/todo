import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      // const updatedTodos = todos.map((t) => {
      //   if (t.id === editTodo.id) {
      //     t = {
      //       id: t.id,
      //       todo: todo,
      //     };
      //   } else {
      //     t = {
      //       id: t.id,
      //       todo: t.todo,
      //     };
      //   }
      // });
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (item) => {
    const delTodo = todos.filter((to) => to.id !== item.id);
    setTodos([...delTodo]);
  };

  const handleEdit = (item) => {
    const editTodo = todos.find((index) => index.id === item.id);
    setTodo(editTodo.todo);
    setEditId(item.id);
  };
  return (
    <div className="App">
      <div className="container">
        <h1>To do List</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId ? "Edit" : "GO"}</button>
        </form>
        <ul className="allTodos">
          {todos.map((item, index) => {
            return (
              <li className="singleTodo" key={item.id}>
                <span className="todoText">{item.todo}</span>
                <button onClick={() => handleEdit(item)}>edit</button>
                <button onClick={() => handleDelete(item)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
