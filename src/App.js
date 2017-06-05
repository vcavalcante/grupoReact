import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todoList:[
        {id:1,isComplete:true,text:'lavar o cachorro'},
        {id:2,isComplete:false,text:'passear com o cachorro'},
        {id:3,isComplete:true,text:'limpar merda do cachorro'},
        {id:4,isComplete:false,text:'dar o cachorro'},
      ]
    };
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle(id) {
    const todoListUpdated = this.state.todoList.map(todo => {
      if (todo.id == id)
        todo.isComplete = !todo.isComplete;
      return todo;
    });

    this.setState({todoList : todoListUpdated});
  }

  render(){
    return <div>
    <header><h1>ToDo App</h1></header>
    <fieldset>
      <legend>Insira uma tarefa</legend>
      <form>
        <input type="text" />
        <input type="submit" />
      </form>
    </fieldset>
    <ul>
      {this.state.todoList.map(todo => {
        return <Todo key={todo.id} {...todo} toggle={this.onToggle} />
      })}
    </ul>
    </div>
  }
}

export default App;

const Todo = props => {
  return <li>
    <input type="checkbox"
      checked={props.isComplete}
      onChange={props.toggle.bind(this, props.id)} /> {props.text}
  </li>
}  
