import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchTodos, addTodo, editTodo, deleteTodo } from '../features/todos/todosSlice';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const tasks = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addOrEditTask = () => {
    if (task) {
      if (editTaskId) {
        dispatch(editTodo({ id: editTaskId, text: task }));
        setEditTaskId(null);
      } else {
        dispatch(addTodo(task));
      }
      setTask('');
    }
  };

  const startEditTask = (id, text) => {
    setEditTaskId(id);
    setTask(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Thêm hoặc chỉnh sửa công việc"
        value={task}
        onChangeText={setTask}
      />
      <Button title={editTaskId ? "Cập nhật" : "Thêm"} onPress={addOrEditTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.text}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => startEditTask(item.id, item.text)}>
                <Text style={styles.editText}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
                <Text style={styles.deleteText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  buttons: {
    flexDirection: 'row',
  },
  editText: {
    color: 'blue',
    marginRight: 10,
  },
  deleteText: {
    color: 'red',
  },
});

export default TodoApp;
