import React, { useState } from 'react';
import './style.less';
import { Button, Form } from 'antd';
import SmartForm from '@/common/SmartForm';
import { genderRadios } from '@/configs';

const formLayouts = {
  labelCol: {
    sm: { span: 9 }, //
  },
  wrapperCol: {
    sm: { span: 15 }, //
  },
};

export const UserPasswordForm = props => {
  const [form] = Form.useForm();

  const config = [
    {
      itemProps: {
        label: '密码',
        name: 'password',
      },
    },
    {
      itemProps: {
        label: '再次确认密码',
        name: 'rePassword',
      },
    },
  ];

  return (
    <SmartForm
      config={config}
      propsForm={form}
      action={'edit'}
      noPh
      formLayouts={formLayouts}
      className={'userCenterForm'}
      {...props}
    >
      <Form.Item label={' '} colon={false}>
        <Form.Item>
          <Button
            className={`editBtn`}
            type="primary"
            onClick={() => props.handleOk({ form, action: 'changePwdAsync' })}
          >
            确认修改
          </Button>
        </Form.Item>
      </Form.Item>
    </SmartForm>
  );
};

const UserCenterForm = props => {
  const [form] = Form.useForm();

  const config = [
    {
      itemProps: {
        label: '账号',
        name: 'username',
      },
    },
    {
      itemProps: {
        label: '昵称',
        name: 'nickname',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '微信',
        name: 'wechat',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '手机',
        name: 'phone',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '邮箱',
        name: 'email',
      },
    },
    {
      noRule: true,
      formType: 'Radio',
      itemProps: {
        label: '性别',
        name: 'gender',
      },
      radioData: genderRadios,
    },
  ];
  const { gender } = props.init;

  return (
    <SmartForm
      config={config}
      propsForm={form}
      action={'edit'}
      noPh
      formLayouts={formLayouts}
      className={'userCenterForm'}
      {...props}
      init={{
        ...props.init,
        gender: gender != undefined ? gender : 1,
      }}
    >
      <Form.Item label={' '} colon={false}>
        <Form.Item>
          <Button
            className={`editBtn`}
            type="primary"
            onClick={() => props.handleOk({ form, action: 'edit' })}
          >
            确认修改
          </Button>
        </Form.Item>
      </Form.Item>
    </SmartForm>
  );
};

UserCenterForm.defaultProps = {
  init: {},
};

export default UserCenterForm;
