import React, { PureComponent } from 'react';
import SmartFormModal from '@/common/SmartFormModal';
import SearchKwForm from '@/components/Form/SearchKwForm';
import EquipmentAcountTable from './EquipmentAcountTable';
import EquipmentAcountForm from './EquipmentAcountForm';
import { Button } from 'antd';
import RealDataImei from './RealDataImei';

export const TITLE = '设备';
export const DEVICE = '设备';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  powerStationDetailAsync: `电站详情`,
};

const detailFormMap = {
  // clientDetailAsync: ClientForm,
};

const useSmartTable = props => {
  console.log(' useSmartTable   ,   ： ', props);

  const tableProps = {
    ...props,
    onSelectChange: props.onSelectChange,
    dataSource: props.dataList,

    count: props.count,
    authInfo: props.authInfo,
    searchInfo: props.searchInfo,
    getListAsync: props.getListAsync,
    showDetail: props.getItemAsync,
    remove: props.onRemove,
    showFormModal: props.showFormModal,
    showItemAsync: props.showItemAsync,

    noRequest: true,
    // count: props.dataList.length,
    edit: props.getElectricBillItemAsync,
  };

  return {
    renderTable: <EquipmentAcountTable {...tableProps}></EquipmentAcountTable>,
  };
};

const EquipmentAcount = props => {
  const onFieldChange = params => {
    console.log(' onFieldChange   params,   ： ', params);
  };
  const renderSearchForm = params => {
    return (
      <div className={'fsb '}>
        <SearchKwForm
          init={props.searchInfo}
          onFieldChange={onFieldChange}
          keyword={'keyword'}
          label={'客户名称'}
          noLabel
        ></SearchKwForm>
        <div className={'btnWrapper'}>
          <Button type="primary" onClick={() => {}}>
            新增设备
          </Button>
        </div>
      </div>
    );
  };
  const onRemove = params => {
    console.log(' onRemove   params,   ： ', params);
  };
  const { renderTable } = useSmartTable({ ...props, onRemove });
  // const renderTable = params => {
  //   const tableProps = {
  //     onSelectChange: props.onSelectChange,
  //     dataSource: props.dataList,

  //     count: props.count,
  //     authInfo: props.authInfo,
  //     searchInfo: props.searchInfo,
  //     getListAsync: props.getListAsync,
  //     showDetail: props.getItemAsync,
  //     remove: onRemove,
  //     showFormModal: props.showFormModal,
  //     showItemAsync: props.showItemAsync,

  //     noRequest: true,
  //     // count: props.dataList.length,
  //     edit: props.getElectricBillItemAsync,
  //   };

  //   return <EquipmentAcountTable {...tableProps}></EquipmentAcountTable>;
  // };

  const onOk = params => {
    console.log(' onOk   params,   ： ', params);
  };
  const renderModalContent = params => {
    return 666;
  };
  const renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={props.isShowModal}
        action={props.action}
        titleMap={titleMap}
        onOk={onOk}
        onCancel={props.onCancel}
      >
        {renderModalContent()}
      </SmartFormModal>
    );
  };

  return (
    <div className="equipmentAcount">
      {renderSearchForm()}
      {renderSmartFormModal()}
      <RealDataImei></RealDataImei>
      <EquipmentAcountForm></EquipmentAcountForm>
      {/* {renderTable()} */}
      {renderTable}
    </div>
  );
};

class EquipmentAcountWrapper extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(
      ' %c EquipmentAcount 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <EquipmentAcount {...this.props} />;
  }
}

export default EquipmentAcountWrapper;
