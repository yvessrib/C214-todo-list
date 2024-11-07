import { TaskContextProvider } from "./contexts/tasks";
import "./index.css"
import { ToDoList } from "./ToDoList";

export default function App() {

  return (
    <>
      <div className="w-screen h-screen bg-zinc-800">
        <TaskContextProvider>
          <ToDoList />
        </TaskContextProvider>
      </div>
    </>
  )
}
