import React, { useState } from 'react';
import { history } from 'umi';
import { Tag, Tooltip, Badge } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import './style.less';
import UserInfoDropdown from './UserInfoDropdown';
import DropdownNotice from './DropdownNotice';
import { csSystemNotify, BIG_SCREEN, USER_CENTER } from '@/constants';
import Icon from '@/components/Widgets/Icons';
import { routeTabConfig, DEF_BUSSNIESS_TAB } from '@/configs/routes';
const { CheckableTag } = Tag;

const menuConfig = [
  {
    key: 'userCenter',
    clickFn: 'userCenter',
    label: '个人中心',
    type: 'url',
    path: USER_CENTER,
  },
  {
    key: 'changePwd',
    clickFn: 'changePwd',
    label: '修改密码',
    type: 'fn',
    type: 'url',
    path: `${USER_CENTER}action=pwd`,
  },
];

const RouteTab = props => {
  // console.log(' RouteTab   ,   ： ', props);
  // const [checkItem, setCheckItem] = useState(DEF_BUSSNIESS_TAB);
  const onChange = (item, checked) => {
    console.log(' RouteTab onChange  ,   ： ', props, item, checked);
    // setCheckItem(item)
    props.onPlatformChange(item);
  };
  return routeTabConfig.map(v => (
    <CheckableTag
      key={v.value}
      // checked={checkItem === v.value}
      checked={props.platform === v.value}
      onChange={checked => {
        console.log(' onChange(v.value, checked) ： ', checked, v); //
        !v.disable && onChange(v.value, checked);
      }}
    >
      {v.label}
    </CheckableTag>
  ));
};

const HeaderWidget = props => {
  console.log(' HeaderWidget ： ', props);
  const goBigScreen = path => {
    console.log(' goBigScreen   path,   ： ', path, BIG_SCREEN);
    window.open(BIG_SCREEN);
    // window.open('http://188.131.235.243:31004/normal_screen');
  };
  const goPage = path => {
    console.log(' goPage   path,   ： ', path);
    history.push(path);
  };
  const menuClick = params => {
    const path = `${csSystemNotify}id=${params.key}`;
    console.log(' menuClick   params,   ： ', params);
    history.push(path);
    props.menuClick(params);
  };

  const avatarMenuClick = params => {
    const { type } = params;
    if (type === 'url') {
      history.push(params.path);
    } else if (type === 'fn') {
      // props[params.clickFn](params);
    }
    // props.menuClick(params);
  };

  const avatar = (
    <span className="avatars" onClick={() => goPage('/om/userCenter')}></span>
  );

  const headerWidget = (
    <div className="headerWidget dfc ">
      <DropdownNotice
        avatar={avatar}
        menuClick={menuClick}
        userInfo={props.userInfo}
        userMsg={props.userMsg}
        userMsg={[{ count: 20 }]}
        clearNotice={props.clearNotice}
        goPage={goPage}
        // onNoticeChange={props.onNoticeChange}
      >
        {10 ? (
          <Badge
            size="small"
            offset={[10]}
            count={10}
            className={props.isNotice ? 'isNotice ' : null}
          >
            <Icon icon={'bell'} className={'headerIcon'} />
          </Badge>
        ) : (
          <Icon icon={'bell'} className={'headerIcon'} />
        )}
      </DropdownNotice>
      <span className="yAxis actionItem"></span>
      <span className="bigScreenWrapper actionItem dfc" onClick={goBigScreen}>
        <Icon icon={'bigScreen'} className={'headerIcon'} />
        <span className="text">大屏展示</span>
      </span>
      {avatar}
      {/* <span className="avatars" onClick={logout}></span> */}
      <UserInfoDropdown menuClick={avatarMenuClick} config={menuConfig}>
        <span
          className={'actionItem userName '}
          onClick={() => goPage('/om/userCenter')}
        >
          {/* {props.userInfo.name} */}
          {props.userInfo.nickname}zyb
        </span>
      </UserInfoDropdown>
      <Tooltip placement="bottom" title={'退出登录'}>
        <LogoutOutlined onClick={props.logout} className={'actionItem  '} />
      </Tooltip>
    </div>
  );

  return (
    <div className={`headers`}>
      <div className={`hederLeft`}>
        {/* <RouteTab
          platform={props.platform}
          onPlatformChange={props.onPlatformChange}
        ></RouteTab> */}
      </div>
      {headerWidget}
    </div>
  );
};

HeaderWidget.defaultProps = {
  menuClick: () => {},
  userInfo: {},
};

export default HeaderWidget;
