import React from 'react';
import { useSelector } from 'react-redux';
import { Elevation, Grid, GridCell } from 'rmwc';
import { RecipeList } from 'components';
import { EmptyState } from './EmptyState.js';

import styles from './DashboardView.module.scss';

const DashboardView = () => {
  const recipeLibrary = useSelector(state => state.recipeLibrary);

  const shouldShowEmptyState = () => {
    return !recipeLibrary?.length;
  }

  const Content = () => {
    if (shouldShowEmptyState()) { 
      return <EmptyState styles={styles} />;
    }

    return <Elevation z={2} className={styles.RecipeLibraryContainer}>
      <div className={styles.RecipeLibraryTitle}>Your recipes</div>
      <RecipeList recipes={recipeLibrary} />
    </Elevation>;
  };

  return <div className={styles.DashboardView}>
    <Grid className={styles.Grid}>
      <GridCell desktop={3} />
      <GridCell span={5} desktop={6} phone={4}>
        <Content />
      </GridCell>
      <GridCell desktop={3} />
    </Grid>
  </div>;
};

export {
  DashboardView
};
export default DashboardView;