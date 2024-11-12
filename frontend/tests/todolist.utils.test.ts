import { describe, it, expect } from 'vitest'
import { addTask, toggleComplete, removeTask } from '../src/ToDoList';

describe('Task utility functions', () => {

  let tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: false }
  ];

  it('should add a new task', () => {
    const newTasks = addTask(tasks, 'New Task');
    expect(newTasks).toHaveLength(3);
    expect(newTasks[newTasks.length - 1]).toEqual({
      id: 3, title: 'New Task', completed: false
    });
  });

  it('should toggle task completion', () => {
    const newTasks = toggleComplete(tasks, 1);
    expect(newTasks[0].completed).toBe(true);
  });

  it('should remove a task', () => {
    const newTasks = removeTask(tasks, 2);
    expect(newTasks).toHaveLength(1);
    expect(newTasks[0].id).toBe(1);
  });
});
