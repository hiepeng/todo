import React from "react";
import react from "react";
import AddTodo from "./AddTodo";
import { toast } from 'react-toastify';
class ListTodo extends React.Component {
  state = {
    ListTodos: [
      { id: "todo1", title: "doing homeword" },
      { id: "todo2", title: "xem video" },
      { id: "todo3", title: "fixing bugs" },
    ],
    editTodo: {}
  };

  addNewTodo = (todo) => {
    this.setState({
      ListTodos: [...this.state.ListTodos, todo],
    });
    toast.success("Thành Công")
  };

  handleEditTodo = (todo) => {

    let {editTodo, ListTodos} = this.state;
    let isEmptyObj = Object.keys(editTodo).length === 0;
    if(isEmptyObj === false && editTodo.id === todo.id) {
        return;
        /////////////////////////////////////////////////
    }



      this.setState({
          editTodo: todo
      })
  }

  handleDeleteTodo = (todo) => {
    let currentTodos = this.state.ListTodos;
    currentTodos = currentTodos.filter(item => item.id !== todo.id);
    this.setState({
        ListTodos: currentTodos
    })
    toast.success("Thành Công")
  }

  handleOnchangeEditTodo = (event) => {
      let editTodoCopy = { ...this.state.editTodo };
      editTodoCopy.title = event.target.value;
      this.setState({
        editTodo: editTodoCopy
      })
  }
  render() {
    let { ListTodos, editTodo } = this.state;
    let isEmptyObj = Object.keys(editTodo).length === 0;
    console.log('>>>kiem tra object co rong hay k', isEmptyObj)
     

    return (
      <div className="list-todo-container">
        <AddTodo addNewTodo={this.addNewTodo} />

        <div className="list-todo-content">
          {ListTodos &&
            ListTodos.length > 0 &&
            ListTodos.map((item, index) => {
              return (
                <div className="todo-child" key={item.id}>
                    {isEmptyObj === true ? 
                  <span>
                    {index + 1} - {item.title}
                  </span>
            :
                     <>
                     {editTodo.id === item.id ?
                    <span>
                        {index + 1} - <input 
                        value={editTodo.title}
                        onChange={(event)=> this.handleOnchangeEditTodo(event)}
                        />
                    </span>
                    :
                    <span>
                        {index + 1} - {item.title}
                    </span>
                    }
                    </>
              }
                  <button className="edit" onClick={() => this.handleEditTodo(item)}>
                      {
                        isEmptyObj === false && editTodo.id === item.id?
                        'save' : 'edit'
                  }
                  </button>
                  <button className="delete" onClick={()=> this.handleDeleteTodo(item)}>Delete</button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default ListTodo;
