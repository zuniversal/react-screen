import React, { PureComponent, useState } from 'react';
import { Form } from 'antd';
import { history, connect } from 'umi';
import UserCenterForm from './UserCenterForm';
import { actions, mapStateToProps, mapDispatchToProps } from '@/models/user';
import SmartHOC from '@/common/SmartHOC';
import { dataURLtoFile, tips } from '@/utils';

const UserCenter = props => {
  console.log(' UserCenter props ： ', props, props.userInfo);
  const [logo, setLogo] = useState('');

  const handleOk = async params => {
    console.log(' handleOk,  , ： ', params);
    const { form } = params;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res);
      if (typeof res.logo !== 'string') {
        res.logo = null;
      }
      if (!props.userInfo.id) {
        tips('请先登录再操作！');
        return;
      }

      props.editUserInfoAsync({
        ...res,
        id: props.userInfo.id,
      });
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  return (
    <div className="">
      {/* {Object.keys(props.userInfo).length ? ( */}
      <UserCenterForm
        // setLogo={setLogo}
        handleOk={handleOk}
        init={{
          ...props.userInfo,
          id: props.userInfo.user_id,
        }}
      ></UserCenterForm>
      {/* ) : (
        ''
      )} */}
    </div>
  );
};

// export default UserCenterForm;
// export default connect()(UserCenter);
@connect(mapStateToProps, mapDispatchToProps)
@SmartHOC({
  actions,
})
class UserCenterWrapper extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <UserCenter {...this.props} />;
  }
}

export default UserCenterWrapper;
