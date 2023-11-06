import React from 'react';
import SmartForm from '@/common/SmartForm';

export const config = [
  {
    itemProps: {
      label: '物料编号',
      name: 'code',
    },
  },
  {
    itemProps: {
      label: '物料名称',
      name: 'name',
    },
  },
  {
    formType: 'InputNumber',
    itemProps: {
      label: '单价(元)',
      name: 'price',
    },
  },
];

const AlarmRecordForm = props => {
  return <SmartForm config={config} {...props}></SmartForm>;
};

export default AlarmRecordForm;
