import { makeAutoObservable, runInAction } from "mobx";
import { IPromiseBasedObservable, fromPromise } from "mobx-utils";
import { Todos } from "../models/todos";
import { getTodos } from "../api/getTodos";
import { postTodos } from "../api/postTodos";
import { deleteTodos } from "../api/deleteTodos";
import { putTodos } from "../api/putTodos";

class TodosStore {
  todos?: IPromiseBasedObservable<Todos[]>;
  localTodos: Todos[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get countOfStatus() {
    return this.localTodos.filter((todo) => todo.status === true).length;
  }

  getTodosAction = () => {
    this.todos = fromPromise(getTodos());
  };

  addTodosLocal = (todos: Todos[]) => {
    this.localTodos = todos;
  };

  addTodos = async (todo: string) => {
    const newTodo = {
      name: todo,
      status: true,
    };

    try {
      const data = await postTodos(newTodo);

      runInAction(() => {
        this.localTodos.push(data);
      });
    } catch (error) {
      alert(error);
    }
  };

  deleteCompletedTodos = async () => {

    const result = this.localTodos.filter((el) => el.status === false);

        for(let i = 0; i <= result.length; i++){
            const id = result[i]?.id;
            if(id !== undefined){
                try {
                    const data = await deleteTodos(id);
                    const index = this.localTodos.findIndex(e => e.id === data.id);
                    runInAction(() => {
                        this.localTodos.splice(index, 1);
                      });
                    
                } catch (error) {
                    alert(error);
                }
                
            } 
        }
  };

  changeStatusTodos = async (todo: Todos) => {
    const index = this.localTodos.findIndex(e => e.id === todo.id);
    const newTodo = {
      id: todo.id,
      name: todo.name,
      status: !this.localTodos[index].status,
    };
    try {
      if(todo.id){
        const data = await putTodos(newTodo, todo.id);
        runInAction(() => {
          this.localTodos[index] = data;
        });
      }
    } catch (error) {
      alert(error);
    }
  };
}

export default new TodosStore();
