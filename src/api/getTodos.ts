import axios from "axios";
import { Todos } from "../models/todos";

export const getTodos = async () => (await axios.get<Todos[]>("https://64a7df50dca581464b84ecc6.mockapi.io/todos")).data;