import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from 'data/slices/RecipeSlice';
import { Button, TextField } from 'rmwc';
import { FormulaInput, ValidationMessage } from 'components';
import { parseFormula, validateRecipe } from 'helpers';

import styles from './AddRecipeForm.module.scss';

const AddRecipeForm = ({ onAdd }) => {
  const dispatch = useDispatch();
  const recipeLibrary = useSelector(state => state.recipeLibrary);
  const [validationErrors, setValidationErrors] = useState();
  const [nameInputInvalid, setNameInputInvalid] = useState();
  const [formulaValue, setFormulaValue] = useState('');
  const nameInput = useRef();

  /**
   * @param {Object} recipeDetails 
   * @param {string} recipeDetails.name The name of the recipe
   * @param {Object[]} recipeDetails.ingredients List of ingredient components
   * @param {string} recipeDetails.ingredients[].name Name of the ingredient (e.g. "flour")
   * @param {string=} recipeDetails.ingredients[].unitOfMeasurement Label for the unit of measurement (e.g. "g", "ml") 
   * @param {string|Number} recipeDetails.ingredients[].quantity The numerical amount (e.g. 150, "150")
   */
  const addRecipeToLibrary = (recipeDetails) => {
    dispatch(addRecipe(recipeDetails));
    onAdd && onAdd(recipeDetails);
  };

  const handleFormulaInputChange = (value) => {
    setFormulaValue(value);
  };

  const handleAddRecipeClick = () => {
    const recipeName = nameInput.current.value;
    if (!recipeName) { setNameInputInvalid(true); }

    const recipeComponents = parseFormula(formulaValue);
    validateRecipe({ recipeName, recipeComponents, recipeLibrary })
        .then(() => {
          setValidationErrors(null);
          addRecipeToLibrary({
            name: recipeName,
            ingredients: recipeComponents
          });
        })
        .catch(setValidationErrors);
  };

  return (
    <div className={styles.AddRecipeContainer}>
      <div className={styles.AddRecipeForm}>
        <div className={styles.AddRecipeTitle}>
          Add a recipe
        </div>
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
        <div className={styles.FormulaHint}>
          <div className={styles.Title}>
            Example formula
          </div>
          <p>
            200g * flour + 150g * butter + 3 * egg + 100g * walnut + 150g * sugar
          </p>
        </div>
      </div>
    </div>
  );
};

export {
  AddRecipeForm
};
export default AddRecipeForm;