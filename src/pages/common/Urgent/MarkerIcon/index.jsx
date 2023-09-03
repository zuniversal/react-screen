// import React from 'react';
import './index.less';
// import styles from './index.module.less';

export default function MarkerIcon(props) {
  const { selected, error, gray } = props;
  const type = error ? `${props.type}-error` : props.type;
  const icon = `icon-marker-${type}`;
  // console.log(' MarkerIcon ： ', props   )//
  return (
    <div
      className={`icon icons ${icon} ${selected ? 'selected' : ''} ${
        gray ? 'gray' : ''
      }`}
    />
  );
}
