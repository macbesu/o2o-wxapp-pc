import React from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Nav extends React.Component {
  constructor(props) {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Paper style={styles.paper}>
          <Menu menuItemStyle={styles.menu}>
            <MenuItem primaryText="菜单" />
            <MenuItem primaryText="分类" />
            <MenuItem primaryText="订单" />
            <MenuItem primaryText="优惠券" />
            <MenuItem primaryText="用户" />
          </Menu>
        </Paper>
      </div>
    );
  }

}

const styles = {
  paper: {
    margin: '16px 0 16px 0',
  },
  menu: {
    width: '220px',
  }
};

export default Nav;