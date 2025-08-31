import { useState } from "react";

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

const Todo = () => {
    const [task, setTask] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [todos, setTodos] = useState<TodoItem[]>([
        { id: 1, text: "Learn React", completed: false },
        { id: 2, text: "Build a Todo App", completed: false },
        { id: 3, text: "Play with Tailwind CSS", completed: false },
        { id: 4, text: "Learn Vite", completed: false },
    ]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event?.target.value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (task.trim() !== "") {
            if (editingId) {
                setTodos(todos.map(todo => 
                    todo.id === editingId ? { ...todo, text: task } : todo
                ));
                setEditingId(null);
            } else {
                const newTodo: TodoItem = {
                    id: Date.now(),
                    text: task,
                    completed: false
                };
                setTodos([...todos, newTodo]);
            }
            setTask("");
        }
    };

    const deleteTask = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const startEdit = (id: number, text: string) => {
        setEditingId(id);
        setTask(text);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTask("");
    };

    const clearInput = () => {
        setTask("");
    };

    return (
        <div className="max-w-lg mx-auto pt-16 px-6 pb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            ✓
                        </div>
                        Todo App
                    </h1>
                    <p className="text-indigo-100 mt-1">Stay organized, stay productive</p>
                </div>

                <div className="p-8">
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                id="task"
                                name="task"
                                value={task}
                                onChange={onChange}
                                placeholder={editingId ? "Update your task..." : "What needs to be done?"}
                                className="w-full px-6 py-4 pr-12 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-400"
                            />
                            {task && (
                                <button
                                    type="button"
                                    onClick={clearInput}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className={`${editingId ? 'flex-1' : 'w-full'} bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl`}
                            >
                                {editingId ? 'Update Task' : 'Add Task'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="px-8 pb-8">
                    {todos.length > 0 ? (
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Tasks ({todos.length}) • {todos.filter(t => t.completed).length} completed
                                {editingId && <span className="text-indigo-600 text-sm font-normal ml-2">• Editing mode</span>}
                            </h2>
                            {todos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-200 border ${
                                        editingId === todo.id
                                            ? 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
                                            : todo.completed 
                                                ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                                                : 'bg-gray-50 hover:bg-gray-100 border-gray-100 hover:border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <button
                                            onClick={() => toggleComplete(todo.id)}
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                todo.completed
                                                    ? 'bg-green-500 border-green-500 text-white'
                                                    : 'border-gray-300 hover:border-indigo-400'
                                            }`}
                                        >
                                            {todo.completed && (
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                        <span className={`font-medium ${
                                            editingId === todo.id
                                                ? 'text-indigo-700'
                                                : todo.completed 
                                                    ? 'text-green-700 line-through' 
                                                    : 'text-gray-700'
                                        }`}>
                                            {editingId === todo.id ? '✏️ Editing...' : todo.text}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => startEdit(todo.id, todo.text)}
                                            disabled={editingId !== null}
                                            className={`p-3 rounded-xl transition-all ${
                                                editingId !== null
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-400 hover:text-indigo-500 hover:bg-indigo-50'
                                            }`}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => deleteTask(todo.id)}
                                            disabled={editingId !== null}
                                            className={`p-3 rounded-xl transition-all ${
                                                editingId !== null
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                            }`}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <p className="text-gray-500 font-medium">No tasks yet</p>
                            <p className="text-gray-400 text-sm mt-1">Add your first task above</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Todo;