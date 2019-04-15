import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    async function fetchValues() {
      const values = await axios.get('/api/values/current');
      setValues(values.data);
    }
    fetchValues();
    async function fetchIndexes() {
      try {
        const seenIndexes = await axios.get('/api/values/all');
        setSeenIndexes(seenIndexes.data);
      } catch (error) {
        console.log(error);
        setSeenIndexes([]);
      }
    }
    fetchIndexes();
  }, [index]);

  function renderSeenIndexes() {
    console.log('dd',seenIndexes)
    return seenIndexes.map(({ number }) => {
      return number;
    }).join(', ');
  }

  function renderValues() {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
    return entries;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post('/api/values', {
      index,
    });
    setIndex('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={e => setIndex(e.target.value)}/>
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;