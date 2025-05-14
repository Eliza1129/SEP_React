export const APIs = (() => {
    const baseURL = "http://localhost:3001/todos";
  
    const getTodos = () => {
      return fetch(baseURL).then((res) => res.json());
    };
  
    const createTodo = (todo) => {
      return fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }).then((res) => res.json());
    };
  
    const updateTodo = (id, updatedData) => {
      return fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }).then((res) => res.json());
    };
  
    const deleteTodo = (id) => {
      return fetch(`${baseURL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete todo");
        }
        return true;
      });
    };
  
    return { getTodos, createTodo, updateTodo, deleteTodo };
  })();
  

