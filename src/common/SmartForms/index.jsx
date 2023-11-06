import React, { isValidElement } from 'react';
import {
  Form,
  Divider,
  Input,
  InputNumber,
  Select,
  Switch,
  Radio,
  Checkbox,
  DatePicker,
  Rate,
  Slider,
  Cascader,
  AutoComplete,
  TreeSelect,
  Row,
  Col,
  Button,
  Space,
  Tooltip,
} from 'antd';
import {
  QuestionCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import debounce from 'lodash/debounce';
import { defProps } from './config';

const bounceIn = '';

const calcCustomProps = props => {
  const { isSearchForm } = props;
  const customProps = {};
  if (isSearchForm) {
    customProps.layout = 'inline';
  }
  return customProps;
};

const SmartForm = (props, state) => {
  console.log(' SmartForm props ： ', props);
  const {
    className,
    searchRight,

    children,

    formItemDefProps,
    comDefProps,
    getLabel,
    rules,

    name,
    config,
    registerComp,
    formProps,
    formItemLayout,
    model,
    init = {},
    formBtn,
    isRowBtn,
    getList,
    onSubmit,
    onFail,
    onFieldChange,
    propsForm,
    isMockData,
    action,
    noPh,
    formLayout,
    isSearchForm,
    isFormat,
    isDisabledAll,
    noRuleAll,
    noLabelLayout,
    top,
    bottom,
    ...rest
  } = props;
  const [form] = Form.useForm();
  const formControl = propsForm ? propsForm : form;
  const formState = init;

  const onFinish = (values, rest) => {
    console.log('onFinish: ', values, rest, form, props);
    onSubmit && onSubmit({ values, form });
  };

  const onFinishFailed = (errorInfo, rest) => {
    console.log('Failed: ', errorInfo, rest, form, onFail);
    onFail && onFail({ err: errorInfo, form });
  };

  const onValuesChange = debounce((value, formData) => {
    console.log('onValuesChange ： ', props, value, formData);
    if (isSearchForm) formData.page = 7;
    onFieldChange &&
      onFieldChange({
        value,
        formData,
        form: formControl,
        changeKey: Object.keys(value)[0],
      });
  }, 500);

  const mockFormData = () => {
    console.log(' mockFormData   ,   ： ');
  };
  // const initialValues = init;
  const configs = typeof config === 'function' ? config({ formState }) : config;
  const initialValues = Object.keys(init).length
    ? init
    : isMockData
    ? mockFormData(configs, init)
    : init;

  const formItems = configs?.map((item, i) => {
    // console.log(' item   ,   ： ', typeof item, item);
    const isVNodeItem = isValidElement(item);
    if (isVNodeItem) {
      // Object.assign(item, {key: (item?.props?.name || Math.random())})
      return {
        ...item,
        key: item?.props?.name || Math.random(),
      };
    }

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
      extraProps,
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
      flexRow = 1,
      colCls,
    } = item;

    const { label } = itemProps;

    const formItemProps = formItemDefProps({ item, props });

    const formLabel = customLabel ? customLabel : getLabel(label, formType);
    const placeholder =
      noPh || action === 'detail' || isDisabledAll ? '' : formLabel;

    if (formType === 'Input' || isSearchForm) {
      comProps.onPressEnter = getList;
    }
    if (searchSuffix) {
      comProps.suffix = <SearchOutlined className="searchIcon" />;
    }

    if (formType === 'Search') {
      if (item.selectSearch) {
        comProps.onSearch = debounce(item.selectSearch, 1500);
      }
    }
    const realComProps = {
      placeholder: placeholder,
      disabled: action === 'detail',
      ...comDefProps({ formType }),
      ...comProps,
      // className: `${comProps.className ?? ''} w-320`,
      className: `${comProps.className ?? ''} w-320`,
    };

    const formItemMap = {
      rowText: <div className={`rowText`}>{label}</div>,
      Label: LabelCom,
      CustomCom: CustomCom,
      PlainText: (
        <span className={`plainText`} {...comProps}>
          {plainText}
        </span>
      ),
      Divider: <Divider {...realComProps}>{realComProps?.children}</Divider>,
      Input: <Input {...realComProps} />,
      InputNumber: <InputNumber {...realComProps} />,
      Password: <Input.Password {...realComProps} />,
      TextArea: <Input.TextArea {...realComProps} />,
      Select: <Select {...realComProps}></Select>,
      Search: <Select {...realComProps}></Select>,
      Switch: <Switch {...realComProps} />,
      Radio: <Radio.Group {...realComProps}></Radio.Group>,
      Checkbox: <Checkbox.Group {...realComProps}></Checkbox.Group>,
      CheckboxItem: <Checkbox {...realComProps} />,
      DatePicker: <DatePicker {...realComProps} />,
      MonthPicker: <DatePicker {...realComProps} />,
      RangePicker: <DatePicker.RangePicker {...realComProps} />,
      Rate: <Rate {...realComProps}></Rate>,
      Slider: <Slider {...realComProps}></Slider>,
      Cascader: <Cascader {...realComProps} />,
      AutoComplete: (
        <AutoComplete {...realComProps}>
          <Input />
        </AutoComplete>
      ),
      TreeSelect: <TreeSelect {...realComProps}></TreeSelect>,
      ...registerComp({ formState }),
    };

    const formItemCom = formItemMap[formType];

    // const isCustomCom = item.formType === 'CustomCom';
    // if (isVNodeItem || isCustomCom) {
    //   // const isFormItem = item.type?.name === 'AFormItem';
    //   const isFormItem = false;
    //   console.log(' isFormItem ： ', isFormItem); //
    //   const isString = typeof item.type === 'string';
    //   // console.log(' isFormItem ： ', isFormItem, item, item.type?.name, isString, typeof item.type)//
    //   if (isFormItem) {
    //     return item;
    //   }
    //   if (isString) {
    //     // console.log(' 普通dom ： ', item   )
    //     return (
    //       <Form.Item label="  " colon={false} {...item.comProps}>
    //         {item}
    //       </Form.Item>
    //     );
    //   }
    //   if (item.formType === 'CustomCom') {
    //     // console.log(' 普通 isCustomCom ： ', item   )
    //     return (
    //       <Form.Item label="  " key={Math.random()} colon={false} {...item.itemProps}>
    //         {item?.children}
    //       </Form.Item>
    //     );
    //   }
    // }
    // console.log(
    //   ' formItemProps ： ',
    //   item,
    //   realComProps,
    //   formItemProps,
    //   formItemCom,
    // );
    if (!formItemCom) {
      return <div key={Math.random()}>没有匹配</div>;
    }
    if (formType === 'rowText' || formType === 'CustomCom') {
      return (
        <Form.Item key={Math.random()} {...formItemProps}>
          {formItemCom}
        </Form.Item>
      );
    }
    if (extra) {
      const { label, key, rules, ...rest } = formItemProps;
      return (
        <Form.Item key={key} label={label} className={'extraRow'}>
          <Form.Item rules={rules} {...rest}>
            {formItemCom}
          </Form.Item>
          <Form.Item className={'extraCls'} {...extraProps}>
            {extra}
          </Form.Item>
        </Form.Item>
      );
    }

    const formItemComponent = (
      <Form.Item {...formItemProps}>{formItemCom}</Form.Item>
    );
    // console.log(' flexRowflexRow  ： ', formType, formItemCom, flexRow);
    if (flexRow) {
      const { key } = formItemProps;
      const colForm = (
        <Col
          span={24 / Number(flexRow)}
          className={`flexRowsCls ${colCls ?? ''}  ${'itemPropsCls'}`}
          key={key}
        >
          {formItemComponent}
        </Col>
      );

      return colForm;
    }
    return formItemComponent;
  });

  const customProps = calcCustomProps(props);

  return (
    <Form
      preserve={false}
      scrollToFirstError
      name={name}
      form={formControl}
      initialValues={initialValues}
      {...formLayout}
      {...customProps}
      {...formProps}
      {...rest}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={onValuesChange}
      className={`smartForm ${className} ${searchRight ? 'searchRight' : ''}  `}
    >
      {top}

      <Row gutter={24}>{formItems}</Row>

      {children}

      {bottom}
    </Form>
  );
};

export default SmartForm;

SmartForm.defaultProps = defProps;

export const SearchForm = props => {
  return <SmartForm noRuleAll isSearchForm {...props}></SmartForm>;
};
