import React, {Component} from "react"; 
import {SafeAreaView, View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator } from "react-native";
import TodoList from "todoList/src/component/todoList"
import AddTodo from "todoList/src/component/addTodo"
import FAB from "todoList/src/component/FAB"
import { getTodos, addTodo, updateTodo, deleteTodo } from "todoList/src/data/todos";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  loading: {
    flex: 1
  }
});



class MainScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      todos: [],
      newElement: null,
      loading : true,
      addModalVisible: false,
    };
  };
  
  //Asigna los estados
  componentDidMount = async () => {
    const todos = await getTodos();
    this.setState({ todos: todos, loading: false });
  };

  //Asignar al estado el texto
  handleAdd = newTodo => {
    const { todos } = this.state;
    const newList = addTodo(todos, newTodo);
    this.setState({ todos: newList, newTodo: null });
  };

  //Actualizar si esta hecho
  handleUpdate = todo => {
    const { todos } = this.state;
    const newList = updateTodo(todos, todo);
    this.setState({ todos: newList });
  };

  //Elimina una tarea
  handleDelete = todo => {
    Alert.alert("Quieres eliminar la tarea?", todo.text, [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          const { todos } = this.state;
          const newList = deleteTodo(todos, todo);
          this.setState({ todos: newList });
        }
      }
    ]);
  };

  toggleModal = () => {
    this.setState({ addModalVisible: !this.state.addModalVisible });
  };

  //Propiedad clearButtonMode solo funciona en IOS
  render(){
    const {todos, newTodo, loading, addModalVisible} = this.state;
    return(
        <SafeAreaView style={styles.container}>
            <Text selectable style={styles.title}>Lista de tareas</Text>
            {loading && (
              <ActivityIndicator
                style={styles.loading}
                size="large"
                color="#0066ff"
              />
            )}
            {!loading && (
              <TodoList
                todos={todos}
                onUpdate={this.handleUpdate}
                onDelete={this.handleDelete}
                onEdit={this.openEditTodo}
              />
            )}
            <FAB
              text="+"
              fabStyle={{ backgroundColor: "#0066ff" }}
              textStyle={{ color: "#fff" }}
              onPress={this.toggleModal}
            />
            <AddTodo
              visible={addModalVisible}
              onCloseModal={this.toggleModal}
              onAddTodo={this.handleAdd}
            />
        </SafeAreaView>
    );
  }
}

export default MainScreen;