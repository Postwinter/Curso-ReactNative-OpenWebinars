import uuid from "todoList/node_modules/react-native-uuid";

const delay = ms => new Promise(res => setTimeout(res,ms));

const getTodos = async () => {
  await delay(2000); //Aplicar espera de 2 segundos
  return [
    newTodo({ text: "Elemento 1", done: false, priority: 2 }), 
    newTodo({ text: "Elemento 2", done: false, priority: 2 }), 
    newTodo({ text: "Elemento 3", done: false, priority: 2 }),
    newTodo({ text: "Elemento 4", done: true, priority: 2 }),
    newTodo({ text: "Elemento 5", done: false, priority: 2 }),
    newTodo({ text: "Elemento 6", done: false, priority: 2 }),
    newTodo({ text: "Elemento 7", done: true, priority: 2 }),
    newTodo({ text: "Elemento 8", done: false, priority: 2 }),
    newTodo({ text: "Elemento 9", done: false, priority: 2 }),
    newTodo({ text: "Elemento 10", done: false, priority: 2 }),
    newTodo({ text: "Elemento 11", done: true, priority: 2 }),
    newTodo({ text: "Elemento 12", done: false, priority: 2 }),
    newTodo({ text: "Elemento 13", done: false, priority: 2 })
  ]
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
  //saveTodos(newTodoList);
  return newTodoList;
};

const addTodo = (list, todo) => {
  const newTodoList = [...(list || []), newTodo(todo)];
  //saveTodos(newTodoList);
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
  //saveTodos(newTodoList);
  return newTodoList;
};

export { getTodos, addTodo, updateTodo, deleteTodo };