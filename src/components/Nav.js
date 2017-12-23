import React from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import CategoryIcon from 'material-ui/svg-icons/content/content-copy';
import FoodIcon from 'material-ui/svg-icons/maps/local-pizza';
import OrdersIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import CouponIcon from 'material-ui/svg-icons/action/receipt';
import UserIcon from 'material-ui/svg-icons/action/supervisor-account';

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
            <MenuItem primaryText="菜单" rightIcon={<FoodIcon />} />
            <MenuItem primaryText="分类" rightIcon={<CategoryIcon />} />
            <MenuItem primaryText="订单" rightIcon={<OrdersIcon />} />
            <MenuItem primaryText="优惠券" rightIcon={<CouponIcon />} />
            <MenuItem primaryText="用户" rightIcon={<UserIcon />} />
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