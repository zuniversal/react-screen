import React, { PureComponent } from 'react';
import SmartFormModal from '@/common/SmartFormModal';
import SearchKwForm from '@/components/Form/SearchKwForm';
import AlarmRecordTable from './AlarmRecordTable';
import AlarmRecordForm from './AlarmRecordForm';
import AlarmRecordHandleForm from './AlarmRecordHandleForm';
import { Button } from 'antd';
import { actions, mapStateToProps } from '@/models/alarmRecord';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

export const TITLE = '设备';
export const DEVICE = '设备';

const titleMap = {
  add: `新增${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  handleAlarmAsync: `确认处理`,
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
  };

  return {
    renderTable: <AlarmRecordTable {...tableProps}></AlarmRecordTable>,
  };
};

const AlarmRecord = props => {
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
          {/* <Button
            type="primary"
            onClick={() => props.showFormModal({ action: 'add' })}
          >
            新增设备
          </Button> */}
        </div>
      </div>
    );
  };
  const onRemove = params => {
    console.log(' onRemove   params,   ： ', params);
    props.removeItemAsync(params.record.id);
  };
  const { renderTable } = useSmartTable({ ...props, onRemove });

  const onOk = async params => {
    console.log(' onOk   params,   ： ', params, props);
    const { form, init } = params;
    const res = await form.validateFields();
    if (props.action === 'handleAlarmAsync') {
      props.handleAlarmAsync({
        ...res,
        status: 2,
        id: props.extraData.id,
      });
    }
  };
  const renderModalContent = params => {
    if (props.action === 'handleAlarmAsync') {
      return <AlarmRecordHandleForm></AlarmRecordHandleForm>;
    }
    return <AlarmRecordForm></AlarmRecordForm>;
  };
  const size = ['handleAlarmAsync'].some(v => v === props.action)
    ? 'small'
    : 'default';
  const renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={props.isShowModal}
        action={props.action}
        titleMap={titleMap}
        onOk={onOk}
        onCancel={props.onCancel}
        size={size}
      >
        {renderModalContent()}
      </SmartFormModal>
    );
  };

  return (
    <div className="AlarmRecord">
      {renderSearchForm()}
      {renderSmartFormModal()}
      {/* <AlarmRecordForm></AlarmRecordForm> */}
      {renderTable}
    </div>
  );
};

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class AlarmRecordWrapper extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(
      ' %c AlarmRecordWrapper 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <AlarmRecord {...this.props} />;
  }
}

export default AlarmRecordWrapper;
