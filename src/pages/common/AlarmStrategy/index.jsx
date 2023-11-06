import React, { PureComponent } from 'react';
import SmartFormModal from '@/common/SmartFormModal';
import SearchKwForm from '@/components/Form/SearchKwForm';
import AlarmStrategyTable from './AlarmStrategyTable';
import AlarmStrategyForm from './AlarmStrategyForm';
import { Button } from 'antd';
import { actions, mapStateToProps } from '@/models/alarmStrategy';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

export const TITLE = '告警策略名称';
export const DEVICE = '设备';

const titleMap = {
  add: `新增${TITLE}`,
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

    // noRequest: true,
    edit: props.getItemAsync,
  };

  return {
    renderTable: <AlarmStrategyTable {...tableProps}></AlarmStrategyTable>,
  };
};

const AlarmStrategy = props => {
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
          label={'告警策略名称'}
          noLabel
        ></SearchKwForm>
        <div className={'btnWrapper'}>
          <Button
            type="primary"
            onClick={() => props.showFormModal({ action: 'add' })}
          >
            新增告警策略
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
    console.log(' renderModalContent ： ');
    const { action } = props;
    const formComProps = {
      action,
    };
    if (action !== 'add') {
      formComProps.init = props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps);
    return <AlarmStrategyForm {...formComProps}></AlarmStrategyForm>;
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
    <div className="AlarmStrategy">
      {renderSearchForm()}
      {renderSmartFormModal()}
      {renderTable}
    </div>
  );
};

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class AlarmStrategyWrapper extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(
      ' %c AlarmStrategyWrapper 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <AlarmStrategy {...this.props} />;
  }
}

export default AlarmStrategyWrapper;
