import { Icon } from 'rmwc';

import bakingIllustration from 'assets/baking_illustration.jpg';

const EmptyState = ({ styles }) => {
  return (
    <div className={styles.EmptyStateContainer}>
      <div className={styles.Title}>
        Let's get baking!
      </div>
      <p className={styles.Message}>
        Add your favourite recipes through the <nobr>Add Recipe button 
        <Icon icon='library_add' className={styles.Icon} /></nobr> at the top of the 
        screen.
      </p>
      <p className={styles.Message}>
        When you add your recipes, a shopping list will be automatically
        generated. Just use the <nobr>Basket button 
        <Icon icon='shopping_basket' className={styles.Icon} /></nobr> to see it.
      </p>
      <div className={styles.Illustration}>
        <img src={bakingIllustration} alt="" />
      </div>
    </div>
  );
};

export {
  EmptyState
};
export default EmptyState;