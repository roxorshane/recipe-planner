import { createSlice } from '@reduxjs/toolkit';
import { initialRecipeLibrary } from 'data/static';

const getRecipe = ({ name, state }) => {
  return state.find(recipe => recipe.name === name);
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: initialRecipeLibrary,
  reducers: {
    addRecipe: (state, action) => {
      const { name, ingredients } = action.payload;
      if (!name || getRecipe({ name, state })) { return; }
      state.push({
        name,
        ingredients
      });
    }
  }
});

const { addRecipe } = recipeSlice.actions
const recipeReducer = recipeSlice.reducer;
export {
  recipeReducer,
  recipeSlice,
  addRecipe
}
export default recipeReducer;