export const SELECT_TXT = '请选择';
export const INPUT_TXT = '请输入';
export const WORD = '关键字';
export const REQUIRE = '字段必填！';

export const noLabelLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};

export const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};

export const comDefProps = ({ formType }) => {
  const comPropsMap = {
    rowText: '',
    Divider: {
      rules: null,
    },
    Input: {
      allowClear: true,
    },
    InputNumber: {},
    TextArea: {
      allowClear: true,
      // autoSize: {
      //   minRows: 4,
      //   // maxRows: 5
      // }
    },
    Select: {
      allowClear: true,
      filterOption: true,
      showSearch: true,
    },
    Search: {
      allowClear: true,
      filterOption: true,
      showSearch: true,
      optionFilterProp: 'children',
    },
    Switch: {
      // valuePropName: 'checked',
    },
    Password: {},
    Cascader: {},
    Radio: {},
    Checkbox: {},
    CheckboxItem: {},
    DatePicker: {},
    MonthPicker: {
      picker: 'month',
    },
    RangePicker: {
      format: 'YYYY/MM/DD',
      // ranges: {
      //   今天: [moment(), moment()],
      //   这个月: [moment().startOf('month'), moment().endOf('month')],
      // },
    },
    Rate: {},
    Slider: {},
    Cascader: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
    },
    AutoComplete: {
      options: [
        {
          value: 'Burns Bay Road',
        },
        {
          value: 'Downing Street',
        },
        {
          value: 'Wall Street',
        },
      ],
      filterOption: (input, option) => {
        return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
      },
    },
    TreeSelect: {
      allowClear: true,
      showSearch: true,
      treeDefaultExpandAll: true,
      treeNodeFilterProp: 'label',
    },
  };

  return comPropsMap[formType];
};

export const getLabel = (label, key) => {
  const labelMap = {
    rowText: '',
    Divider: ' ',
    Input: INPUT_TXT + label,
    InputNumber: INPUT_TXT + label,
    Password: INPUT_TXT + label,
    TextArea: INPUT_TXT + label,
    Select: SELECT_TXT + label,
    Search: SELECT_TXT + label,

    Radio: SELECT_TXT + label,
    Checkbox: SELECT_TXT + label,
    CheckboxItem: SELECT_TXT + label,
    DatePicker: SELECT_TXT + label,
    MonthPicker: SELECT_TXT + label,
    // RangePicker: SELECT_TXT + label,
    Rate: SELECT_TXT + label,
    Slider: SELECT_TXT + label,
    Cascader: SELECT_TXT + label,
    AutoComplete: INPUT_TXT + label,
    TreeSelect: SELECT_TXT + label,
  };

  return labelMap[key];
};

export const rules = (params, extra) => {
  const { label, formType, ruleExtra } = params;
  // const message = getLabel(label, formType);
  // console.log(' rules 校验规则 ： ', params, extra, message, label, formType,  );

  return [
    {
      required: true,
      message: label + REQUIRE,
    },
    ...(ruleExtra ? ruleExtra : []),
  ];
};

export const formItemDefProps = ({ item, props }) => {
  const formItemPropsMap = {
    rowText: {
      ...noLabelLayout,
      className: 'xx',
    },
    Divider: {
      ...noLabelLayout,
    },
    Input: {},
    InputNumber: {},
    TextArea: {},
    Select: {},
    Search: {},
    Switch: {
      valuePropName: 'checked',
    },
    Password: {},
    Cascader: {},
    Radio: {},
    Checkbox: {},
    CheckboxItem: {},
    DatePicker: {},
    MonthPicker: {},
    RangePicker: {},
    Rate: {},
    Slider: {},
    Cascader: {},
    AutoComplete: {},
    TreeSelect: {},
  };

  const {
    formType = 'Input',
    checkboxContent,
    itemProps = {},
    comProps = {},
    radioOptions,
    selectOptions,
    customLabel,
    rowText,
    extra,
    type,
    noRule,
    radioData = [],
    checkboxData = [],
    selectData = [],
    selectSearch,
    opType,
    haveDivider,
    isSearchForm,
    searchSuffix,
    CustomCom,
    noLabel,
    LabelCom,
    plainText,
    ruleExtra,
    formRules,
    flexRow,
  } = item;

  const { noRuleAll } = props; //
  const { label } = itemProps;

  let rulesRes = rules({
    label,
    ruleExtra,
  });
  if (formRules) {
    rulesRes = formRules;
  }
  if (noRule || noRuleAll) {
    rulesRes = undefined;
  }

  const formItemProps = {
    colon: false,
    key: itemProps.key || itemProps.name || Math.random(),
    ...formItemPropsMap[formType],
    ...itemProps,
    className: `${itemProps?.className || ''} formItems`,
    rules: rulesRes,
  };
  if (noLabel) {
    formItemProps.label = '';
  }

  return formItemProps;
};

export const defProps = {
  formItemDefProps: formItemDefProps,
  comDefProps: comDefProps,
  getLabel: getLabel,
  rules: rules,

  registerComp: () => {},
  name: 'smartForm',
  config: [],
  formProps: {},
  formItemLayout: formItemLayout,
  init: {},
  flexRow: 0,
  formBtn: {},
  isRowBtn: false,
  getList: () => ({}),
  onSubmit: () => ({}),
  onFail: () => ({}),
  onFieldChange: () => ({}),
  propsForm: null,
  isMockData: false,
  action: '',
  noPh: false,
  formLayout: formItemLayout,
  isSearchForm: false,
  isFormat: false,
  searchRight: false,
  isDisabledAll: false,
  noRuleAll: false,
  noLabelLayout: false,
};
