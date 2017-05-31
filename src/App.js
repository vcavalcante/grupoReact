import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      listTodo:[
        {id:1,isComplete:true,text:'lavar o cachorro'},
        {id:2,isComplete:false,text:'passear com o cachorro'},
        {id:3,isComplete:true,text:'limpar merda do cachorro'},
        {id:4,isComplete:false,text:'dar o cachorro'},
      ]
    };

  }

  notificarMudar(todoAlterado){
    const indexTodoVelho = this.state.listTodo.findIndex((todo)=>{return todo.id === todoAlterado.id});
    const novaListTodo =  this.state.listTodo;
    novaListTodo[indexTodoVelho] = todoAlterado;
    this.setState({listTodo : novaListTodo});
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
      {this.state.listTodo.map((todo)=>{
        return <Linhazinha key={todo.id} todo={todo} mudou={ this.notificarMudar.bind(this,todo)} />
      })}
    </ul>
    </div>
  }
}

export default App;

class Linhazinha extends Component {
  checkboxHandler(event) {
    // TODO: fazer direito. Usar uma classe para TODO e um método para alterar valor'
    this.props.todo.isComplete = !this.props.todo.isComplete; 
    this.props.mudou();
  }

  render() {
    // onchange={this.checkboxHandler.bind(this,todo)}
    return <li><input type="checkbox" checked={this.props.todo.isComplete} onChange={this.checkboxHandler.bind(this)} /> {this.props.todo.text}</li> 
  }
}  
