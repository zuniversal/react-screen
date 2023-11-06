import React, { useEffect, useState, useRef } from 'react';
import { EQUIPMENT_ACCOUNT } from '@/constants';
import { systemRoutes } from '@/configs/routes';
import { history } from 'umi';

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    path: `Tab ${id}`,
    label: `Tab ${id}`,
    children: `Content of Tab Pane ${index + 1}`,
    key: id,
  };
});

const initItem = systemRoutes[0];

const initList = [
  {
    path: initItem.path,
    label: initItem.name,
    key: initItem.path,
  },
];

const useRoutesTab = props => {
  // const [activeTab, setActiveTab] = useState(defaultPanes[0].key);
  // const [items, setItems] = useState(defaultPanes);
  const [activeTab, setActiveTab] = useState();
  const [items, setItems] = useState(initList);
  const newTabIndex = useRef(0);
  const onTabChange = key => {
    console.log(' onTabChange key ： ', key);
    history.push(key);
    setActiveTab(key);
  };
  const addTab = params => {
    const { name, path } = params;
    const newActiveTab = path;
    const isExist = items.some(v => v.path == path);
    console.log(' isExist, items, path ： ', isExist, items, path);
    if (!isExist) {
      setItems([
        ...items,
        {
          path,
          label: name,
          key: path,
          // children: name,
        },
      ]);
    }
    setActiveTab(newActiveTab);
  };
  const removeTab = targetKey => {
    const targetIndex = items.findIndex(pane => pane.key === targetKey);
    const newPanes = items.filter(pane => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeTab) {
      const { key } = newPanes[
        targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
      ];
      setActiveTab(key);
    }
    setItems(newPanes);
  };
  const onEditTab = (targetKey, action) => {
    if (action === 'add') {
      addTab();
    } else {
      removeTab(targetKey);
    }
  };

  return {
    activeTab,
    items,
    addTab,
    removeTab,
    onTabChange,
    onEditTab,
  };
};

export default useRoutesTab;
