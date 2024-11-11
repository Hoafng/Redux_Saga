import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { todoState } from '../recoil/todoAtom';

const TodoList = () => {
    const [todos, setTodos] = useRecoilState(todoState);
    const [titleInput, setTitleInput] = useState('');

    useEffect(() => {
        const fetchTodos = async() => {
            try {
                const response = await axios.get('https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo');
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, [setTodos]);

    const handleAdd = async() => {
        if (titleInput.trim()) {
            try {
                const newTodo = { title: titleInput.trim() };
                const response = await axios.post('https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo', newTodo);
                setTodos((prevTodos) => [...prevTodos, response.data]);
                setTitleInput('');
            } catch (error) {
                console.error('Error adding todo:', error);
                Alert.alert("Error", "Unable to add Todo. Please try again.");
            }
        } else {
            Alert.alert("Input Error", "Please enter a title");
        }
    };

    const handleRemove = async(id) => {
        try {
            await axios.delete(`https://65658a50eb8bb4b70ef1c04b.mockapi.io/api/Todo/${id}`);
            setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error removing todo:', error);
            Alert.alert("Error", "Unable to remove Todo. Please try again.");
        }
    };

    return ( <
        View style = {
            { padding: 20 }
        } >
        <
        TextInput style = {
            { borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }
        }
        value = { titleInput }
        onChangeText = { setTitleInput }
        placeholder = "Add Lion Name" /
        >
        <
        Button title = "Add Todo"
        onPress = { handleAdd }
        /> <
        FlatList data = { todos }
        keyExtractor = {
            (item) => item.id.toString()
        }
        renderItem = {
            ({ item }) => ( <
                View style = {
                    { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }
                } >
                <
                Text > { item.title } < /Text> <
                TouchableOpacity onPress = {
                    () => handleRemove(item.id)
                }
                style = {
                    { borderWidth: 1, width: '30%', alignItems: 'center' }
                } >
                <
                Text style = {
                    { color: 'red' }
                } > Remove < /Text> < /
                TouchableOpacity > <
                /View>
            )
        }
        /> < /
        View >
    );
};

export default TodoList;