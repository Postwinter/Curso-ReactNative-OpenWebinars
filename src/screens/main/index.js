import React, {Component} from "react"; 
import {SafeAreaView, View, Text, StyleSheet, TextInput, Button } from "react-native";
import TodoList from "todoList/src/component/todoList"
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
  text: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 5
  },
  addRow: {
    flexDirection: "row",
    width: "80%"
  }
});



class MainScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      todos: [],
      newElement: null
    };
  };
  
  //Asigna los estados
  componentDidMount = () => {
    this.setState({todos: getTodos()});
  }

  //Asignar al estado el texto
  handleAdd = () => {
    const { todos, newElement } = this.state;
    const newList = addTodo(todos, { text: newElement });
    this.setState({ todos: newList, newElement: null });
  }

  //Actualizar si esta hecho
  handleUpdate = todo => {
    const { todos } = this.state;
    const newList = updateTodo(todos, todo);
    this.setState({ todos: newList });
  };

  //Elimina un elemento
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

  //Propiedad clearButtonMode solo funciona en IOS
  render(){
    const {todos, newElement} = this.state;
    return(
        <SafeAreaView style={styles.container}>
            <Text selectable style={styles.title}>Lista de elementos</Text>
            <View style={styles.addRow}>
              <TextInput 
                placeholder="Nuevo elemento"
                value={newElement}
                onChangeText={todo => this.setState({newElement: todo})}
                style={styles.text} 
                autoCapitalize="words"
                clearButtonMode="always"
              />
              <Button onPress={this.handleAdd} title="Añadir" />
            </View>
            <TodoList todos={todos} 
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete} 
            />
        </SafeAreaView>
    );
  }
}

export default MainScreen;