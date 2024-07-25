import { ingredientDatabase } from 'data/static';

const validateRecipe = ({ recipeName, recipeComponents, recipeLibrary }) => {
  const errorMessages = [];
  return new Promise((resolve, reject) => {
    if (!recipeName) { 
      errorMessages.push({
        errorMessage: "Please give your recipe a name"
      });
    }
    if (recipeLibrary.find(recipe => recipe.name === recipeName)) {
      errorMessages.push({
        errorMessage: "There's already a recipe with that name"
      });
    }
    if (!recipeComponents?.length) {
      errorMessages.push({
        errorMessage: "Please specify an ingredients formula for your recipe"
      });
    }
    recipeComponents.forEach(recipeComponent => {
      if (!ingredientDatabase.find(ingredient => ingredient.name === recipeComponent.name)) {
        errorMessages.push({
          errorMessage: "There's an unrecognised ingredient in your formula: " + recipeComponent.name 
        });
      }
    });
    errorMessages.length ? reject(errorMessages) : resolve();
  });
};

export {
  validateRecipe
};