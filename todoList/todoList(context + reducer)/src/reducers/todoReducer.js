export const initialState = {
    todos: [],
    input: '',
    editingId: null,
    editingText:'',
};

export const todoReducer = (state, action) => {
  switch (action.type) {    
    case 'SET_TODOS':
      return { ...state, todos: Array.isArray(action.payload) ? action.payload : [],
      };
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    case 'ADD_TODO':
      return {
        ...state,
        input: '',
        todos: Array.isArray(state.todos)
          ? [...state.todos, action.payload]
          : [action.payload]
    };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: action.payload.completed }
            : todo
        ),
      };
    case 'START_EDIT':
      return {
        ...state,
        editingId: action.payload.id,
        editingText: action.payload.title,
      };
    case 'SET_EDITING_TEXT':
      return { ...state, editingText: action.payload };
    case 'FINISH_EDIT':
      return {
        ...state,
        editingId: null,
        editingText: '',
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;