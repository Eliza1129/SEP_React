```markdown
# 📝 React Todo List App

A simple yet powerful Todo List application built with **React**, featuring editable tasks, pending/completed separation, and responsive interaction.

## 🚀 Features

- ✅ **Add Tasks** – Enter a task and click "Submit" to add it.
- 🔁 **Toggle Complete** – Move tasks between *Pending* and *Completed* lists by clicking arrow/undo buttons.
- ✏️ **Edit Tasks** – Click "Edit" to make the task editable. Click again to save.
- 🗑️ **Delete Tasks** – Permanently remove a task from the list.
- 💡 **React Hooks** – Built using `useState`, `useEffect`, `useRef`, `useCallback`, and `useMemo`.
- 🧩 **Component-Based Architecture** – Modular structure: `InputBar`, `TodoList`, `TodoItem`.

## 🛠️ Tech Stack

- **Frontend:** React (with Hooks)
- **Mock Backend:** JSON Server (optional)
- **Styling:** Vanilla CSS

## 📁 Folder Structure

```

src/
├── components/
│   ├── InputBar.jsx
│   ├── TodoItem.jsx
│   └── TodoList.jsx
├── api.js
├── App.jsx
├── App.css
└── index.js
db.json          # For json-server

````

---

## 🧪 Getting Started

### 1. Clone the repo

bash
git clone https://github.com/your-username/react-todo-list.git
cd react-todo-list


### 2. Install dependencies

bash
npm install


### 3. (Optional) Start mock backend with `json-server`

bash
npx json-server --watch db.json --port 3001

### 4. Start the React app

bash
npm start

## 📌 Project Notes

* Task state is separated as `pending` and `completed` using `.filter()` and cached with `useMemo`.
* `TodoItem` manages its own edit state with local `useState`, making it fully encapsulated.
* Smooth user experience with auto-focus and function caching using `useRef` and `useCallback`.


## 🧩 TODO (Enhancements)

* [ ] Prevent saving empty tasks
* [ ] Add keyboard shortcuts (Enter to save, Esc to cancel)
* [ ] Add due dates and sorting
* [ ] Add animations when toggling lists


## 📄 License

MIT © 2025

```
