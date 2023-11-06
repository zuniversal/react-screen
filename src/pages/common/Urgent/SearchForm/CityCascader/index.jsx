import React from 'react';
import { Cascader } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './style.less';

const CityCascader = props => {
  return (
    <Cascader
      suffixIcon={<CaretDownOutlined />}
      bordered={false}
      {...props}
      className={'a-cascader'}
      popupClassName={'a-cascader-menus'}
    />
  );
};

export default CityCascader;
