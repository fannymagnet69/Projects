import { render, screen } from '@testing-library/react';
import FoodTracker from './FoodTracker';

test('renders food tracker title', () => {
  render(<FoodTracker />);
  const titleElement = screen.getByText(/food tracker/i);
  expect(titleElement).toBeInTheDocument();
});

test('adds food item to list', () => {
  render(<FoodTracker />);
  const inputElement = screen.getByPlaceholderText('Enter food item');
  const addButton = screen.getByRole('button', { name: 'Add' });

  // Type into input and click Add button
  fireEvent.change(inputElement, { target: { value: 'apple' } });
  fireEvent.click(addButton);

  // Check if apple is in the list
  const listElement = screen.getByRole('list');
  const appleElement = screen.getByText(/apple/i);
  expect(listElement).toContainElement(appleElement);
});

test('updates total calories', () => {
  render(<FoodTracker />);
  const inputElement = screen.getByPlaceholderText('Enter calories');
  const addButton = screen.getByRole('button', { name: 'Add' });

  // Add two items with different calorie counts
  fireEvent.change(screen.getByPlaceholderText('Enter food item'), { target: { value: 'apple' } });
  fireEvent.change(inputElement, { target: { value: '100' } });
  fireEvent.click(addButton);

  fireEvent.change(screen.getByPlaceholderText('Enter food item'), { target: { value: 'banana' } });
  fireEvent.change(inputElement, { target: { value: '50' } });
  fireEvent.click(addButton);

  // Check if total calories is correct
  const totalCaloriesElement = screen.getByText(/total calories/i);
  expect(totalCaloriesElement).toHaveTextContent('150');
});
