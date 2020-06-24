import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-update-hooks-347e1.firebaseio.com/ingredients.json') //eslint-disable-line
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
        setUserIngredients(loadedData)
      })
  }, [])

  useEffect(() => {
    console.log("Rerender:", userIngredients)
  }, [userIngredients])


  const addIngredientHandler = (ingredient) => {
    fetch('https://react-update-hooks-347e1.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(data => {
      setUserIngredients((prevIngredients) => [
        ...prevIngredients,
        { id: data.name, ...ingredient },
      ])
    })
  };

  const removeIngredientHandler = (idIngredient) => {
    const filteredIngredients = userIngredients.filter(el => el.id !== idIngredient)
    setUserIngredients(filteredIngredients)
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
