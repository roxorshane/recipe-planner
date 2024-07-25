import { ingredientDatabase } from "data/static";

const validateRecipeComponents = (recipeComponents) => {
  const errorMessages = [];
  return new Promise((resolve, reject) => {
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
  validateRecipeComponents
};