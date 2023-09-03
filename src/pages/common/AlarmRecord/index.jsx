import React, { PureComponent } from 'react';

class AlarmRecord extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(
      ' %c AlarmRecord 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <div className="AlarmRecord">AlarmRecord</div>;
  }
}

export default AlarmRecord;
