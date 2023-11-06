import React from 'react';
import SmartTable from '@/common/SmartTable';

const AlarmStrategyTable = props => {
  const columns = [
    {
      title: '告警策略名称',
      dataIndex: 'name',
    },
    {
      title: '告警方式',
      dataIndex: ['conf', 'notify'],
      // dataMap: notifyTypeMap,
      dataIndex: 'notifyTypeMap',
    },
    // {
    //   title: '告警指标',
    //   dataIndex: 'capacity',
    // },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];

  return (
    <SmartTable rowSelection={null} columns={columns} {...props}></SmartTable>
  );
};

export default AlarmStrategyTable;
