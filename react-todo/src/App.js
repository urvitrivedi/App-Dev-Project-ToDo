import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

const ToDo = ({item}) => {
  return (
    <li>
      {item.title}
    <input
      type="checkbox"
      id={item.id}
      checked={item.complete} />
    <label htmlFor={item.id}></label>
    <button>
      <i className="fa fa-trash"></i>
    </button>
    </li>
  );
}

const StringHi = (props) => {
  return (
    <p>
      {props.consolestr}
    </p>
  );
}

const ToDoCount = ({number}) => {
  return (
    <div>
      {number} {number === 1 ? "TODO" : "TODOS"}
    </div>
  );
}

const ClearButton = ({removeCompleted}) => {
  return (
    
    <button onClick={removeCompleted}>
      "Content Removed"
    </button>

  );
}

class App extends Component {

  removeCompleted(){
    alert("Removed");
  }

  render() {
    const todos = [{ id: 0, title: 'Learn React', complete: false },{ id: 1, title: 'Testing React', complete: false }];
    let str = "Hi There";

    return (
      <div className="todo-list">
        <h1>Hello</h1>
        <ul>
          {todos.map((todo,i) => <ToDo item={todo} key={i} />)}
        </ul>
        <StringHi consolestr={str} />
          <div className="todo-admin">
            <ToDoCount number={1} />
            <ClearButton removeCompleted = {this.removeCompleted}>I am a Child of Parent</ClearButton>
          </div>
      </div>
    );
  }
}

export default App;

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

ClearButton.propTypes = {
  removeCompleted:PropTypes.string.isRequired
};

ToDo.propTypes = {
  item:PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  })
};