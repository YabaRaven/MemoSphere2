import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { IconButton } from 'react-native-paper';
// import { IconButton } from 'react-native-paper';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [visibleIndex, setVisibleIndex] = useState(null);

  const addTask = () => {
    if (text) {
      const timestamp = new Date().toLocaleString();
      const taskObject = { text, timestamp };

      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = taskObject;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, taskObject]);
      }

      setText('');
    }
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setText(taskToEdit.text);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const openOptions = (index) => {
    setVisibleIndex(index === visibleIndex ? null : index);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.timestampText}>{item.timestamp}</Text>
      <Text style={styles.taskText}>{item.text}</Text>
      <View style={styles.itemList}>
        {visibleIndex === index && (
          <View style={styles.taskButtons}>
            <TouchableOpacity onPress={() => editTask(index)}>
            <IconButton
                icon="playlist-edit"
                // iconColor={MD3Colors.error50}
                size={20}
                onPress={() => editTask(index)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <IconButton
                icon="delete"
                // iconColor={MD3Colors.error50}
                size={20}
                onPress={() => deleteTask(index)}
              /> 
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={() => openOptions(index)}>
          <Text style={styles.optionsButton}>☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Good day!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write your day here..."
            value={text}
            onChangeText={(inputText) => setText(inputText)}
          />

          <TouchableOpacity onPress={addTask} style={styles.addButton}>
            <Text style={styles.addButtonText}>
              {editIndex !== -1 ? 'Edit Day' : 'Post Day'}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    padding: 16,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a2525',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  input: {
    flex: 1,
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#004AAD',
    padding: 12, 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  task: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  timestampText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  taskText: {
    fontSize: 18,
    color: '#1a2525',
    marginBottom: 8,
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  optionsButton: {
    color: '#004AAD',
    fontWeight: 'bold',
    fontSize: 25,
    marginRight: 0,
  },
  taskButtons: {
    // flexDirection: 'row',
    // marginLeft: 12,
    flexDirection: "row",
    marginLeft: 80,
    marginTop: 40,
  },
  editButton: {
    color: '#009900',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  deleteButton: {
    color: '#990000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});

export default HomePage;

