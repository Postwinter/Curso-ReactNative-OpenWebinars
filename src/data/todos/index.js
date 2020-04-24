import uuid from "todoList/node_modules/react-native-uuid";

const getTodos = () => [
    newTodo({ text: "Elemento 1", done: false }), 
    newTodo({ text: "Elemento 2", done: false }), 
    newTodo({ text: "Elemento 3", done: false }),
    newTodo({ text: "Elemento 4", done: true }),
    newTodo({ text: "Elemento 5", done: false }),
    newTodo({ text: "Elemento 6", done: false }),
    newTodo({ text: "Elemento 7", done: false }),
    newTodo({ text: "Elemento 8", done: false }),
    newTodo({ text: "Elemento 9", done: false }),
    newTodo({ text: "Elemento 10", done: false }),
    newTodo({ text: "Elemento 11", done: false }),
    newTodo({ text: "Elemento 12", done: false }),
    newTodo({ text: "Elemento 13", done: false })
];

//Crea uno nuevo
const newTodo = todo => ({
  id: uuid.v1(),
  text: todo.text,
  createdAt: new Date(),
  done: todo.done,
  //priority: todo.priority
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