
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import { IconButton } from 'react-native-paper';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [isTaskInputVisible, setTaskInputVisible] = useState(true);
  const [isFolderModalVisible, setFolderModalVisible] = useState(false);
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(null); // New state variable
  const [folderInputs, setFolderInputs] = useState({});
  const [editTaskText, setEditTaskText] = useState('');
  const [editFolderName, setEditFolderName] = useState('');
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const [editFolderModalVisible, setEditFolderModalVisible] = useState(false);

  const addTask = () => {
    if (folderInputs[selectedFolderIndex]) {
      const timestamp = new Date().toLocaleString();
      const taskObject = { text: folderInputs[selectedFolderIndex], timestamp };
      const updatedFolders = [...folders];
      updatedFolders[selectedFolderIndex].tasks.push(taskObject);
      setFolders(updatedFolders);
      setFolderInputs((prevInputs) => ({
        ...prevInputs,
        [selectedFolderIndex]: '', // Reset input text after adding task
      }));
    }
  };

  const addFolder = () => {
    if (folderName) {
      const folderObject = { name: folderName, tasks: [] };
      setFolders([...folders, folderObject]);
      setFolderName('');
      setFolderModalVisible(false);
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = folders[selectedFolderIndex].tasks[index];
    setEditTaskText(taskToEdit.text);
    setEditIndex(index);
    setEditTaskModalVisible(true);
  };
  const handleEditTaskSave = () => {
    const updatedFolders = [...folders];
    updatedFolders[selectedFolderIndex].tasks[editIndex].text = editTaskText;
    setFolders(updatedFolders);
    setEditTaskModalVisible(false);
  };


  const handleDeleteTask = (index) => {
    const updatedFolders = [...folders];
    updatedFolders[selectedFolderIndex].tasks.splice(index, 1);
    setFolders(updatedFolders);
  };

  const handleEditFolder = (index) => {
    const folderToEdit = folders[index];
    setEditFolderName(folderToEdit.name);
    setEditIndex(index);
    setEditFolderModalVisible(true);
  };

  const handleEditFolderSave = () => {
    const updatedFolders = [...folders];
    updatedFolders[editIndex].name = editFolderName;
    setFolders(updatedFolders);
    setEditFolderModalVisible(false);
  };

  const handleDeleteFolder = (index) => {
    const updatedFolders = [...folders];
    updatedFolders.splice(index, 1);
    setFolders(updatedFolders);
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
            <TouchableOpacity onPress={() => handleEditTask(index)}>
              <IconButton icon="playlist-edit" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTask(index)}>
              <IconButton icon="delete" size={20} />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={() => openOptions(index)}>
          <Text style={styles.optionsButton}>☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFolderItem = ({ item, index }) => (
    <View style={styles.folder}>
      <TouchableOpacity
        onPress={() => {
          setSelectedFolderIndex(index);
          setTaskInputVisible(true);
        }}
      >
        <Text style={styles.folderName}>{item.name}</Text>
      </TouchableOpacity>

      <FlatList
        data={item.tasks}
        renderItem={({ item, index }) => (
          <View style={styles.task}>
            <Text style={styles.timestampText}>{item.timestamp}</Text>
            <Text style={styles.taskText}>{item.text}</Text>
            <View style={styles.itemList}>
              <TouchableOpacity onPress={() => handleEditTask(index)}>
                <IconButton icon="playlist-edit" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                <IconButton icon="delete" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {isTaskInputVisible && selectedFolderIndex === index && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Share your day..."
            value={folderInputs[index] || ''}
            onChangeText={(inputText) =>
              setFolderInputs((prevInputs) => ({
                ...prevInputs,
                [index]: inputText,
              }))
            }
          />
          <TouchableOpacity onPress={() => addTask(index)}>
            <Text style={styles.postButton}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEditFolder(index)}>
            <IconButton icon="playlist-edit" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteFolder(index)}>
            <IconButton icon="delete" size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Memosphere</Text>
        <TouchableOpacity
          onPress={() => setFolderModalVisible(true)}
          style={styles.createFolderButton}
        >
          <Text style={styles.createFolderButtonText}>Create Folder</Text>
        </TouchableOpacity>
        <FlatList
          data={folders}
          renderItem={renderFolderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFolderModalVisible}
        onRequestClose={() => {
          setFolderModalVisible(!isFolderModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter Folder Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Folder Name"
            value={folderName}
            onChangeText={(text) => setFolderName(text)}
          />
          <Pressable style={styles.modalButton} onPress={addFolder}>
            <Text style={styles.modalButtonText}>Create Folder</Text>
          </Pressable>
        </View>
      </Modal>
      {/* Edit Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editTaskModalVisible}
        onRequestClose={() => setEditTaskModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Task:</Text>
          <TextInput
            style={styles.input}
            placeholder="Edit Task"
            value={editTaskText}
            onChangeText={(text) => setEditTaskText(text)}
          />
          <Pressable style={styles.modalButton} onPress={() => setEditTaskModalVisible(false)}>
            <Text style={styles.modalButtonText} onPress={handleEditTaskSave}>Save Task</Text>
          </Pressable>
        </View>
      </Modal>
      {/* Edit Folder Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editFolderModalVisible}
        onRequestClose={() => setEditFolderModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Folder Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Edit Folder Name"
            value={editFolderName}
            onChangeText={(text) => setEditFolderName(text)}
          />
          <Pressable style={styles.modalButton} onPress={() => setEditFolderModalVisible(false)}>
            <Text style={styles.modalButtonText} onPress={handleEditFolderSave}>Save Folder</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postButton: {
    backgroundColor: '#004AAD',
    padding: 10, 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 16,
    textAlign: 'center',
  },
  createFolderButton: {
    backgroundColor: '#004AAD',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  createFolderButtonText: {
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
    flexDirection: 'row',
    marginLeft: 80,
    marginTop: 40,
  },
    timestampText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  modalButton: {
    backgroundColor: '#004AAD',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  folder: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    marginTop: 16,
    },
  folderName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default HomePage;


