import uuid from "todoList/node_modules/react-native-uuid";
import {AsyncStorage} from "react-native";

const TODOS_KEY = "@MyStore:todos";
const delay = ms => new Promise(res => setTimeout(res,ms));

const getTodos = async () => {
  await delay(2000); //Aplicar espera de 2 segundos
  let todos = [];
  try {
    todos = await AsyncStorage.getItem(TODOS_KEY);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return JSON.parse(todos);
};

//Crea uno nuevo
const newTodo = todo => ({
  id: uuid.v1(),
  text: todo.text,
  createdAt: new Date(),
  done: todo.done,
  priority: todo.priority
});


const updateTodo = (list, todo) => {
  const updateIndex = list.findIndex(t => t.id === todo.id);
  const newTodoList = [...list];
  newTodoList[updateIndex] = todo;
  saveTodos(newTodoList);
  return newTodoList;
};

const addTodo = (list, todo) => {
  const newTodoList = [...(list || []), newTodo(todo)];
  saveTodos(newTodoList);
  return newTodoList;
};

const saveTodos = async todos => {
  try {
    const resp = await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

const deleteTodo = (list, todo) => {
  const newTodoList = list.filter(t => t.id !== todo.id);
  saveTodos(newTodoList);
  return newTodoList;
};

export { getTodos, addTodo, updateTodo, deleteTodo };