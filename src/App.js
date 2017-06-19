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
      ],
      text:''
    };

  }

  onToggle = (id) => {
    const todoListUpdated = this.state.todoList.map(todo => {
      if (todo.id == id)
        todo.isComplete = !todo.isComplete;
      return todo;
    });

    this.setState({todoList : todoListUpdated});
  }

  onInputChange = (text) =>{
    this.setState({text})
  }
  onAddTodo = (ev) =>{
    ev.preventDefault();
    this.setState((prevState,props) => {
      return {todoList:[
        ...prevState.todoList,
        {
          id:prevState.todoList.length+1,
          isComplete:false,
          text:prevState.text
        }
        ],
        text:''
      }
    })
  }

  render(){
    return <div>
    <header><h1>ToDo App</h1></header>
    <AddTodo text={this.state.text} onInputChange={this.onInputChange} onSubmit={this.onAddTodo} />
    <TodoList todoList = {this.state.todoList} toggle ={this.onToggle } />
    </div>
  }
}

export default App;

const TodoList = props =>{
  return(
     <ul>
      {props.todoList.map(todo => {
        return <Todo key={todo.id} {...todo} toggle={props.toggle} />
      })}
    </ul>
  )
}

const AddTodo = props =>{
  const onChange = (ev) =>{
    props.onInputChange(ev.target.value)

  }
  return(
    <fieldset>
      <legend>Insira uma tarefa</legend>
      <form onSubmit={props.onSubmit}>
        <input type="text" value={props.text} onChange={onChange} />
        <input type="submit" />
      </form>
    </fieldset>
  )

}

const Todo = props => {
  const onChange = (ev) =>{
    props.toggle(props.id)
  }
  return (
    <li>
      <label>
      <input type="checkbox"
        checked={props.isComplete}
        onChange={onChange} /> {props.text}
        </label>
    </li>
  )
}  
