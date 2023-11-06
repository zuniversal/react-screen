import React, { useEffect } from 'react';
import './style.less';
import SmartForm from '@/common/SmartForms';
import { getRegion } from '@/services/amap';
import { getList as getAlarmStrategyList } from '@/services/alarmStrategy';
import useHttp from '@/hooks/useHttp';
import { deviceTypeConfig } from '@/configs';

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

const AlarmRecordForm = props => {
  console.log(' AlarmRecordForm ： ', props);
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

  const onRegionChange = (changeKey, params, item) => {
    console.log(
      ' onRegionChange   changeKey, params, item,   ： ',
      changeKey,
      params,
      item,
    );
  };

  const onFieldChange = params => {
    const res = props.propsForm.getFieldsValue();
    console.log(' onFormFieldChange   params,   ： ', params, res);
    if (params.changeKey === 'province') {
      props.getCityListAsync({
        keywords: params.value[params.changeKey],
      });
      props.setAttrs({
        payload: {
          cityList: [],
          countryList: [],
        },
      });
      props.propsForm.setFieldsValue({
        city: null,
        country: null,
      });
    } else if (params.changeKey === 'city') {
      props.getCountryListAsync({
        keywords: params.value[params.changeKey],
      });
      props.setAttrs({
        payload: {
          countryList: [],
        },
      });
      props.propsForm.setFieldsValue({
        country: 'null',
      });
    }
  };
  useEffect(() => {
    console.log(' getProvinceListAsync ： ', props);
    props.getProvinceListAsync();
  }, []);
  // const provinceList = [];
  // const { data: provinceList, req: getProvinceListAsync } = useHttp(
  //   // () => getRegion({}),
  //   getRegion,
  //   {
  //     format: res => {
  //       console.log(' getRegion res ： ', res);
  //       return res[0].districts.map(v => ({
  //         ...v,
  //         label: v.name,
  //         value: v.adcode,
  //       }));
  //     },
  //   },
  // );
  // const { data: cityList, req: getCityListAsync } = useHttp(getRegion, {
  //   format: res => {
  //     return res[0].districts.map(v => ({
  //       ...v,
  //       label: v.name,
  //       value: v.adcode,
  //     }));
  //   },
  // });
  // const { data: countryList, req: getCountryListAsync } = useHttp(getRegion, {
  //   format: res => {
  //     return res[0].districts.map(v => ({
  //       ...v,
  //       label: v.name,
  //       value: v.adcode,
  //     }));
  //   },
  // });
  const cityList = [];
  const countryList = [];
  // const { data: cityList, req: getCityAsync } = useHttp(getRegion, {
  //   // format: res => formatItemSelect(res),
  //   formatKey: 'name',
  //   formatVal: 'name',
  // });
  // const { data: countryList, req: getCountryAsync } = useHttp(getRegion, {
  //   // format: res => formatItemSelect(res),
  //   formatKey: 'name',
  //   formatVal: 'name',
  // });

  const regionConfig = [
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
        options: props.cityList,
        className: 'w-135',
        // onChange: (...arg) => onRegionChange('city_code', ...arg),
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
        options: props.countryList,
        className: 'w-135',
        // onChange: (...arg) => onRegionChange('district', ...arg),
      },
    },
  ];

  const areaConfig = [
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
  ];

  const config = [
    {
      formType: 'rowText',
      flexRow: 1,
      itemProps: {
        label: '设备基本信息',
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
        name: 'block',
        className: 'ant-col-12 ',
      },
    },

    ...regionConfig,
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
        className: 'w100',
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
    <SmartForm
      className="equipmentAccountForm"
      config={config}
      // {...props}
      onFieldChange={onFieldChange}
    ></SmartForm>
  );
};

export default AlarmRecordForm;
