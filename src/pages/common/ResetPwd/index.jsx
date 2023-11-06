import React from 'react';
import { Form, Button } from 'antd';
import { history, connect } from 'umi';
import loginAvatar from '@/static/assets/loginAvatar.png';
import ResetPwdForm from './ResetPwdForm';
import { mapStateToProps, mapDispatchToProps } from '@/models/user';

const ResetPwd = props => {
  const [form] = Form.useForm();

  const goPage = path => {
    console.log(' goPage   path,   ： ', path);
    history.push(path);
  };

  const onFinish = values => {
    console.log('Received values of form: ', values, props);
    const { username, password } = values;
    // props.dispatch({
    //   type: 'user/loginAsync',
    //   payload: values,
    // });
    props.changePwdAsync(values.values);
    // props.changePwdAsync({
    //   old_password: 'string',
    //   new_password: 'string',
    // });
  };

  return (
    <div className="loginWrapper">
      <div className="loginFormWrapper">
        <div className="f1"></div>
        <div className="loginForm">
          <div className="loginRow">
            <img src={loginAvatar} className="loginAvatar" />
            <div className="sysystemTitle">欢迎登录</div>
          </div>

          <ResetPwdForm
            className="login-form"
            // initialValues={{
            //   remember: true,
            //   username: 'admin',
            //   password: 'afafa',
            //   username: '',
            //   password: '',
            // }}
            onSubmit={onFinish}
          >
            <Form.Item className={`btnFormItem`} noStyle>
              <Button type="primary" htmlType="submit" className="actionBtn">
                确认
              </Button>
            </Form.Item>
          </ResetPwdForm>
        </div>
      </div>
    </div>
  );
};

// export default ResetPwd;
export default connect(mapStateToProps, mapDispatchToProps)(ResetPwd);
