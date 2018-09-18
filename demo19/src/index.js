import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.less';

class Demo extends React.Component {
  render() {
    return (
      <i  className="iconfont icon-love" />
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);