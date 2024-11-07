import { createContext, useState } from "react";

interface TaskContextType {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskContextProps {
  tasks: TaskContextType[];
  addTask: (title: string) => void;
  toogleComplete: (taskId: number) => void;
  removeTask: (taskId: number) => void;
  filter: 'all' | 'complete' | 'incomplete';
  setFilter: React.Dispatch<React.SetStateAction<'all' | 'complete' | 'incomplete'>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredTasks: TaskContextType[]
}

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

interface TaskContextProviderProps {
  children: React.ReactNode;
}

export const TaskContextProvider = ({children} : TaskContextProviderProps) => {
  const [tasks, setTasks] = useState<TaskContextType[]>([]);
  const [filter, setFilter] = useState<"all" | "complete" | "incomplete">("all");
  const [searchTerm, setSearchTerm] = useState("");

  function addTask (title: string) {
    const newTask: TaskContextType = {
      id: tasks.length + 1,
      title,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  function toogleComplete (taskId: number) {
    setTasks(tasks.map(task => 
      task.id === taskId? {...task, completed:!task.completed } : task
    ))
  }

  function removeTask (taskId: number) {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "complete" && task.completed) return true;
    if (filter === "incomplete" &&!task.completed) return true;
    return false;
  }).filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      toogleComplete,
      removeTask,
      filter,
      setFilter,
      searchTerm,
      setSearchTerm,
      filteredTasks
    }}>
      {children}
    </TaskContext.Provider>
  )

}