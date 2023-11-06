import React from 'react';
import { Menu, Dropdown } from 'antd';

const UserInfoDropdown = props => {
  console.log(' UserInfoDropdown ： ', props);
  const { children = '按钮', menu, config, menuClick } = props;

  const handleMenuClick = (item, data) => {
    console.log(' handleMenuClick   item, ,   ： ', item, data, props);
    const clickItem = config.find(v => v.key === item.key);
    console.log(' clickItem  ： ', config, clickItem, item);
    menuClick && menuClick({ ...clickItem, data, ...item });
  };

  const menuCom = (
    <Menu className={`dropdownContent`}>
      <Menu.ItemGroup key={'header'} className={`listWrapper`}>
        {config.map((v, i) => (
          <Menu.Item
            action={v.action}
            onClick={e => handleMenuClick(e, v)}
            key={v.key}
          >
            <div className="menuItem divider">
              <div className="title  ">{v.label}</div>
            </div>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menuCom}
      className={`userInfoDropdown`}
      overlayClassName={`userInfoDropdown`}
      // placement={'bottomRight'}
    >
      {children}
    </Dropdown>
  );
};

UserInfoDropdown.defaultProps = {
  count: 6,
  placeholder: '按钮',
  noEllipsis: false,
  config: [],
  menuClick: () => {},
  closeNotice: () => {},
  clearNotice: () => {},
};

UserInfoDropdown.propTypes = {};

export default UserInfoDropdown;
