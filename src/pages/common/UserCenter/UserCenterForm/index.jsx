import React, { useState } from 'react';
import './style.less';
import { Button, Form } from 'antd';
import SmartForm from '@/common/SmartForms';
import UploadCom from '@/components/Widgets/UploadCom';
import { emailRule, genderRadios } from '@/configs';
import { fileToBase64, getBase64 } from '@/utils';

const formLayouts = {
  labelCol: {
    sm: { span: 9 },
  },
  wrapperCol: {
    sm: { span: 15 },
  },
};

export const formItemLayout = {
  labelCol: {
    sm: { span: 9 },
  },
  wrapperCol: {
    sm: { span: 15 },
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
  console.log(' UserCenterForm ： ', props);
  const [form] = Form.useForm();
  const [isUploadLogo, setIsUploadLogo] = useState(false);
  const uploadLogo = () => {
    setIsUploadLogo(true);
  };

  const finish = async params => {
    console.log(' finish ： ', params);
    getBase64(params.file.originFileObj, res => {
      form.setFieldsValue({
        // logo: 'data:image/jpeg;base64,' + res,
        logo: res,
      });
      console.log(' finish form ： ', form.getFieldsValue());
    });
    // const res = await fileToBase64(params.file.originFileObj);
    // console.log('  res await 结果  ：', res);
    // form.setFieldsValue({
    //   logo: res,
    // });
    // console.log(' finish form ： ', form.getFieldsValue());
  };
  const fail = () => {
    console.log(' fail   ,   ： ');
    form.setFieldsValue({
      logo: null,
    });
    console.log(' fail form ： ', form.getFieldsValue());
  };

  const config = [
    {
      itemProps: {
        label: '账号',
        name: 'username',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '昵称',
        name: 'nickname',
      },
    },
    {
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
      formRules: [emailRule],
    },
    {
      formType: 'Radio',
      itemProps: {
        label: '性别',
        name: 'gender',
      },
      comProps: {
        options: genderRadios,
      },
      radioData: genderRadios,
    },
    // props.init.logo && !isUploadLogo ? (
    //   <div className={`logoWrapper`}>
    //     <img src={props.init.logo} className="logo" onClick={uploadLogo} />
    //   </div>
    // ) : (
    <UploadCom
      {...formItemLayout}
      formItemLayout={formItemLayout}
      label={'头像'}
      key={'logo'}
      // action={'/api/v1/upload'}
      name={'logo'}
      extra={'支持扩展名:pdf、jpg、png'}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
        multiple: true,
        maxCount: 1,
      }}
      init={props.init}
      formAction={props.action}
      noRule
      formItemCls={'w100'}
      size={265}
      finish={finish}
      // fail={fail}
    ></UploadCom>,
    // ),
  ];
  const { gender = 1 } = props.init;

  return (
    <SmartForm
      {...formItemLayout}
      config={config}
      propsForm={form}
      action={'edit'}
      noPh
      // formLayouts={formLayouts}
      className={'userCenterForm'}
      {...props}
      init={{
        ...props.init,
        gender,
        // gender: gender != undefined ? gender : 1,
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
