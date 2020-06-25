import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from '../UI/ErrorModal'

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState();

  useEffect(() => {
    console.log("Rerender:", userIngredients)
  }, [userIngredients])


  const addIngredientHandler = (ingredient) => {
    setIsLoading(true)
    fetch('https://react-update-hooks-347e1.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIsLoading(false)
      return response.json();
    }).then(data => {
      setUserIngredients((prevIngredients) => [
        ...prevIngredients,
        { id: data.name, ...ingredient },
      ])
    })
  };

  const removeIngredientHandler = (idIngredient) => {
    setIsLoading(true)
    fetch(`https://react-update-hooks-347e1.firebaseio.com/ingredients/${idIngredient}.json`, {
      method: 'DELETE',
    }).then(response => {
      setIsLoading(false)
      const filteredIngredients = userIngredients.filter(el => el.id !== idIngredient)
      setUserIngredients(filteredIngredients)
    }).catch(error => {
      setError("something went wrong!")
    })

  }

  const filteredIngredientsHandler = useCallback(
    filteredIngredients => {
      setUserIngredients(filteredIngredients)
    }, [])


  const clearError = () => {
    setError(null);
    setIsLoading(false)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadingIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
