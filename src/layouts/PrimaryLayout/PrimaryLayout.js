import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';

import styles from './PrimaryLayout.module.scss';

const PrimaryLayout = () => {
  return <div className={styles.PrimaryLayout}>
    <TopAppBar fixed>
      <TopAppBarRow>
        <TopAppBarSection>
          <TopAppBarTitle className={styles.Title}>
            <span>Recipe Planner</span>
          </TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    <TopAppBarFixedAdjust />
    <Outlet />
  </div>;
};

export {
  PrimaryLayout
};
export default PrimaryLayout;