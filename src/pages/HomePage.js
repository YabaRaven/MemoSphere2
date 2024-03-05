import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { IconButton } from 'react-native-paper';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [visibleIndex, setVisibleIndex] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [isTaskInputVisible, setTaskInputVisible] = useState(true);


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

  const renderNotes = () => {
    const filteredNotes = tasks.filter(
      (task) =>
        task.text?.toLowerCase().includes(searchText.toLowerCase())
    );

    const exactMatch = [];
    const partialMatch = [];

    filteredNotes.forEach((task) => {
      if (task.text?.toLowerCase() === searchText.toLowerCase()) {
        exactMatch.push(task);
      } else {
        partialMatch.push(task);
      }
    });

    if (exactMatch.length > 0 || partialMatch.length > 0) {
      return (
        <View>
          {exactMatch.length > 0 && (
            <>
              <Text style={styles.searchHeader}>Matching Result:</Text>
              <FlatList
                data={exactMatch}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          )}
          {partialMatch.length > 0 && (
            <>
              <Text style={styles.searchHeader}>Results:</Text>
              <FlatList
                data={partialMatch}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          )}
        </View>
      );
    }

    return (
      <View>
        <Text>No matching tasks found.</Text>
      </View>
    );
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
                size={20}
                onPress={() => editTask(index)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <IconButton
                icon="delete"
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
      <FlatList
        data={[{}]} // Add a dummy item to make FlatList work as a ScrollView
        renderItem={() => (
          <View style={styles.content}>
            <Text style={styles.title}>Good day!</Text>
            <View style={styles.inputContainer}>
              {isTaskInputVisible ? (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Write your day here..."
                    value={text}
                    onChangeText={(inputText) => setText(inputText)}
                  />
                  <TouchableOpacity
                    onPress={addTask}
                    style={styles.postButton}
                  >
                    <Text style={styles.toggleButtonText}>
                      {editIndex !== -1 ? 'Modify' : 'Share'}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder="Search tasks..."
                  value={searchText}
                  onChangeText={(search) => setSearchText(search)}
                />
              )}
              <TouchableOpacity
                onPress={() => setTaskInputVisible(!isTaskInputVisible)}
                style={styles.toggleButton}
              >
                <Text style={styles.toggleButtonText}>
                  {isTaskInputVisible ? 'Search' : 'Memo'}
                </Text>
              </TouchableOpacity>
            </View>
            {renderNotes()}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (existing styles)
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  postButton: {
    backgroundColor: '#004AAD',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  toggleButton: {
    backgroundColor: '#004AAD',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  searchInput: {
    
  },//
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },//
    container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    padding: 16,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004AAD',
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
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin: 10,
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
  searchHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
});

export default HomePage;


