import React, { useState, useRef, Suspense } from 'react';
import { Layout, Spin } from 'antd';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import { history, connect } from 'umi';
import './index.less';
import './style.less';
import LogoCom from './LogoCom';
import HeaderWidget from './HeaderWidget';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import MenuHeader from './MenuHeader';

const { Header, Sider, Content } = Layout;

const Layouts = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [settings, setSetting] = useState({});
  const comRef = useRef(() => <></>);
  const Com = comRef.current;
  const { children, location, loading, system, getRoutes } = props;
  const path = location.pathname;
  const [pathname, setPathname] = useState(path);
  console.log(
    ' %c Layouts 组件 props ： ',
    `color: #333; font-weight: bold`,
    props,
  );

  return (
    <ErrorBoundary>
      <div className={'layoutContainer'}>
        <ProLayout
          {...getRoutes}
          onCollapse={setCollapsed}
          collapsed={collapsed}
          location={{
            pathname: path,
          }}
          menu={{ defaultOpenAll: true }}
          menuItemRender={(item, dom) => {
            // console.log(' menuItemRender ： ', item, dom);
            // if (item.notShowItem) {
            //   return null;
            // }
            return (
              <a
                className={'navItem'}
                onClick={() => {
                  console.log(' onClickonClick ： ', item, pathname);
                  history.push(item.path);
                }}
              >
                {dom}
              </a>
            );
          }}
          className={'spinWrapperinWrap'}
          menuHeaderRender={() => <MenuHeader />}
          logo={() => <LogoCom className={`logoClass`}></LogoCom>}
          rightContentRender={() => (
            <HeaderWidget
            // system={system}
            // logout={logout}
            // logoutGuest={logoutGuest}
            // toggle={toggle}
            // userMsg={userMsg}
            // platform={platform}
            // onPlatformChange={onPlatformChange}
            // clearNotice={clearNotice}
            // menuClick={readMsgAsync}
            // isNotice={isNotice}
            // onNoticeChange={onNoticeChange}
            ></HeaderWidget>
          )}
          siderWidth={200}
          title={''}
          {...settings}
        >
          <Suspense fallback={null} className={''}>
            {/* <Spin spinning={loading} spinning={false} className={'spinWrapper'}> */}
            <Content key={pathname} className={` container `}>
              <div className="content">{children}</div>
            </Content>
            {/* </Spin> */}
          </Suspense>
        </ProLayout>

        {/* <SettingDrawer
          getContainer={() => document.getElementById('test-pro-layout')}
          settings={settings}
          onSettingChange={changeSetting => setSetting(changeSetting)}
        /> */}
      </div>
    </ErrorBoundary>
  );
};

const mapStateToProps = ({ loading, user = {} }) => ({
  loading: loading.global,
  system: user.system,
  getRoutes: user.getRoutes,
});

export default connect(mapStateToProps)(Layouts);
