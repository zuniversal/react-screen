import React, { PureComponent } from 'react';

class AlarmStrategy extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(
      ' %c AlarmStrategy 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <div className="AlarmStrategy">AlarmStrategy</div>;
  }
}

export default AlarmStrategy;
