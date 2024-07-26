import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopAppBar, TopAppBarActionItem, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust } from 'rmwc';
import { AddRecipeForm, ShoppingList } from 'components';
import styles from './PrimaryLayout.module.scss';

const panelContentType = Object.freeze({
  none: 0,
  addRecipeForm: 1,
  shoppingList: 2
});

const PrimaryLayout = () => {
  const [panelContent, setPanelContent] = useState(panelContentType.none);

  const PanelContent = () => {
    switch (panelContent) {
      case panelContentType.addRecipeForm:
        return <AddRecipeForm onAdd={() => togglePanelContent(panelContentType.none)} />;
      case panelContentType.shoppingList:
        return <ShoppingList />;
      case panelContentType.none:
      default:
        return null;
    }
  };

  const togglePanelContent = (contentType) => {
    setPanelContent(
      panelContent === contentType ? panelContentType.none : contentType
    );
  }

  return (
    <div className={styles.PrimaryLayout}>
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarTitle>
              Recipe Planner
            </TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd className={styles.ActionSection}>
            <TopAppBarActionItem 
                icon='library_add'
                onClick={() => {
                  togglePanelContent(panelContentType.addRecipeForm)
                }}
            />
            <TopAppBarActionItem 
                icon='shopping_basket'
                onClick={() => {
                  togglePanelContent(panelContentType.shoppingList)
                }}
            />
            <div className={styles.ActionItemSpacer} />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <PanelContent />
      <Outlet />
    </div>
  );
};

export {
  PrimaryLayout
};
export default PrimaryLayout;