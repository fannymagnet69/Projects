import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    // Fetch food list data from server
    fetch('/api/foodlist')
      .then(response => response.json())
      .then(data => setFoodList(data))
      .catch(error => console.error(error));
  }, []);

  const handleAddFood = (foodName) => {
    // Send POST request to server to add new food item
    fetch('/api/foodlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: foodName })
    })
      .then(response => response.json())
      .then(data => setFoodList([...foodList, data]))
      .catch(error => console.error(error));
  }

  const handleDeleteFood = (foodId) => {
    // Send DELETE request to server to remove food item
    fetch(`/api/foodlist/${foodId}`, {
      method: 'DELETE'
    })
      .then(() => setFoodList(foodList.filter(food => food.id !== foodId)))
      .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Food Tracker</h1>
      </header>
      <main>
        <section>
          <h2>Add Food Item</h2>
          <FoodForm onAddFood={handleAddFood} />
        </section>
        <section>
          <h2>Food List</h2>
          <FoodList foods={foodList} onDeleteFood={handleDeleteFood} />
        </section>
      </main>
    </div>
  );
}

function FoodForm({ onAddFood }) {
  const [foodName, setFoodName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddFood(foodName);
    setFoodName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="food-name">Name:</label>
      <input
        id="food-name"
        type="text"
        value={foodName}
        onChange={(event) => setFoodName(event.target.value)}
      />
      <button type="submit">Add Food</button>
    </form>
  );
}

function FoodList({ foods, onDeleteFood }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {foods.map(food => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>
              <button onClick={() => onDeleteFood(food.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
