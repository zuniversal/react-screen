import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForms';
import { notifyTypeConfig, fullFormLayouts } from '@/configs';

const defRule = {
  role: {
    // 0: {fields: 'current', range: {0: null, 1: null}, duration: null},
    // 1: {fields: 'voltage', range: {0: null, 1: null}, duration: null},
    // 2: {fields: 'load', threshold: null, duration: null},
    one: { fields: 'current', range: { 0: null, 1: null }, duration: null },
    two: { fields: 'voltage', range: { 0: null, 1: null }, duration: null },
    three: { fields: 'load', threshold: null, duration: null },
  },
};

const AlarmStrategyForm = props => {
  const ruleConfig = [
    {
      formType: 'rowText',
      itemProps: {
        label: '电压阈值',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '电压过低',
        name: ['conf', 'voltage_min'],
      },
      comProps: {
        addonAfter: 'V',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '电压过高',
        name: ['conf', 'voltage_max'],
      },
      comProps: {
        addonAfter: 'V',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '持续',
        name: ['conf', 'voltage_duration'],
      },
      comProps: {
        addonAfter: 'S',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '负载',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '阈值',
        name: ['conf', 'load_threshold'],
        extra: '范围 0 ~ 1',
      },
      comProps: {
        min: 0,
        max: 1,
        step: 0.01,
        precision: 2,
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '持续时间',
        name: ['conf', 'load_duration'],
      },
      comProps: {
        addonAfter: 'S',
      },
    },
  ];

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息',
      },
    },
    {
      // noRule: true,
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
    {
      formType: 'Select',
      selectData: notifyTypeConfig,
      // formType: 'Checkbox',
      // checkboxData: notifyTypeConfig,
      itemProps: {
        label: '通知方式',
        name: ['conf', 'notify'],
      },
      comProps: {
        mode: 'multiple',
        options: notifyTypeConfig,
      },
    },
    {
      itemProps: {
        label: '备注',
        name: 'remark',
      },
    },
    ...ruleConfig,
  ];

  return (
    <SmartForm
      className={`alarmStrategyForm`}
      config={config}
      {...props}
      init={{
        // ...defRule,
        ...props.init,
      }}
    ></SmartForm>
  );
};

export default AlarmStrategyForm;
