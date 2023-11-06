import React, { useEffect, useState, useRef } from 'react';
import './style.less';
import { Button, Tabs } from 'antd';
import { history } from 'umi';
import useRoutesTab from '../useRoutesTab';

const RoutesTab = props => {
  const {
    activeTab,
    items,
    addTab,
    removeTab,
    onTabChange,
    onEditTab,
  } = useRoutesTab();

  return (
    <div className={`routesTab `}>
      <Button onClick={addTab}>ADD</Button>
      <Tabs
        hideAdd
        onChange={onTabChange}
        activeKey={activeTab}
        type="editable-card"
        onEdit={onEditTab}
        items={items}
      />
    </div>
  );
};

export default RoutesTab;
