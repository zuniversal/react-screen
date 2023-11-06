import React from 'react';

import SmartForm from '@/common/SmartForm';

const ResetPwdForm = props => {
  const config = [
    {
      noLabel: true,
      itemProps: {
        label: '原密码',
        name: 'old_password',
      },
      comProps: {
        className: 'formItem',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '新密码',
        name: 'new_password',
      },
      comProps: {
        className: 'formItem',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

ResetPwdForm.defaultProps = {
  init: {},
};

export default ResetPwdForm;
