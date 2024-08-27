import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numberType, setNumberType] = useState('e'); // Default number type
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle selection change
  const handleTypeChange = (event) => {
    setNumberType(event.target.value);
  };

  // Function to fetch numbers from the backend
  const fetchNumbers = async () => {
    setLoading(true); // Set loading state
    setError(null);   // Clear any previous errors

    try {
      // Make an HTTP GET request to the backend API
      
      const result = await axios.get(`http://localhost:9876/numbers/${numberType}`);
      setResponse(result.data); // Set response data
    } catch (err) {
      setError('Failed to fetch data. Please try again.'); // Handle errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container">
      <h1>Average Calculator</h1>
      <div>
        <label>Select Number Type:</label>
        <select value={numberType} onChange={handleTypeChange}>
          <option value="p">Prime</option>
          <option value="f">Fibonacci</option>
          <option value="e">Even</option>
          <option value="r">Random</option>
        </select>
        <button onClick={fetchNumbers} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Numbers'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {response && (
        <div className="response">
          <h2>Response</h2>
          <p><strong>Previous State:</strong> {JSON.stringify(response.windowPrevState)}</p>
          <p><strong>Current State:</strong> {JSON.stringify(response.windowCurrState)}</p>
          <p><strong>Fetched Numbers:</strong> {JSON.stringify(response.numbers)}</p>
          <p><strong>Average:</strong> {response.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;
