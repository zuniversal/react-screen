import React, { PureComponent } from 'react';
import SmartFormModal from '@/common/SmartFormModal';
import SearchKwForm from '@/components/Form/SearchKwForm';
import EquipmentAccountTable from './EquipmentAccountTable';
import EquipmentAccountForm from './EquipmentAccountForm';
import { Button } from 'antd';
import RealDataImei from './RealDataImei';
import RealDataDetail from './RealDataDetail';
import { actions, mapStateToProps } from '@/models/equipmentAccount';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

export const TITLE = '设备';
export const DEVICE = '设备';

const titleMap = {
  add: `新增${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  getDataDetailAsync: `查看数据`,
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

    // noRequest: true,
    // count: props.dataList.length,
    edit: props.getItemAsync,
    getDataDetailAsync: props.getDataDetailAsync,
  };

  return {
    renderTable: (
      <EquipmentAccountTable {...tableProps}></EquipmentAccountTable>
    ),
  };
};

const EquipmentAccount = props => {
  const onFieldChange = params => {
    console.log(' onFieldChange   params,   ： ', params);
    props.getListAsync(params.formData);
  };
  const renderSearchForm = params => {
    return (
      <div className={'fsb '}>
        <SearchKwForm
          init={props.searchInfo}
          onFieldChange={onFieldChange}
          keyword={'query'}
          label={'设备名称'}
          noLabel
        ></SearchKwForm>
        <div className={'btnWrapper'}>
          <Button
            type="primary"
            onClick={() => props.showFormModal({ action: 'add' })}
          >
            新增设备
          </Button>
        </div>
      </div>
    );
  };
  const onRemove = params => {
    console.log(' onRemove   params,   ： ', params);
    props.onRemove(params.record.id);
  };
  const { renderTable } = useSmartTable({ ...props, onRemove });

  const onOk = async params => {
    console.log(' onOk   params,   ： ', params);
    const { action, itemDetail } = props;
    const { form, init } = params;
    if (['detail', 'getDataDetailAsync'].includes(action)) {
      props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'add') {
        props.addItemAsync({
          ...res,
        });
      }
      if (action === 'edit') {
        props.editItemAsync({
          ...res,
          id: itemDetail.id,
        });
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };
  const renderModalContent = params => {
    console.log(' renderModalContent ： ', props);
    const { action } = props;
    const formComProps = {
      action,
      isShowDetail: props.isShowDetail,
      showFormModal: props.showFormModal,
      getDataDetailAsync: props.getDataDetailAsync,
      setAttrs: props.setAttrs,
      getProvinceListAsync: props.getProvinceListAsync,
      getCityListAsync: props.getCityListAsync,
      getCountryListAsync: props.getCountryListAsync,
      provinceList: props.provinceList,
      cityList: props.cityList,
      countryList: props.countryList,
    };
    if (action !== 'add') {
      formComProps.init = props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps);
    if (action === 'getDataDetailAsync') {
      return (
        props.chartData.data.length && (
          <RealDataDetail
            dataInfo={props.dataInfo}
            chartData={props.chartData}
            itemDetail={props.itemDetail}
            getDataDetailAsync={props.getDataDetailAsync}
          />
        )
      );
    }

    return <EquipmentAccountForm {...formComProps}></EquipmentAccountForm>;
  };
  const renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={props.isShowModal}
        action={props.action}
        titleMap={titleMap}
        onOk={onOk}
        onCancel={props.onCancel}
        // width={'1000px'}
      >
        {renderModalContent()}
      </SmartFormModal>
    );
  };

  return (
    <div className="equipmentAccount">
      {renderSearchForm()}
      {renderSmartFormModal()}
      {/* <RealDataImei></RealDataImei>
      <EquipmentAccountForm></EquipmentAccountForm> */}
      {/* {renderTable()} */}
      {renderTable}
    </div>
  );
};

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class EquipmentAccountWrapper extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(
      ' %c EquipmentAccount 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <EquipmentAccount {...this.props} />;
  }
}

export default EquipmentAccountWrapper;
