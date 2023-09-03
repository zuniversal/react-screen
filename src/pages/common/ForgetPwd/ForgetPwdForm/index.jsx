import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm';

const ForgetPwdForm = props => {
  const config = [
    {
      noLabel: true,
      itemProps: {
        label: '手机号',
        name: 'username',
      },
      comProps: {
        className: 'formItem',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '验证码',
        name: 'password',
      },
      comProps: {
        className: 'formItem',
        suffix: (
          <div className="getCode" onClick={props.getCode}>
            获取验证码
          </div>
        ),
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

ForgetPwdForm.defaultProps = {
  init: {},
};

export default ForgetPwdForm;
