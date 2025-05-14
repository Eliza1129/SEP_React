import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onDelete, onToggleComplete, onFinishEdit }) {
  return todos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onDelete={onDelete}
      onToggleComplete={onToggleComplete}
      onFinishEdit={onFinishEdit}
    />
  ));
}

export default TodoList;
