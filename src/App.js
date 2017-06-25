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
  }

  onToggle = (id) => {
    console.log(id);
    const todoListUpdated = this.state.todoList.map(todo => {
      if (todo.id === id)
        todo.isComplete = !todo.isComplete;
      return todo;
    });

    this.setState({todoList : todoListUpdated});
  }

  onChangeTodo = (text) => {
    this.setState({
      todoText:text
    })
  }

  addTodo = () => {
    const todoList =  [...this.state.todoList,
        {
          id: new Date().valueOf(),
          text: this.state.todoText,
          isComplete: false
        }]
    this.setState({todoList,todoText:''});
      
  }
  deleteTodo = (id) => {
    console.log('delete');
    console.log('antigo',this.state.todoList);
    const listTodo =this.state.todoList.filter((todo)=> {return todo.id !== id});
    console.log('novo',listTodo);
    this.setState({todoList:listTodo});
  }
  

  render(){
    return <div>
      <header><h1>ToDo App</h1></header>
      <AddTodo onChangeTodo = {this.onChangeTodo} onAddTodo={this.addTodo} text = {this.state.todoText}/>
      <TodoList todoList = {this.state.todoList} toggle = {this.onToggle} deleteTodo={this.deleteTodo}/>
    </div>
  }
}

export default App;

const AddTodo = props =>{
  const onSubmitForm = (ev) =>{
    ev.preventDefault();
    props.onAddTodo();
  }
  const onChangeTodo= (ev) => {
    props.onChangeTodo(ev.target.value);

  }
  return (
    <fieldset>
      <legend>Insira uma tarefa</legend>
      <form onSubmit={onSubmitForm}>
        <input type="text" onChange={onChangeTodo} />
        <input type="submit" />
      </form>
    </fieldset>
  )
    
}

const TodoList = props =>{
  return(
    <ul>
        {props.todoList.map((todo)=>{
          return <Todo key={todo.id} toggle={props.toggle} deleteTodo={props.deleteTodo} {...todo}/>
        })}
    </ul>
  );
}

const Todo = props => {
  const onChange = (ev) =>{
    props.toggle(props.id)
  }
  const onDoubleClick = (ev) =>{
    props.deleteTodo(props.id)
  }
  return (
    <li>
      <label onDoubleClick={onDoubleClick}>
        <input type="checkbox"
          checked={props.isComplete}
          onChange={onChange} /> {props.text}
      </label>
    </li>
  )
}  
