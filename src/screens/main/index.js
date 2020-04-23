import React, {Component} from "react"; 
import { View, Text, StyleSheet } from "react-native";
import TodoList from "todoList/src/component/todoList"
import {getTodos} from "todoList/src/data/todos";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: "bold",
      fontSize: 20
    }
});



class MainScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      todos: []
    };
  };
  
  //Asigna los estados
  componentDidMount = () => {
    this.setState({todos: getTodos()});
  }

  render(){
    //const {todos} = this.state;
    return(
        <View style={styles.container}>
            <Text selectable style={styles.title}>Lista de elementos</Text>
            <TodoList todos={this.state.todos}/>
        </View>
    );
  }
}

export default MainScreen;