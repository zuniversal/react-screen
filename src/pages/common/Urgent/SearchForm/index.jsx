// import React from 'react';
import { Input, Select, Cascader } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import allArea from './area.json';
import CityCascader from './CityCascader';
// import './style.less';
import styles from './index.module.less';
import { mapInstance } from '../index.jsx';
import searchIcon from '@/static/img/urgent/search.png';
import dropdownIcon from '@/static/img/urgent/dropdown.png';

const fieldNames = { label: 'name', value: 'adcode', children: 'districts' };

// const CityCascader = props => {
//   return (
//     <Cascader
//       suffixIcon={<CaretDownOutlined />}
//       bordered={false}
//       {...props}
//       className={'a-cascader'}
//       popupClassName={'a-cascader-menus'}
//     />
//   );
// };

const SearchForm = props => {
  const { dataList, customerList, pointList, onClickMarker } = props;
  const [popupVisible, setPopupVisible] = React.useState(false);
  console.log(' SearchForm props ： ', props);

  const dataLists = dataList;
  // const dataLists = dataList.map((v, index) => ({
  //   value: index,
  //   label: v.title,
  //   position: v.position,
  // }));

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
    props.getPointStatisticsAsync({ id: value });
    moveToPosition(item);
  };
  const onCustomerChange = (value, item) => {
    console.log(
      `onCustomerChange`,
      value,
      item,
      item.position,
      item.position[0],
    );
    // props.onClickMarker(item);
    // props.getPointStatisticsAsync({ id: value });
    // props.getPointListAsync({ id: value.id });
    moveToPosition(item);
  };
  const onPonintChange = (value, item) => {
    console.log(`onPonintChange`, value, item, item.position, item.position[0]);
    moveToPosition(item);
  };
  const filterOption = (input, option) => {
    console.log(' input, option ： ', input, option);
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const onCityCascaderChange = e => {
    console.log(' onCityCascaderChange ： ', e);
    setPopupVisible(false);
    if (e && e.length) {
      let position = e[e.length - 1];
      mapInstance.setCity(position, () => mapInstance.setZoom(9));
    } else {
      // props.resetScale();
    }
  };

  return (
    <div className={styles.urgentSearchForm}>
      <Input.Group compact className={styles.group}>
        <Select
          className={styles.select2}
          onChange={onCustomerChange}
          bordered={false}
          suffixIcon={<img className={styles.imgIcon} src={searchIcon} />}
          showSearch
          popupClassName={styles.searchFormSelect}
          placeholder="请按点位名称搜索"
          options={dataLists}
          options={customerList}
          // filterOption={filterOption}
          optionFilterProp={'label'}
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
        <CityCascader
          placeholder="选择地区"
          showSearch
          changeOnSelect
          // popupVisible={popupVisible}
          // onClick={() => setPopupVisible(true)}
          allowClear
          onChange={onCityCascaderChange}
          className="map-filter-area"
          fieldNames={fieldNames}
          options={allArea}
        />
        {/* <Select
          className={styles.select1}
          onChange={handleChange}
          bordered={false}
          suffixIcon={<img className={styles.imgIcon} src={dropdownIcon} />}
          showSearch
          popupClassName={styles.searchFormSelect}
          placeholder="点位名称"
          options={pointList}
          // filterOption={filterOption}
          optionFilterProp={'label'}
        /> */}
      </Input.Group>
    </div>
  );
};

export default SearchForm;
