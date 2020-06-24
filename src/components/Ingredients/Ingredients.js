import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    setUserIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredient },
    ]);
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
