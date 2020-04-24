import React, { Fragment } from 'react';
import { Text, ScrollView, FlatList, SectionList, TouchableOpacity, TouchableHighlight, View, StyleSheet, Alert, Image } from 'react-native';
import { render } from 'react-dom';
import deleteImage from 'todoList/assets/delete.png'

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


const TodoList = ({todos, onUpdate, onDelete}) => {
    renderItem = todo => (
        <TouchableOpacity style={styles.listItem} key={todo.id} onPress={() => onUpdate({ ...todo, done: !todo.done})}>
            <Text style={styles.bullet}>-</Text>
            <Text style={[styles.text, todo.done && styles.textDone]}>
            {todo.text} 
            </Text>
            <TouchableHighlight style={styles.delete} onPress={() => onDelete(todo)}>
                <Image source={deleteImage} style={styles.icon}/>
            </TouchableHighlight>
        </TouchableOpacity>
    );
    
    
    renderSeparator = () => {
        return <View style={styles.separator} />;
    };
    
    
    renderEmptyComponent = () => (
        <View style={styles.emptyList}>
            <Image style={styles.emptyImage} source={require('todoList/assets/check.png')}/>
            <Text>Lista Vacia</Text>
        </View>
    );

    renderSectionHeader = ({ section: { title, data } }) => (
        <View style={styles.sectionHeader}>
          <Text>
            {title} ({data.length})
          </Text>
        </View>
    );
    
    return(
        <SectionList
        style={styles.container}
        sections={
            todos && todos.length
              ? [
                    {title:'ToDo', data: todos.filter(todo=> !todo.done)},
                    {title:'Terminadas', data: todos.filter(todo=> todo.done)}
                ]
              : []
        }
        keyExtractor={todo => todo.id}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmptyComponent}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true}
        />
    );
    
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
};


export default TodoList;
