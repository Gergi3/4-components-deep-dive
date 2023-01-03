import { useEffect, useState } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { Spinner } from "./Spinner";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/todos')
            .then(res => res.json())
            .then(res => {
                setTodos(Object.values(res));
            })
    }, [])

    const onStatusChangeHandler = (todo) => {
        fetch(`http://localhost:3030/jsonstore/todos/${todo._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({...todo, isCompleted: !todo.isCompleted})
        })
            .then(res => res.json())
            .then(modified => {
                setTodos(todos => todos.map(x => x._id == modified._id ? modified : x))
            })
            .catch(err => console.log(err))
    }

    const createdHandler = (todo) => {
        setTodos(prevTodos => [...prevTodos, todo])
    }


    if (!todos.length) {
        return (
            <Spinner />
        );
    }

    return (
        <div>
            <AddTodoForm passCreatedUp={createdHandler} />
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-header-task">Task</th>
                        <th className="table-header-status">Status</th>
                        <th className="table-header-action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => <TodoItem key={todo._id} {...todo} onClick={onStatusChangeHandler} />)}
                </tbody>
            </table>
        </div>
    );
}