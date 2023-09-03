import React from 'react';
import './style.less';
import { CloseOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';
import { csSystemNotify } from '@/constants';

const menuConfig = [
  {
    key: 'upload',
    clickFn: 'showUploadModal',
    action: 'uploadFile',
    verb: '张明发来一条通知',
    description: '各单位注意，下午三点集体大厅开会',
    timestamp: '16分钟前',
  },
  {
    key: 'upload1',
    clickFn: 'showUploadModal',
    action: 'uploadFile',
    verb: '张明发来一条通知',
    description: '各单位注意，下午三点集体大厅开会',
    timestamp: '16分钟前',
  },
  {
    key: 'upload2',
    clickFn: 'showUploadModal',
    action: 'uploadFile',
    verb: '张明发来一条通知',
    description: '各单位注意，下午三点集体大厅开会',
    timestamp: '16分钟前',
  },
];

const DropdownNotice = props => {
  // console.log(' DropdownNotice ： ', props);

  const {
    children = '按钮',
    menu,
    menuConfig,
    menuClick,
    avatar,
    userInfo,
    userMsg,
  } = props;

  const handleMenuClick = (item, data) => {
    console.log(' handleMenuClick   item, ,   ： ', item, data, props);
    const clickItem = menuConfig.find(v => v.key === item.key);
    console.log(' clickItem   ： ', menuConfig, clickItem, item);
    menuClick && menuClick({ ...clickItem, data, ...item });
  };
  const closeNotice = e => {
    console.log(' closeNotice   e,   ： ', e);
    props.closeNotice(e);
  };
  const clearNotice = e => {
    console.log(' clearNotice   e,   ： ', e);
    e.stopPropagation();
    props.clearNotice(e);
  };

  const menuCom = menu ? (
    menu
  ) : (
    <Menu className={`dropdownContent`}>
      {/* <Menu.Item key={'header'}>
        <div className="header divider">
          <div className="text">通知 ({wsData.length}) </div>
          <CloseOutlined className={`closeIcon`} onClick={props.closeNotice} />
        </div>
      </Menu.Item> */}
      <Menu.ItemGroup
        title={
          <div className="header divider fsb">
            <div className="text">通知 ({userMsg[0]?.count}) </div>
            <div>
              <Button
                type="primary"
                onClick={() => props.goPage(csSystemNotify)}
                className={`m-r-5`}
              >
                全部通知
              </Button>
              <CloseOutlined className={`closeIcon`} onClick={closeNotice} />
            </div>
          </div>
        }
      >
        <Menu.ItemGroup key={'header'} className={`listWrapper`}>
          {userMsg.map((v, i) => (
            <Menu.Item
              key={v.id}
              action={v.action}
              onClick={e => handleMenuClick(e, v)}
            >
              <div className="menuItem divider">
                <div className="left">
                  <div className="avatar">
                    <span className="avatars" onClick={() => {}}></span>
                  </div>
                </div>
                <div className="right">
                  {/* <div className="title subText ">{v.verb}</div>
                  <div className="content ellipsis">{v.description}</div>
                  <div className="time subText">{v.timestamp}</div> */}
                  <div className="title subText ">{v.title}</div>
                  <div className="content ">{v.content}</div>
                  <div className="time subText">{v.created_time}</div>
                </div>
              </div>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </Menu.ItemGroup>
      <Menu.Item key={'footer'}>
        <div className="footer">
          {/* <div className="clearText" onClick={props.clearNotice}> */}
          <div className="clearText" onClick={clearNotice}>
            清空通知
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  // return <div>ssssss</div>
  return (
    <Dropdown
      overlay={menuCom}
      className={`dropdownNotice`}
      overlayClassName={`dropdownNotice`}
      // placement={'bottomRight'}
      onVisibleChange={isNotice =>
        isNotice &&
        props.onNoticeChange({
          isNotice: false,
        })
      }
    >
      {children}
    </Dropdown>
  );
};

DropdownNotice.defaultProps = {
  count: 6,
  placeholder: '按钮',
  menuConfig: [],
  menuConfig: menuConfig,
  menuClick: () => {},
  closeNotice: () => {},
  clearNotice: () => {},
};

export default DropdownNotice;
