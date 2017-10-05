import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
// toggleComplete is the method we are trying to access by passing it as a parameters
const ToDo = ({item, toggleComplete, removeToDo}) => {
  return (
    <li>
      {item.title}
    <input
      type="checkbox"
      id={item.id}
      checked={item.complete}
      onChange={toggleComplete} />
    <label htmlFor={item.id}></label>
    <button onClick={removeToDo}>
      <i className="fa fa-trash" ></i>
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
      {number} {number === 1 ? "List Item" : "List Items"}
    </div>
  );
}

const ClearButton = ({removeCompleted,hasCompleted}) => {
  return (
    <button onClick={removeCompleted}>
      Remove
    </button>
  );
}

class App extends Component {

  constructor(){
    super();
    this.state={
      //todos : [{id: 0, title: 'Learn React', complete: false},{id: 1, title: 'Learn Redux', complete: false}],
      todos : [{id: 0, title: 'Learn React', complete: false}],
      //todos:[],
      lastId:0,
      //inputValue:0
    };
    this.removeCompleted = this.removeCompleted.bind(this);
    //this.addToDo = this.addToDo.bind(this);
  }


  removeCompleted(){
    //alert("Removed");
    let todos = this.state.todos.filter((todo) => !todo.complete);
    this.setState({ todos });
  }

  hasCompleted(){
    let todos = this.state.todos.filter(todo => todo.complete); // Implicit return functions : Only works if there one return result and eliminates 'return' keyword
    return todos.length ? true : false;
  }

  removeToDo(item){ 
    let todos = this.state.todos.filter((todo) => { // filter method completes only specific conditions and returns the result
      return todo.id !== item.id
    })
    this.setState({todos})//shorthand: if your key & value is the same todos:todos
  }

  toggleComplete(item){
    let todos = this.state.todos.map((todo) => {
      if(todo.id===item.id){
        todo.complete = !todo.complete
      }
      return todo
    })
    this.setState({todos})//shorthand: if your key & value is the same todos:todos
  }
  //Input Field
  addToDo = (event) => { // ES2016 : automatically binds method to the class. Therefore, you don't need to this.addToDo = this.addToDo.bind(this)
    event.preventDefault();
    const id = this.state.lastId + 1;
    if(this.toDoInput.value){
      let todos = this.state.todos.concat({ // concat method just like concat()
        id: id,// es2016 you can just write id,
        title : this.toDoInput.value,
        complete:false
      })
      this.setState({
        todos,
        lastId:id
      })
      this.toDoInput.value = ''//Empty input field after new list item added
    }
  }

  componentDidMount(){
    this.toDoInput.focus();
  }

  render() {
    
    let str = "Hi There";
    //console.log(this.hasCompleted())

    return (
      <div className="todo-list">
        {/* <StringHi consolestr={str} /> */}
        <h1>To Do List</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
              <input type="text" ref={(input) => (this.toDoInput = input)} />
              <span>(press enter to add)</span>
          </form>
        </div>
        <ul>
          {this.state.todos.map((todo,i) => <ToDo item={todo} key={i} toggleComplete={this.toggleComplete.bind(this, todo)} removeToDo={this.removeToDo.bind(this,todo)}/>)}
        </ul>
          <div className="todo-admin">
            <ToDoCount number={this.state.todos.length} />
             {this.hasCompleted() ? <ClearButton removeCompleted = {this.removeCompleted} /> : ''}
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
  removeCompleted:PropTypes.func.isRequired
};

ToDo.propTypes = {
  item:PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }),
  toggleComplete: PropTypes.func.isRequired,
  removeToDo:PropTypes.func.isRequired
};