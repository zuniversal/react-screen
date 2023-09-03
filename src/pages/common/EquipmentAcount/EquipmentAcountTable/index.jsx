import React from 'react';
import SmartTable from '@/common/SmartTable';

const EquipmentAcountTable = props => {
  const columns = [
    {
      title: '设备名称',
      dataIndex: 'code',
    },
    {
      title: '设备类型',
      dataIndex: 'code',
    },
    {
      title: '装机容量 (kWh)',
      dataIndex: 'code',
    },
    {
      title: '设备状恋',
      dataIndex: 'code',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => {}}>设备详情</a>
      <a onClick={() => {}}>查看数据</a>
      <a onClick={() => {}}>删除</a>
    </>
  );

  return (
    <SmartTable
      noDefault
      columns={columns}
      extra={extra}
      {...props}
    ></SmartTable>
  );
};

export default EquipmentAcountTable;
