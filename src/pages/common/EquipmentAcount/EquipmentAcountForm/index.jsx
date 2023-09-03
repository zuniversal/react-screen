import React from 'react';
import './style.less';
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Checkbox,
  Button,
  AutoComplete,
  Collapse,
} from 'antd';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import {
  regoins,
  clientLevelConfig,
  customerTypeConfig,
  repairSourceConfig,
  enterpriseScaleConfig,
  enterpriseNatureConfig,
  industryConfig,
  assetScaleConfig,
  corverAreaConfig,
  voltageLevelConfig,
  electricTypeConfig,
} from '@/configs';
import {
  tips,
  renderCheckboxOp,
  renderSelectOp,
  getItem,
  objNum2str,
} from '@/utils';
import {
  SettingOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { getLabel } from '@/common/SmartForm';
import { REQUIRE } from '@/constants';
import debounce from 'lodash/debounce';

import useHttp from '@/hooks/useHttp';
import { getServiceStaff } from '@/services/home';
import { getList as getTagList } from '@/services/home';
import { getList as getOrganize } from '@/services/home';
import { recursiveHandle } from '@/models/home';
import { getRegion, getRegionOne } from '@/services/home';
import { formatSelectList, filterObjSame } from '@/utils';

const { Panel } = Collapse;
const { Option } = Select;

const checkOneCom = <span className={`dangerText`}>只能勾选1个！</span>;

const checkboxData = [
  { label: '', value: 1 },
  // { label: '是否', value: false,  },
];

const rowLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const addrLayout = {
  labelCol: {
    sm: { span: 4 },
  },
  wrapperCol: {
    sm: { span: 20 },
  },
};

const addrLayout1 = {
  labelCol: {
    sm: { span: 12 },
  },
  wrapperCol: {
    sm: { span: 12 },
  },
};

const addrLayout2 = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

const formLayouts = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }, //
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }, //
  },
};

const CollapseCom = props => {
  const { com, header = '', extra } = props;
  console.log(' CollapseCom   props,   ： ', props);
  return (
    <Collapse
      defaultActiveKey={['1']}
      expandIconPosition={'left'}
      className={`collapseCom`}
    >
      <Panel header={header} key="1" extra={extra}>
        {com}
      </Panel>
    </Collapse>
  );
};

const formListLayout = {
  labelCol: {
    sm: { span: 10 }, //
  },
  wrapperCol: {
    sm: { span: 14 }, //
  },
};

const rules = (params, extra) => {
  const { items, label, formType } = params;
  const message = getLabel(label, formType);
  // console.log(' rules   params, extra,  ,   ： ', params, extra, message, label, formType,  );
  return [
    {
      required: true,
      message: label + REQUIRE,
    },
  ];
};

export const SelectCom = props => {
  console.log(' SelectCom ： ', props);
  const {
    formType = 'Input',
    itemProps = {},
    comProps = {},
    selectData,
  } = props;
  const selectProps = {
    allowClear: true,
    filterOption: true,
    showSearch: true,
    optionFilterProp: 'children',
    ...comProps,
  };

  if (formType === 'Search') {
    // selectProps.optionFilterProp = 'children';
    if (props.selectSearch) {
      // 注意 不要对 onSelect 方法 修改 否则会导致 字段无法设置值
      // selectProps.onChange = debounce(props.selectSearch, 1500);
    }
  }

  return <Select {...selectProps}>{renderSelectOp(selectData)}</Select>;
};

export const getWidget = props => {
  const { label, LabelCom, CustomCom, plainText, index } = props;

  const { formType = 'Input', itemProps = {}, comProps = {} } = props;

  if (props.onComChange) {
    comProps.onChange = (...e) =>
      props.onComChange(...e, { index, ...props.extraParams });
    // if (formType === 'Search') {
    //   comProps.onSelect = (...e) => props.onComChange(...e, {index, ...props.extraParams})
    // }
  }

  const selectProps = {
    allowClear: true,
    filterOption: true,
    showSearch: true,
    optionFilterProp: 'children',
    ...comProps,
  };

  if (formType === 'Search') {
    // selectProps.optionFilterProp = 'children';
    if (props.selectSearch) {
      // 注意 不要对 onSelect 方法 修改 否则会导致 字段无法设置值
      // selectProps.onChange = debounce(props.selectSearch, 1500);
    }
  }

  const formItemMap = {
    rowText: label,
    Label: LabelCom,
    CustomCom: CustomCom,
    plainText: (
      <span className={`plainText`} {...comProps}>
        {plainText}
      </span>
    ),
    Checkbox: renderCheckboxOp(props.checkboxData, {
      opType: props.opType,
      isDisabledAll: props.isDisabledAll,
      comProps: comProps,
    }),
    CheckboxItem: <Checkbox disabled={props.isDisabledAll} {...comProps} />,
    // Checkbox: <Checkbox>是1</Checkbox>,
    // Input: <Input className={'w-200'} disabled={props.isDisabledAll} {...comProps} />,
    Input: <Input disabled={props.isDisabledAll} {...comProps} />,
    // InputNumber: <InputNumber allowClear maxLength={32} {...comProps} />,
    Select: (
      <Select {...selectProps} disabled={props.isDisabledAll}>
        {renderSelectOp(props.selectData)}
      </Select>
    ),
    Search: (
      <Select {...selectProps} disabled={props.isDisabledAll}>
        {renderSelectOp(props.selectData)}
      </Select>
    ),
    // Select: <SelectCom {...props} comProps={comProps} disabled={props.isDisabledAll}></SelectCom>,
    // Search: <SelectCom {...props} comProps={comProps} disabled={props.isDisabledAll}></SelectCom>,
  };

  const formItemCom = formItemMap[formType];
  return formItemCom;
};

const FormListCom = props => {
  const { config = [], name, rowText, ...rest } = props;
  console.log(' FormListCom   props,   ： ', props);
  const formListCom = (
    <Form.List name={name} key={name}>
      {(fields, { add, remove }) => {
        console.log(' dataInit  fieldsfields ： ', fields);
        return (
          <Row gutter={24} className={`formRow`}>
            {rowText && !props.isDisabledAll && (
              <div
                className={`rowHeader fsb w100  ${
                  rowText.label ? 'formItems' : ''
                } ${rowText.rowTitle ? 'rowTitle' : 'rowItem'}`}
              >
                <div className={``}>{rowText.label ? rowText.label : ''}</div>
                {/* {props.renderHeaderRight && props.renderHeaderRight({ add, remove, })} */}
                <Button
                  shape="circle"
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => add()}
                ></Button>
              </div>
            )}
            {fields.map((field, index) => {
              const actionBtn = props.isDisabledAll ? null : (
                <div className="btnWrapper">
                  {/* <Button shape="circle" icon={<PlusOutlined />} type="primary" onClick={add} >新增</Button>
                <Button shape="circle" icon={<PlusOutlined />} onClick={remove}>删除</Button> */}
                  {props.extra
                    ? props.extra({
                        add,
                        remove: () => remove(field.name),
                        fields,
                        field,
                        index,
                      })
                    : null}
                  {/* <Button
                    shape="circle"
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => add()}
                  ></Button> */}
                  {/* {(!props.isLimitOne && fields.length > 1) && (
                  )} */}
                  <Button
                    shape="circle"
                    icon={<MinusOutlined />}
                    onClick={() => {
                      console.log(
                        ' 删除 ： ',
                        field,
                        fields,
                        props,
                        props.form.getFieldsValue(),
                        props.removeCb,
                      ); //
                      if (props.removeCb) {
                        props.removeCb({
                          field,
                        });
                      }
                      remove(field.name);
                    }}
                  ></Button>
                </div>
              );
              const formItem = config.map((v, i) => {
                const { comProps = {} } = v;
                return v.type !== 'rowText' && !v.rowTitle ? (
                  <Form.Item
                    {...field}
                    {...v.itemProps}
                    key={`${index}-${i}`}
                    label={v.label}
                    colon={false}
                    name={[field.name, v.name]}
                    fieldKey={[field.fieldKey, v.name]}
                    className={`formItems listFormItem  ${
                      v.type !== 'rowText' ? 'ant-col ant-col-12' : ''
                    } ${v.formItemCls ?? ''}`}
                    rules={
                      v.noRule || v.noRuleAll
                        ? undefined
                        : rules({ items: v, ...v })
                    }
                    {...(v.type !== 'rowText' ? formListLayout : {})}
                  >
                    {/* <Input className={'w-200'} {...comProps} /> */}
                    {getWidget({ ...v, ...rest, index })}
                  </Form.Item>
                ) : (
                  <div
                    className={`rowHeader fsb w100  ${
                      v.label ? 'formItems' : ''
                    } ${v.rowTitle ? 'rowTitle' : 'rowItem'}`}
                    key={`${index}-${i}`}
                  >
                    <div className={``}>
                      {v.label ? v.label + (index + 1) : ''}
                    </div>

                    {props.renderHeaderRight
                      ? props.renderHeaderRight({
                          add,
                          remove: () => remove(field.name),
                        })
                      : actionBtn}
                  </div>
                );
              });
              return formItem;
            })}
          </Row>
        );
      }}
    </Form.List>
  );
  return formListCom;
};

FormListCom.defaultProps = {
  // renderHeaderRight: () => {},
};

const EquipmentAcountForm = props => {
  console.log(' EquipmentAcountForm ： ', props, props.init);

  const { action } = props;

  const { data: provinceList, req: getProvinceAsync } = useHttp(getRegion, {
    // format: res => formatItemSelect(res),
    formatKey: 'name',
    formatVal: 'name',
    noMountFetch: true,
  });
  const { data: cityList, req: getCityAsync } = useHttp(getRegion, {
    // format: res => formatItemSelect(res),
    formatKey: 'name',
    formatVal: 'name',
    noMountFetch: true,
  });
  const { data: countryList, req: getCountryAsync } = useHttp(getRegion, {
    // format: res => formatItemSelect(res),
    formatKey: 'name',
    formatVal: 'name',
    noMountFetch: true,
  });

  const { data: cityList2, req: getCityAsync2 } = useHttp(getRegion, {
    // format: res => formatItemSelect(res),
    formatKey: 'name',
    formatVal: 'name',
    noMountFetch: true,
  });
  const { data: countryList2, req: getCountryAsync2 } = useHttp(getRegion, {
    // format: res => formatItemSelect(res),
    formatKey: 'name',
    formatVal: 'name',
    noMountFetch: true,
  });

  const regionConfig = [
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      // selectData: props.provinceList,
      selectData: provinceList,
      itemProps: {
        label: '省',
        // name: 'province',
        name: ['enterprise', 'province'],
        ...addrLayout1,
      },
      comProps: {
        className: 'w-135',
        onChange: (...arg) => onRegionChange('adcode', ...arg),
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      // selectData: props.
      selectData: cityList,
      itemProps: {
        label: '市',
        // name: 'city',
        name: ['enterprise', 'city'],
        ...addrLayout2,
      },
      comProps: {
        className: 'w-135',
        onChange: (...arg) => onRegionChange('city_code', ...arg),
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      // selectData: props.countryList,
      selectData: countryList,
      itemProps: {
        label: '县',
        // name: 'area',
        name: ['enterprise', 'area'],
        ...addrLayout2,
      },
      comProps: {
        className: 'w-135',
        onChange: (...arg) => onRegionChange('district', ...arg),
      },
    },
  ];

  const onRegionChange = (changeKey, params, item) => {
    console.log(
      ' onRegionChange   changeKey, params, item,   ： ',
      changeKey,
      params,
      item,
    );
    props.propsForm.setFieldsValue({
      enterprise: {
        [changeKey]: item.adcode,
      },
    });
  };

  const onAreaChange = async params => {
    console.log('    onAreaChange ： ', params, props);
    const { form } = params;
    if (params.value.enterprise?.province) {
      console.log(' onFieldChange 清空 province ： ');
      const resetParams = {
        enterprise: {
          city: null,
          area: null,
        },
      };
      props.propsForm.setFieldsValue(resetParams);
      const { city, area, ...data } = params.formData.enterprise;
      console.log(' onFieldChange 搜索 province ： ', params.value.province);
      // getCityAsync(() => getDistrict(data));
      getCityAsync(() =>
        getRegionOne({
          keywords: params.value?.enterprise?.province,
        }),
      );
      return;
    }
    if (params.value.enterprise?.city) {
      console.log(' onFieldChange 清空 city ： ');
      const resetParams = {
        enterprise: {
          area: null,
        },
      };
      props.propsForm.setFieldsValue(resetParams);
      const { area, ...data } = params.formData.enterprise;
      console.log(' onFieldChange 搜索 city ： ', params.value.city);
      // getCountryAsync(() => getDistrict(data));
      getCountryAsync(() =>
        getRegionOne({
          keywords: params.value?.enterprise?.city,
        }),
      );
      return;
    }
    if (params.value.enterprise?.area) {
      console.log(' onFieldChange 清空 area ： ');
      const res = formatSelectList(
        (
          await getRegionOne({
            keywords: params.value?.enterprise?.area,
          })
        ).list,
        'name',
      );
      const adcode = res[0]?.adcode;
      const city_code = res[0]?.citycode;
      const [longitude, latitude] = res[0]?.center?.split(',');
      const { province, city, area } = params.formData.enterprise;
      const address = province + city + area;
      console.log(
        '  res await 结果  ：',
        res,
        adcode,
        city_code,
        address,
        params,
      );
      if (adcode) {
        props.propsForm.setFieldsValue({
          // enterprise: { adcode, city_code, address, longitude, latitude, },
          enterprise: { address, longitude, latitude },
        });
      }
      return;
    }
  };
  const onFieldChange = params => {
    console.log(' onFieldChange  ： ', params, props);
    onAreaChange(params);
  };

  const areaConfig = [
    // {
    //   formType: 'Cascader',
    //   itemProps: {
    //     label: '区域',
    //     name: 'region',
    //   },
    //   comProps: {
    //     options: regoins,
    //   },
    // },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '区域',
    //     name: 'areas',
    //   },
    //   comProps: {
    //     disabled: true,
    //   },
    // },
    {
      colCls: 'hidden',
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '城市编码',
        name: ['enterprise', 'city_code'],
        ...addrLayout1,
        // hidden: true,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      // noRule: true,
      flexRow: 3,
      // noRule: true,
      itemProps: {
        label: '行政区域编码',
        // name: 'adcode',
        name: ['enterprise', 'adcode'],
        ...addrLayout1,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      // noRule: true,
      flexRow: 3,
      // noRule: true,
      itemProps: {
        label: '经度',
        // name: 'longitude',
        name: ['enterprise', 'longitude'],
        ...addrLayout2,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      // noRule: true,
      flexRow: 3,
      // noRule: true,
      itemProps: {
        label: '纬度',
        // name: 'latitude',
        name: ['enterprise', 'latitude'],
        ...addrLayout2,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
  ];
  const deviceInfoConfig = [
    {
      formType: 'rowText',
      itemProps: {
        label: '设备基本信息',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '设备名称',
        name: 'keyword',
      },
    },
    {
      itemProps: {
        label: '设备类型',
        name: 'keyword',
      },
    },
    {
      itemProps: {
        label: '装机客量(kWh)',
        name: 'keyword',
      },
    },
    {
      itemProps: {
        label: '额定电压(V)',
        name: 'keyword',
      },
    },
    {
      itemProps: {
        label: '额定电流(A)',
        name: 'keyword',
      },
    },

    ...(action === 'detail' ? [] : regionConfig),
    {
      flexRow: 1,
      // formType: 'Search',
      itemProps: {
        label: '详细地址',
        name: ['enterprise', 'address'],
        ...addrLayout,
      },
      comProps: {
        className: 'rowInput ',
        // onChange: props.onAddressChange,
      },
    },
    ...areaConfig,
    {
      formType: 'rowText',
      itemProps: {
        label:
          'Tips: 选择省市区后自动填写行政区域编码，输入地址后自动填写经纬度！',
        className: 'w100 textCenter',
      },
    },
    {
      itemProps: {
        label: '电力监控设备',
        name: 'keyword1',
      },
    },
    {
      itemProps: {
        label: '温湿度监控sn',
        name: 'keyword2',
      },
    },
    {
      itemProps: {
        label: '监控告警设置',
        name: 'keyword3',
      },
    },
  ];

  const config = [
    ...deviceInfoConfig,
    {
      noRule: true,
      formType: 'CustomCom',
      CustomCom: <div></div>,
      itemProps: {
        label: '',
        name: 'block',
        className: 'ant-col-12 ',
      },
    },
  ].map(v => ({
    ...v,
    comProps: { className: `w-200 ${v.comProps?.className}`, ...v.comProps },
  }));

  const formCom = (
    <SmartForm
      config={config}
      isDisabledAll={action === 'detail'}
      {...props}
      init={{
        ...objNum2str(props.init, [
          // 'service_organization_id',
          'service_staff_id',
          'last_service_staff_id',
          'service_enterprise_id',
          'tags',
        ]),
      }}
      formLayouts={formLayouts}
      flexRow={2}
      onFieldChange={onFieldChange}
    ></SmartForm>
  );

  console.log(' configconfig ： ', config);

  return (
    <div classname="equipmentAcountForm">
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          console.log(' name, values, forms ： ', name, values, forms);
        }}
      >
        {formCom}
      </Form.Provider>
    </div>
  );
};

FormListCom.defaultProps = {};

export default EquipmentAcountForm;
