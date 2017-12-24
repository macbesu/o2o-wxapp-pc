import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { VERSION } from '../config/utils';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import VersionIcon from 'material-ui/svg-icons/action/cached';
import CategoryIcon from 'material-ui/svg-icons/content/content-copy';
import FoodIcon from 'material-ui/svg-icons/maps/local-pizza';
import OrdersIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import CouponIcon from 'material-ui/svg-icons/action/receipt';
import UserIcon from 'material-ui/svg-icons/action/supervisor-account';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

class Nav extends React.Component {
  constructor(props) {
    super();
    this.state = {

    }
  }

  componentWillMount() {
    
  }

  render() {
    return (
      <div>
        <Paper style={styles.paper1}>
          <VersionIcon style={styles.iconStyles} color={red500} />
          版本：v{VERSION}
        </Paper>
        <Paper style={styles.paper2}>
          <Menu autoWidth={false} width={220}>
            <NavLink to={`/foodlist`} style={styles.navlink} activeStyle={styles.activeStyle}>
              <MenuItem primaryText="菜单" rightIcon={<FoodIcon/>} />
            </NavLink>
            <NavLink to={`/editfood/2382193810`} style={styles.navlink} activeStyle={styles.activeStyle}>
              <MenuItem primaryText="分类" rightIcon={<CategoryIcon />} />
            </NavLink>
            <NavLink to={`/1`} style={styles.navlink} activeStyle={styles.activeStyle}>
              <MenuItem primaryText="订单" rightIcon={<OrdersIcon />} />
            </NavLink>
            <NavLink to={`/2`} style={styles.navlink} activeStyle={styles.activeStyle}>
              <MenuItem primaryText="优惠券" rightIcon={<CouponIcon />} />
            </NavLink>
            <NavLink to={`/3`} style={styles.navlink} activeStyle={styles.activeStyle}>
              <MenuItem primaryText="用户" rightIcon={<UserIcon />} />
            </NavLink>
          </Menu>
        </Paper>
      </div>
    );
  }

}

const styles = {
  paper1: {
    display: 'flex',
    margin: '16px 0 0 0',
    height: '52px',
    lineHeight: '52px',
    textAlign: 'center',
    color: '#999',
  },
  paper2: {
    margin: '16px 0 0 0',
  },
  navlink: {
    display:'inline-block', 
    width: '200px',
  },
  activeStyle: {
    backgroundColor:'#e5e5e5',
  },
  iconStyles: {
    margin: '12px 10px 0 16px',
  },
};

export default Nav;