import { CollapsibleList, SimpleListItem } from 'rmwc';

const RecipeListItem = ({ recipe, expandableContent }) => {
  return (
    <CollapsibleList handle={
      <SimpleListItem 
        text={recipe.name}
        metaIcon="chevron_right"
      />
    }>
      {expandableContent}
    </CollapsibleList>
  );
};

export {
  RecipeListItem
};
export default RecipeListItem;