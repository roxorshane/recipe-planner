import pluralize from 'pluralize';
import { SimpleListItem } from 'rmwc';

/**
 * @param {Object[]} ingredients List of ingredient components.
 * @param {string} ingredients[].name Name of the ingredient (e.g. "flour")
 * @param {string=} ingredients[].unitOfMeasurement Label for the unit of measurement (e.g. "g", "ml") 
 * @param {string|Number} ingredients[].quantity The numerical amount (e.g. 150, "150")
 * @returns Array of SimpleListItem components to be rendered.
 */
const RecipeIngredientsList = ({ ingredients }) => {
  return ingredients.map((recipeIngredient, key) => {
    // If the ingredient does not have a unit of measurement (e.g. Egg), pluralise the word, e.g. "3 Eggs".
    const ingredientName = 
        recipeIngredient.unitOfMeasurement?.length ? 
            recipeIngredient.name : 
            pluralize(recipeIngredient.name, Number(recipeIngredient.quantity));
    const ingredientLabel = 
        `${recipeIngredient.quantity}${recipeIngredient.unitOfMeasurement || ''} ${ingredientName}`;
    
    return <SimpleListItem text={ingredientLabel} key={key} />;
  });
};

export {
  RecipeIngredientsList
};
export default RecipeIngredientsList;