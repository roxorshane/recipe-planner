import { List } from 'rmwc';
import { RecipeListItem, RecipeIngredientsList } from 'components';

const RecipeList = ({ recipes }) => {
  const recipeListItems = recipes.map((recipe, key) => {
    return <RecipeListItem 
        key={key}
        recipe={recipe} 
        expandableContent={
          <RecipeIngredientsList ingredients={recipe.ingredients} />
        }
    />;
  });

  return <List>{recipeListItems}</List>;
};

export {
  RecipeList
};
export default RecipeList;