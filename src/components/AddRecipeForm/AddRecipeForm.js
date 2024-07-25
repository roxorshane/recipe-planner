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

  const handleFormulaInputChange = (value) => {
    setFormulaValue(value);
  };

  const handleAddRecipeClick = () => {
    const recipeName = nameInput.current.value;
    if (!recipeName) { setNameInputInvalid(true); }

    const recipeComponents = parseFormula(formulaValue);
    validateRecipe({ recipeName, recipeComponents, recipeLibrary }).then(() => {
      setValidationErrors(null);
      const recipeDetails = {
        name: recipeName,
        ingredients: recipeComponents
      };
      dispatch(addRecipe(recipeDetails));
      onAdd && onAdd(recipeDetails);
    }).catch(setValidationErrors);
  };

  return <div className={styles.AddRecipeContainer}>
    <div className={styles.AddRecipeForm}>
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
    </div>
  </div>;
};

export {
  AddRecipeForm
};
export default AddRecipeForm;