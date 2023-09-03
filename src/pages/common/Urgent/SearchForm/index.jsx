// import React from 'react';
import { Input, Select } from 'antd';
// import './index.less';
import styles from './index.module.less';
import { mapInstance } from '../index.jsx';
import searchIcon from '@/static/img/urgent/search.png';
import dropdownIcon from '@/static/img/urgent/dropdown.png';

const SearchForm = props => {
  const { dataList, onClickMarker } = props;

  const dataLists = dataList.map((v, index) => ({
    value: index,
    label: v.title,
    position: v.position,
  }));

  const options = [
    { value: 'no', label: '户号' },
    { value: 'car', label: '车辆' },
    { value: 'man', label: '人员' },
  ];

  const moveToPosition = (item = []) => {
    // const { mapObj } = urgentStore();
    console.log(' moveToPosition ： ', mapInstance, item);
    mapInstance.setZoomAndCenter(18, item.position);
    onClickMarker(item);
    // mapObj.clear();
    // mapObj.renderPopInfoWindow(item);
  };
  const handleChange = (value, item) => {
    console.log(`selected ${value}`, item, item.position, item.position[0]);
    moveToPosition(item);
  };
  const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <div className={styles.urgentSearchForm}>
      <Input.Group compact className={styles.group}>
        <Select
          className={styles.select2}
          onChange={handleChange}
          bordered={false}
          suffixIcon={<img className={styles.imgIcon} src={searchIcon} />}
          showSearch
          popupClassName={styles.searchFormSelect}
          placeholder="请按点位名称搜索"
          options={dataLists}
          filterOption={filterOption}
        >
          {/* {DispatchDataList.filter(item => item.value !== selected).map(
            item => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ),
          )} */}
        </Select>
        <div className={styles.divider} />
        <Select
          className={styles.select1}
          onChange={handleChange}
          bordered={false}
          suffixIcon={<img className={styles.imgIcon} src={dropdownIcon} />}
          showSearch
          popupClassName={styles.searchFormSelect}
          placeholder="点位名称"
          options={options}
          filterOption={filterOption}
        />
      </Input.Group>
    </div>
  );
};

export default SearchForm;
