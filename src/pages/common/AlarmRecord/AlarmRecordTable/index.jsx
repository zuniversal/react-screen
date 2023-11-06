import React from 'react';
import SmartTable from '@/common/SmartTable';
import { handleStatusMap } from '@/configs';

const AlarmRecordTable = props => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '设备名称',
      dataIndex: 'device_name',
    },
    {
      title: '告警内容',
      dataIndex: 'detail',
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      dataMap: handleStatusMap,
    },
    {
      title: '持续时长',
      dataIndex: 'formatDuring',
      sortKey: 'duration',
    },
    {
      title: '开始时间',
      dataIndex: 'create_time',
      day: true,
    },
    {
      title: '备注',
      dataIndex: 'handel_detail',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      {/* <a onClick={() => props.handleAlarmAsync({ id: record.id })}>处理</a> */}
      <a
        onClick={() =>
          props.showFormModal({ action: 'handleAlarmAsync', extraData: record })
        }
      >
        处理
      </a>
    </>
  );

  return (
    <SmartTable
      noDefault
      rowSelection={null}
      columns={columns}
      extra={extra}
      {...props}
    ></SmartTable>
  );
};

export default AlarmRecordTable;
