import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (task.trim()) {
      if (editingTask) {
        setTasks(
          tasks.map((t) => (t.id === editingTask.id ? { ...t, text: task } : t))
        );
        setEditingTask(null);
      } else {
        setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      }
      setTask("");
    }
  };

  const editTask = (taskToEdit) => {
    setTask(taskToEdit.text);
    setEditingTask(taskToEdit);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity
          onPress={() => editTask(item)}
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteTask(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>To Do App</Text>
        <View style={styles.taskBar}>
          <TextInput
            style={styles.input}
            placeholder="Add or edit a task"
            placeholderTextColor="#888"
            value={task}
            onChangeText={setTask}
          />
          <View style={styles.buttonContainer}>
            <Button title={editingTask ? "Update" : "Add"} onPress={addTask} />
          </View>
        </View>
      </View>

      <View style={styles.taskContainer}>
        {tasks.length === 0 ? (
          <View style={styles.noTasksContainer}>
            <Image
              source={require("./assets/task.png")}
              style={styles.noTasksImage}
            />
            <Text style={styles.noTasksText}>No task available</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.taskList}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },

  header: {
    height: "20%",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 30,
    color: "black",
    fontFamily: "Arial",
  },

  taskBar: {
    height: 60,
    width: "100%",
    backgroundColor: "#33ddff",
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 10,
    outlineWidth: 0,
  },

  buttonContainer: {
    height: "100%",
    justifyContent: "center",
  },

  taskContainer: {
    height: "80%",
    width: "95%",
    backgroundColor: "white",
  },

  taskList: {
    padding: 10,
  },

  taskItem: {
    backgroundColor: "#ff5533",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  taskText: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },

  taskButtons: {
    flexDirection: "row",
  },

  editButton: {
    backgroundColor: "#ffa500",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  deleteButton: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  noTasksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  noTasksImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  noTasksText: {
    fontSize: 18,
    color: "#888",
  },
});
