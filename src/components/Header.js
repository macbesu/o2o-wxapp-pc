import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { setTimeout } from 'timers';

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLogined: false,
    };
  }

  componentWillMount() {
    const isLogined = sessionStorage.getItem('isLogined');
    this.setState({ isLogined });
  }

  btnClick(e) {
    const isLogined = this.state.isLogined;
    const currLoc = location.hash.replace(/[\#\/]/g, '');
    if (currLoc !== 'login') {
      if (isLogined) {
        sessionStorage.removeItem('isLogined');
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('token');
      } else {
        sessionStorage.setItem('isLogined', true);
      }
      this.setState({ isLogined: !isLogined });
      location.href = "/#/login";
      location.reload();
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title="润っ餐饮"
          iconElementRight={<FlatButton label={this.state.isLogined ? '退出' : '登录'} />}
          onRightIconButtonClick={(e) => this.btnClick(e)}
        />
      </div>
    );
  }
}

const styles = {
  headerBlueTheme: {
    backgroundColor: 'rgb(33, 150, 243)',
  },
};


export default Header;