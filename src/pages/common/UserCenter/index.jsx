import React from 'react';
import { Form } from 'antd';
import { history, connect } from 'umi';
import UserCenterForm from './UserCenterForm';

const UserCenter = props => {
  const handleOk = async params => {
    console.log(' handleOk,  , ： ', params);
    const { form } = params;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      // this.props.editItemAsync({
      //   ...res,
      // });
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  return (
    <div className="">
      <UserCenterForm handleOk={handleOk}></UserCenterForm>
    </div>
  );
};

// export default UserCenterForm;
export default connect()(UserCenter);
