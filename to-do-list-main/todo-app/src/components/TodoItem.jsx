import { useState } from "react";

function TodoItem({ todo, toggleComplete, editTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && newText.trim()) {
      editTodo(todo.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit} 
          autoFocus
        />
      ) : (
        <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
      )}
      <div>
        <button className="edit" onClick={handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="delete" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
