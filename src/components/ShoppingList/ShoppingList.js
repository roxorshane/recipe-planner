import React from 'react';
import { useSelector } from 'react-redux';
import { RecipeIngredientsList } from 'components';
import { EmptyState } from './EmptyState.js';

import styles from './ShoppingList.module.scss';

const ShoppingList = () => {
  const recipeLibrary = useSelector(state => state.recipeLibrary);

  const shouldShowEmptyState = () => {
    return !recipeLibrary?.length;
  }

  const ConditionalContent = () => {
    if (shouldShowEmptyState()) { 
      return <EmptyState styles={styles} />;
    }

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
    const shoppingListIngredients = Object.values(shoppingList);

    return <>
      <div className={styles.ShoppingListTitle}>Shopping List</div>
      <RecipeIngredientsList ingredients={shoppingListIngredients} />
    </>;
  };

  return (
    <div className={styles.ShoppingListContainer}>
      <ConditionalContent />
    </div>
  );
};

export {
  ShoppingList
};
export default ShoppingList;

