import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Elevation, TextField } from 'rmwc';
import { RecipeList, FormulaInput, RecipeIngredientsList, ValidationMessage } from 'components';
import { addRecipe } from 'data/slices/RecipeSlice';
import { parseFormula, validateRecipe } from 'helpers';

import styles from './DashboardView.module.scss';

const DashboardView = () => {
  const dispatch = useDispatch();
  const recipeLibrary = useSelector(state => state.recipeLibrary);
  const [shoppingListIngredients, setShoppingListIngredients] = useState([]);
  const [validationErrors, setValidationErrors] = useState();
  const [nameInputInvalid, setNameInputInvalid] = useState();
  const [formulaValue, setFormulaValue] = useState('');
  const nameInput = useRef();

  const handleFormulaInputChange = (value) => {
    setFormulaValue(value);
  };

  const handleAddRecipeClick = () => {
    const recipeName = nameInput.current.value;
    if (!recipeName) { setNameInputInvalid(true); }

    const recipeComponents = parseFormula(formulaValue);
    validateRecipe({ recipeName, recipeComponents, recipeLibrary }).then(() => {
      setValidationErrors(null);
      dispatch(addRecipe({
        name: recipeName,
        ingredients: recipeComponents
      }));
    }).catch(setValidationErrors);
  };

  const updateShoppingList = () => {
    if (!recipeLibrary?.length) { return; }
    let shoppingList = {};
    recipeLibrary.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (shoppingList[ingredient.name]) {
          shoppingList[ingredient.name].quantity += Number(ingredient.quantity);
        } else {
          shoppingList[ingredient.name] = { ...ingredient };
        }
      });
    });
    setShoppingListIngredients(Object.values(shoppingList));
  };
  useEffect(updateShoppingList, [recipeLibrary]);

  return <div className={styles.DashboardView}>
    <Elevation z={2} className={styles.AddRecipeContainer}>
      <div className={styles.AddRecipeTitle}>Add a recipe</div>
      <TextField 
          outlined
          fullwidth 
          placeholder="Recipe name"
          inputRef={nameInput}
          invalid={nameInputInvalid}
          onChange={() => setNameInputInvalid(false)}
      />
      <FormulaInput 
          onChange={handleFormulaInputChange}
          placeholderText="Recipe formula"
      />
      <ValidationMessage validationErrors={validationErrors} />
      <Button 
          unelevated
          label="Add recipe"
          onClick={handleAddRecipeClick}
      />
    </Elevation>
    <div className={styles.RecipeLibraryContainer}>
      <div className={styles.RecipeLibraryTitle}>Recipe Library</div>
      <RecipeList recipes={recipeLibrary} />
    </div>
    <div className={styles.ShoppingListContainer}>
      <div className={styles.ShoppingListTitle}>Shopping List</div>
      <RecipeIngredientsList ingredients={shoppingListIngredients} />
    </div>
  </div>;
};

export {
  DashboardView
};
export default DashboardView;