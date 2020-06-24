import React, { useState, useEffect, } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadingIngredients } = props;
  const [enterFilter, setEnterFilter] = useState('')

  useEffect(() => {
    const query = enterFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enterFilter}"`
    fetch('https://react-update-hooks-347e1.firebaseio.com/ingredients.json' + query) //eslint-disable-line
      .then(response => response.json())
      .then(data => {
        const loadedData = [];
        for (const key in data) {
          loadedData.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount
          })
        }
        onLoadingIngredients(loadedData)
      })
  }, [enterFilter, onLoadingIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
            value={enterFilter}
            onChange={event => setEnterFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
