import React from 'react';
import { Link } from 'react-router-dom';

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
      mis: {
        s0: null,
        s1: null,
        s2: null,
        s3: null,
        s4: null,
      },
    }
  }

  componentWillMount() {
    const focusMenuIndex = localStorage.getItem('menu') || 0;
    this.setState({
      mis: {
        [`s${focusMenuIndex}`]: {
          color: '#00BCD4',
          fill: '#00BCD4',
        },
      },
    });
  }

  changeMenu(newFocusIndex) {
      this.setState({
        mis: {
          [`s${newFocusIndex}`]: {
            color: '#00BCD4',
            fill: '#00BCD4',
          },
        },
      });
      localStorage.setItem('menu', newFocusIndex);
  }

  render() {
    return (
      <div>
        <Paper style={styles.paper1}>
          <VersionIcon style={styles.iconStyles} color={red500} />
          版本：v{VERSION}
        </Paper>
        <Paper style={styles.paper2}>
          <Menu 
            selectedMenuItemStyle={{background: '#f00'}}
          >
            <Link to={`/foodlist`} style={styles.menu}>
              <MenuItem style={this.state.mis.s0} primaryText="菜单" onClick={() => this.changeMenu(0)} rightIcon={<FoodIcon style={this.state.mis.s0}/>} />
            </Link>
            <MenuItem style={this.state.mis.s1} primaryText="分类" onClick={() => this.changeMenu(1)} rightIcon={<CategoryIcon style={this.state.mis.s1} />} />
            <MenuItem style={this.state.mis.s2} primaryText="订单" onClick={() => this.changeMenu(2)} rightIcon={<OrdersIcon style={this.state.mis.s2} />} />
            <MenuItem style={this.state.mis.s3} primaryText="优惠券" onClick={() => this.changeMenu(3)} rightIcon={<CouponIcon style={this.state.mis.s3} />} />
            <MenuItem style={this.state.mis.s4} primaryText="用户" onClick={() => this.changeMenu(4)} rightIcon={<UserIcon style={this.state.mis.s4} />} />
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
  menu: {
    width: '120px',
  },
  iconStyles: {
    margin: '12px 10px 0 16px',
  },
};

export default Nav;