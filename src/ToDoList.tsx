import { useContext } from 'react';
import { useState } from 'react';
import { Checkbox } from './components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { TaskContext } from './contexts/tasks';

export function ToDoList () {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const {
    addTask, 
    filter, 
    filteredTasks, 
    removeTask, 
    searchTerm, 
    setFilter, 
    setSearchTerm, 
    toogleComplete
  } = useContext(TaskContext)

  const handleAddTask = () => {
    addTask(newTaskTitle)
    setNewTaskTitle('')
  };

  return (
    <div className='text-white flex flex-col justify-center items-center p-5'>
      
      <h1 className='font-semibold text-3xl p-6'>To-Do List</h1>
      <div className='flex flex-col gap-4 w-full max-w-2xl'>
        <div className='flex gap-2' >
          <input 
            className='placeholder-zinc-700 px-2 flex-1 p-1 rounded text-black outline-1 outline-violet-500'
            type='text'
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task"
          />
          <button 
            className='bg-violet-500 hover:bg-violet-700 text-sm text-white font-bold py-2 px-4 rounded outline-1 outline-white'
            type='button' 
            onClick={() => handleAddTask()}>Add task</button>
        </div>
      
        <div className='flex gap-2'>
          <input 
            className='placeholder-zinc-700 px-2 flex-1 p-1 rounded text-black outline-1 outline-violet-500'
            id="search"
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks by name"
          />

          <select
            className='p-2 rounded text-black outline-1 outline-violet-500' 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as 'all' | 'complete' | 'incomplete')}
          >
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        

        <div>
          {filteredTasks && filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div key={task.id} className='flex justify-between items-center px-2 border-b-[1px] border-zinc-600'>
                <div className='flex items-center gap-2 py-4'>
                  <Checkbox  
                    checked={task.completed}
                    onCheckedChange={() => toogleComplete(task.id)}
                    className='bg-white outline-1 outline-violet-500'
                  />
                  <span className={`'text-white' ${task.completed ? 'line-through' : 'none'}`}>{task.title}</span>
                </div>
                <div className='flex items-center gap-4'>
                  <span className={`${task.completed ? 'text-green-500' : 'text-red-500'}`}>{task.completed ? 'Complete' : 'Incomplete'}</span>
                  <button type='button' onClick={() => removeTask(task.id)} className='outline-1 outline-violet-500'>
                    <Trash2 className='text-zinc-500 hover:text-red-500 ' size={22}/>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center font-semibold py-4 text-zinc-600'>
              No tasks defined
            </div>
          )

        }
        </div>
      </div>

    </div>
  );
};

