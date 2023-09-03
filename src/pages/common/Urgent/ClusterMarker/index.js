import React from 'react';
// import groupBy from 'lodash/groupBy';
import './index.less';
// import styles from './index.module.less';
// console.log(' styles ： ', styles,  )//
export default function ClusterMarker({
  count,
  markers = [],
  hover = false,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) {
  // const dataGroup = groupBy(markers, 'type');
  const dataGroup = markers;
  const contents = [];
  Object.entries(dataGroup).forEach(([key, items], index) => {
    contents.push(
      <div className={`marker-icon marker-icon-${key}`} key={index}>
        {items.length}
      </div>,
    );
  });
  // console.log(' ClusterMarker ： ', count, contents, markers  )//
  return (
    <div
      className={`box ${hover ? 'hover' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* <div className={cls(styles.marker, styles.normal)}>{count}</div>
      <div className={cls(styles.marker, styles.active)}>{contents}</div> */}
      <div className={`marker normal`}>
        <div className={'cell'}>{count}</div>
      </div>
      <div className={`marker active`}>
        {/* <div className={styles.cell}>{contents}</div> */}
        <div className={'cell'}>
          {/* {count} */}
          <div className={`marker-icon marker-icon-customer`}>{count}</div>
        </div>
      </div>
    </div>
  );
}
