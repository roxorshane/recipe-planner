import { configureStore } from '@reduxjs/toolkit';
import { recipeReducer } from 'data/slices';

const ApplicationStore = configureStore({
  reducer: {
    recipeLibrary: recipeReducer
  }
});

export { 
  ApplicationStore
};
export default ApplicationStore;