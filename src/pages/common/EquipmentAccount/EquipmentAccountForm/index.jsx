import React, { useEffect } from 'react';
import './style.less';
import SmartForm from '@/common/SmartForms';
import { getRegion } from '@/services/amap';
import { getList as getAlarmStrategyList } from '@/services/alarmStrategy';
import useHttp from '@/hooks/useHttp';
import { deviceTypeConfig } from '@/configs';
import { Button } from 'antd';

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

const EquipmentAccountForm = props => {
  console.log(' EquipmentAccountForm ： ', props);
  const {
    setAttrs,
    getCityListAsync,
    getCountryListAsync,
    getProvinceListAsync,
    ...rest
  } = props;

  const { data: alarmStrategyList, req: getAlarmStrategyListAsync } = useHttp(
    () =>
      getAlarmStrategyList({
        page_size: 1000,
      }),
    {
      format: res => {
        console.log(' getRegion res ： ', res);
        return res.map(v => ({
          ...v,
          label: v.name,
          value: v.id,
          key: v.id,
        }));
      },
    },
  );
  console.log(' alarmStrategyList ： ', alarmStrategyList);
  const getCityList = keywords => {
    console.log(' getCityList  ： ');
    props.getCityListAsync({
      keywords,
    });
    props.setAttrs({
      payload: {
        cityList: [],
        countryList: [],
      },
    });
    props.propsForm.setFieldsValue({
      city: null,
      district: null,
    });
  };
  const getCountryList = keywords => {
    console.log(' getCountryList  ： ');
    props.getCountryListAsync({
      keywords,
    });
    props.setAttrs({
      payload: {
        countryList: [],
      },
    });
    props.propsForm.setFieldsValue({
      district: null,
    });
  };

  const onFieldChange = params => {
    console.log(' onFormFieldChange  ： ', params);
    if (params.changeKey === 'province') {
      getCityList(params.value[params.changeKey]);
    } else if (params.changeKey === 'city') {
      getCountryList(params.value[params.changeKey]);
    }
  };
  useEffect(() => {
    console.log(' getProvinceListAsync ： ', props);
    props.getProvinceListAsync();
    if (Object.keys(props.init).length) {
      props.getCityListAsync({
        keywords: props.init.city,
      });
      props.getCountryListAsync({
        keywords: props.init.district,
      });
    }
  }, []);

  const cityList = [];
  const countryList = [];
  const regionConfig = [];

  const config = [
    {
      formType: 'rowText',
      flexRow: 1,
      itemProps: {
        label: (
          <div className="actionBtnWrapper">
            <div>设备基本信息</div>
            {props.action === 'detail' && (
              <Button
                type="primary"
                onClick={() =>
                  props.getDataDetailAsync({
                    action: 'getDataDetailAsync',
                    extraData: props.init,
                    id: props.init.id,
                    query: 7,
                  })
                }
              >
                查看数据
              </Button>
            )}
          </div>
        ),
        className: 'w100',
      },
    },
    {
      flexRow: 2,
      itemProps: {
        label: '设备名称',
        name: 'name',
      },
    },
    {
      formType: 'Select',
      flexRow: 2,
      itemProps: {
        label: '设备类型',
        name: 'device_type',
      },
      comProps: {
        options: deviceTypeConfig,
      },
    },
    {
      formType: 'InputNumber',
      flexRow: 2,
      itemProps: {
        label: '装机客量(kWh)',
        name: 'capacity',
      },
      comProps: {
        min: 0,
      },
    },
    {
      formType: 'InputNumber',
      flexRow: 2,
      itemProps: {
        label: '额定电压(V)',
        name: 'voltage',
      },
      comProps: {
        min: 0,
      },
    },
    {
      formType: 'InputNumber',
      flexRow: 2,
      itemProps: {
        label: '额定电流(A)',
        name: 'current',
      },
      comProps: {
        min: 0,
      },
    },
    {
      noRule: true,
      formType: 'CustomCom',
      CustomCom: <div></div>,
      itemProps: {
        label: '',
        name: 'BLOCK',
        className: 'ant-col-12 ',
      },
    },

    {
      // noRule: true,
      flexRow: 3,
      formType: 'Search',
      // selectData: props.provinceList
      itemProps: {
        label: '省',
        name: 'province',
        ...addrLayout1,
      },
      comProps: {
        optionFilterProp: 'label',
        // options: provinceList,
        options: props.provinceList,
        className: 'w-135',
        onChange: (...arg) => {
          const { label } = arg[1];
          console.log(' xxxx ： ', arg, label);
          // getCityListAsync(() =>
          //   getRegion({
          //     keywords: label,
          //   }),
          // );
        },
      },
    },
    {
      // noRule: true,
      flexRow: 3,
      formType: 'Search',
      // selectData: props.
      selectData: cityList,
      itemProps: {
        label: '市',
        name: 'city',
        ...addrLayout2,
      },
      comProps: {
        optionFilterProp: 'label',
        options: props.cityList,
        className: 'w-135',
        // onSearch: value => {
        //   console.log('  onSearch ： ', value);
        //   getCityList(value);
        // },
      },
    },
    {
      // noRule: true,
      flexRow: 3,
      formType: 'Search',
      // selectData: props.countryList,
      selectData: countryList,
      itemProps: {
        label: '县',
        name: 'district',
        ...addrLayout2,
      },
      comProps: {
        optionFilterProp: 'label',
        options: props.countryList,
        className: 'w-135',
        // onChange: (...arg) => onRegionChange('district', ...arg),
        onChange: (value, item) => {
          console.log(' onChangearg ： ', value, item);
          const [longitude, latitude] = item.center.split(',');
          props.propsForm.setFieldsValue({
            district_code: item.adcode,
            longitude,
            latitude,
          });
        },
      },
    },
    {
      flexRow: 1,
      // formType: 'Search',
      itemProps: {
        label: '详细地址',
        name: 'address',
        ...addrLayout,
      },
      comProps: {
        min: 0,
        className: 'w100 address',
      },
    },
    {
      noPh: true,
      flexRow: 3,
      itemProps: {
        label: '行政区域编码',
        name: 'district_code',
        ...addrLayout1,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      noPh: true,
      flexRow: 3,
      itemProps: {
        label: '经度',
        name: 'longitude',
        ...addrLayout2,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      noPh: true,
      flexRow: 3,
      itemProps: {
        label: '纬度',
        name: 'latitude',
        ...addrLayout2,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label:
          'Tips: 选择省市区后自动填写行政区域编码，输入地址后自动填写经纬度！',
        className: 'w100 textCenter',
      },
    },
    {
      flexRow: 2,
      itemProps: {
        label: '设备sn',
        name: 'sn',
      },
    },
    {
      flexRow: 2,
      itemProps: {
        label: '电力设备sn',
        name: 'ele_sn',
      },
    },
    {
      flexRow: 2,
      itemProps: {
        label: '温湿度设备sn',
        name: 'ht_sn',
      },
    },
    {
      formType: 'Search',
      flexRow: 2,
      itemProps: {
        label: '监控告警设置',
        name: 'monitor_id',
        // onChange: ev => {
        //   getAlarmStrategyListAsync(() =>
        //     getAlarmStrategyList({
        //       query: ev.target.value,
        //       page_size: 1000,
        //     }),
        //   );
        // },
        // key: alarmStrategyList,
      },
      comProps: {
        options: alarmStrategyList,
        optionFilterProp: 'label',
        onChange: ev => {
          console.log(' onChange ： ', ev);
        },
      },
    },
  ].map(v => ({
    ...v,
    comProps: { className: `w-200 ${v.comProps?.className}`, ...v.comProps },
  }));

  return (
    <>
      <SmartForm
        className="equipmentAccountForm"
        config={config}
        // {...props}
        {...rest}
        onFieldChange={onFieldChange}
      ></SmartForm>
    </>
  );
};

EquipmentAccountForm.defaultProps = {
  init: {},
};

export default EquipmentAccountForm;
