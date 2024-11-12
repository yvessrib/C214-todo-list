import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToDoList } from '../src/ToDoList';

describe('ToDoList Component', () => {
  
  it('renders the todo list with an empty state', () => {
    render(<ToDoList />);
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
    expect(screen.getByText('No tasks defined')).toBeInTheDocument();
  });

  it('should add a new task', async () => {
    render(<ToDoList />);
    
    const input = screen.getByPlaceholderText('Add a new task');
    await userEvent.type(input, 'New Task');
    
    const addButton = screen.getByText('Add task');
    await userEvent.click(addButton);
    
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('should toggle task completion', async () => {
    render(<ToDoList />);
    
    const input = screen.getByPlaceholderText('Add a new task');
    await userEvent.type(input, 'New Task');
    const addButton = screen.getByText('Add task');
    await userEvent.click(addButton);
    
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    
    expect(screen.getByText('New Task')).toHaveClass('line-through');
  });

  it('should filter tasks based on search term', async () => {
    render(<ToDoList />);
    
    const input = screen.getByPlaceholderText('Add a new task');
    await userEvent.type(input, 'Buy groceries');
    const addButton = screen.getByText('Add task');
    await userEvent.click(addButton);
    
    await userEvent.type(input, 'Walk the dog');
    await userEvent.click(addButton);
    
    const searchInput = screen.getByPlaceholderText('Search tasks by name');
    await userEvent.type(searchInput, 'groceries');
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.queryByText('Walk the dog')).not.toBeInTheDocument();
  });

  it('should remove a task when clicking the trash button', async () => {
    render(<ToDoList />);
    
    const input = screen.getByPlaceholderText('Add a new task');
    await userEvent.type(input, 'New Task');
    const addButton = screen.getByText('Add task');
    await userEvent.click(addButton);
    
    const trashButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(trashButton);
    
    expect(screen.queryByText('New Task')).not.toBeInTheDocument();
  });

  it('should toggle filter correctly', async () => {
    render(<ToDoList />);
    
    const input = screen.getByPlaceholderText('Add a new task');
    await userEvent.type(input, 'Task 1');
    const addButton = screen.getByText('Add task');
    await userEvent.click(addButton);
    
    await userEvent.type(input, 'Task 2');
    await userEvent.click(addButton);
    
    const checkbox = screen.getAllByRole('checkbox')[0];
    await userEvent.click(checkbox);
    
    const selectFilter = screen.getByRole('combobox');
    await userEvent.selectOptions(selectFilter, 'complete');
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });
});
