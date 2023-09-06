import axios from "axios";
import { Todos } from "../models/todos";

export const postTodos = async (todo: Todos) => (await axios.post<Todos>('https://64a7df50dca581464b84ecc6.mockapi.io/todos', todo)).data;