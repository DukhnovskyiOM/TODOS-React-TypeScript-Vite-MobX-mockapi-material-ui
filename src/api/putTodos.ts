import axios from "axios";
import { Todos } from "../models/todos";

export const putTodos = async (todo: Todos, id: number) => (await axios.put<Todos>(`https://64a7df50dca581464b84ecc6.mockapi.io/todos/${id}`, todo)).data;