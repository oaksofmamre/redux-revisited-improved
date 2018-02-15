import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createStore } from "redux";

/////////////////////////////////////////
//
// reducer
//

function reducer(state, action) {
  switch (action.type) {
    case "TODO_ADD": {
      return applyAddTodo(state, action);
    }
    case "TODO_TOGGLE": {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
}

function applyAddTodo(state, action) {
  return state.concat(action.todo);
}

function applyToggleTodo(state, action) {
  return state.map(
    todo =>
      todo.id === action.todo.id
        ? Object.assign({}, todo, { completed: !todo.completed })
        : todo
  );
}

/////////////////////////////////////////

const store = createStore(reducer, []);

console.log("initial state:");
console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("store update, current state:");
  console.log(store.getState());
});

/////////////////////////////////////////
//
// dispatch actions
//

store.dispatch({
  type: "TODO_ADD",
  todo: { id: "0", name: "learn redux", completed: false }
});

store.dispatch({
  type: "TODO_ADD",
  todo: { id: "1", name: "learn mobx", completed: false }
});

store.dispatch({
  type: "TODO_TOGGLE",
  todo: { id: "0" }
});

/////////////////////////////////////////

unsubscribe();

ReactDOM.render(<App />, document.getElementById("root"));
