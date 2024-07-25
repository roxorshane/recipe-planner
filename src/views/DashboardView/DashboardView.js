import React from 'react';
import { useSelector } from 'react-redux';
import { Elevation, Grid, GridCell } from 'rmwc';
import { RecipeList } from 'components';

import styles from './DashboardView.module.scss';

const DashboardView = () => {
  const recipeLibrary = useSelector(state => state.recipeLibrary);

  return <div className={styles.DashboardView}>
    <Grid className={styles.Grid}>
      <GridCell span={5} desktop={5} phone={4}>
        <Elevation z={2} className={styles.AddRecipeContainer}>
          <div className={styles.RecipeLibraryContainer}>
            <div className={styles.RecipeLibraryTitle}>Your recipes</div>
            <RecipeList recipes={recipeLibrary} />
          </div>
        </Elevation>
      </GridCell>
    </Grid>
  </div>;
};

export {
  DashboardView
};
export default DashboardView;