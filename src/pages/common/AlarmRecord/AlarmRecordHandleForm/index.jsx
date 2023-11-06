import React from 'react';
import SmartForm from '@/common/SmartForm';

const AlarmRecordHandleForm = props => {
  const config = [
    {
      formType: 'TextArea',
      itemProps: {
        label: '处理信息',
        name: 'handel_detail',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return <SmartForm size={'small'} config={config} {...props}></SmartForm>;
};

AlarmRecordHandleForm.defaultProps = {};

export default AlarmRecordHandleForm;
