import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleCreateNewTask = () => {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    const newTask = {
      id: Math.floor(Math.random() * Math.floor(1000)),
      title: newTaskTitle,
      isComplete: false,
    };

    if (newTaskTitle !== "") {
      setTasks([...tasks, newTask]);
    } else {
      alert("Você não digitou o nome da tarefa!");
    }
  };

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const toggledTask = tasks.find((task) => task.id === id);

    if (toggledTask) {
      toggledTask.isComplete = !toggledTask.isComplete;

      const newArray = filterArray(tasks, id);

      setTasks([...newArray, toggledTask]);
    }
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newArray = filterArray(tasks, id);

    newArray.sort((array) => (array.isComplete ? -1 : 1));

    setTasks(newArray);
  }

  const filterArray = (array: Task[], id: number) =>
    array.filter((task) => task.id !== id);

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
