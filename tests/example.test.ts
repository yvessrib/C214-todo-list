import React from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { ToDoList } from '../src/ToDoList';

test('test rendered component', async () => {
  const { getByText } = render(
    React.createElement(ToDoList),
  );

  const noTasksMessage = getByText('No tasks defined');

  expect(noTasksMessage).toBeDefined();
});