import React, { Fragment } from 'react';
import { Text, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, View, StyleSheet, Alert } from 'react-native';
import { render } from 'react-dom';

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  contentContainer: {
    flexGrow: 1
  },
  listItem: {
    margin: 5,
    padding: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  bullet: {
    width: "10%"
  },
  text: {
    flex: 1,
    marginLeft: 5,
    fontWeight: "bold"
  },
  textDone: {
    color: "#aaa",
    textDecorationLine: "line-through",
    fontWeight: "normal"
  },
  delete: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  separator: {
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
  },
  sectionHeader: {
    backgroundColor: "#ddd",
    padding: 10
  },
  emptyImage: {
    width: 50,
    height: 50,
    tintColor: "#005500"
  },
  icon: {
    width: 20,
    height: 20
  }
});

renderItem = todo => (
    <TouchableOpacity style={styles.listItem} key={todo.id} onPress={() => onUpdate({ ...todo, done: !todo.done})}>
        <Text style={styles.bullet}>-</Text>
        <Text style={[styles.text, todo.done && styles.textDone]}>
        {todo.text} 
        </Text>
        <TouchableHighlight style={styles.delete} onPress={() => onDelete(todo)}>
            <Text style={styles.deleteText}>X</Text>
        </TouchableHighlight>
    </TouchableOpacity>
);


renderSeparator = () => {
    return <View style={styles.separator} />;
};


renderEmptyComponent = () => (
    <View style={styles.emptyList}>
      <Text>Lista Vacia</Text>
    </View>
);

const TodoList = ({todos, onUpdate, onDelete}) => (
    <FlatList
        style={styles.container}
        data={todos}
        keyExtractor={todo => todo.id}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmptyComponent}
    />
    // <ScrollView contentContainerStyle={styles.container}>
    //     {todos.map( todo => (
    //         <TouchableOpacity style={styles.listItem} key={todo.text} onPress={() => onUpdate({ ...todo, done: !todo.done})}>
    //             <Text style={styles.bullet}>-</Text>
    //             <Text style={[styles.text, todo.done && styles.textDone]}>
    //                 {todo.text} 
    //             </Text>
    //             <TouchableHighlight style={styles.delete} onPress={() => onDelete(todo)}>
    //                 <Text style={styles.deleteText}>X</Text>
    //             </TouchableHighlight>
    //         </TouchableOpacity>
    //     ))}
    // </ScrollView>
);

export default TodoList;
