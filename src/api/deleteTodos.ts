import axios from "axios";
import { Todos } from "../models/todos";

export const deleteTodos = async (id: number) => (await axios.delete<Todos>(`https://64a7df50dca581464b84ecc6.mockapi.io/todos/${id}`)).data;