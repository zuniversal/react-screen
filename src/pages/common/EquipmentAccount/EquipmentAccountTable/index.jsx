import React from 'react';
import SmartTable from '@/common/SmartTable';
import { deviceStatusMap, deviceTypeMap } from '@/configs';

const EquipmentAccountTable = props => {
  const columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '设备类型',
      dataIndex: 'device_type',
      dataMap: deviceTypeMap,
    },
    {
      title: '装机容量 (kWh)',
      dataIndex: 'capacity',
    },
    {
      title: '设备状恋',
      dataIndex: 'status',
      dataMap: deviceStatusMap,
    },
  ];

  const extra = (text, record, index) => (
    <>
      <a
        onClick={() =>
          props.edit({ action: 'edit', id: record.id, isShowDetail: true })
        }
      >
        设备详情
      </a>
      <a
        onClick={() =>
          props.getDataDetailAsync({
            action: 'getDataDetailAsync',
            extraData: record,
            id: record.id,
            query: 7,
          })
        }
      >
        查看数据
      </a>
    </>
  );

  return (
    <SmartTable
      // noEdit
      rowSelection={null}
      columns={columns}
      extra={extra}
      {...props}
    ></SmartTable>
  );
};

export default EquipmentAccountTable;
