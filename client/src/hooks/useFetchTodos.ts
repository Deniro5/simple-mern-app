import { useState, useEffect } from "react";
import { Todo } from "../types";

const useFetchTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/todos");
      if (!response.ok)
        throw new Error("Unable to fetch todos, please try again");
      const todos = await response.json();
      setTodos(todos);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (newTodoName: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newTodoName,
          isComplete: false,
        }),
      });
      if (!response.ok)
        throw new Error(
          "There was an error creating the new item. Please try again"
        );
      //we need to update the list here
      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (err) {
      const error = err as Error;
      console.log(error);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/todos/" + updatedTodo._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updatedTodo.name,
            isComplete: updatedTodo.isComplete,
          }),
        }
      );
      if (!response.ok)
        throw new Error(
          "There was an error updating the item. Please try again"
        );
      //we need to update the list here
      const newTodo = await response.json();
      const index = todos.findIndex((todo) => todo._id === newTodo._id);
      if (index !== -1) {
        setTodos((prevTodos) =>
          prevTodos.map((todo, i) => (i === index ? newTodo : todo))
        );
      }
    } catch (err) {
      const error = err as Error;
      console.log(error);
    }
  };

  const deleteTodo = async (idToDelete: string) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/todos/" + idToDelete,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok)
        throw new Error(
          "There was an error deleting the item. Please try again"
        );
      //we need to update the list here
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== idToDelete)
      );
    } catch (err) {
      const error = err as Error;
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    createTodo,
    deleteTodo,
    updateTodo,
  };
};

export default useFetchTodos;
