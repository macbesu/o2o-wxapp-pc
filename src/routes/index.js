import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Login from '../components/login';
import FoodList from '../components/foods/FoodList';
import EditFood from '../components/foods/EditFood';
import CategoryList from '../components/categories/CategoryList';
import EditCategory from '../components/categories/EditCategory';
import OrderList from '../components/orders/OrderList';
import CouponList from '../components/coupons/CouponList';
import EditCoupon from '../components/coupons/EditCoupon';
import UserList from '../components/users/UserList';
import EditUser from '../components/users/EditUser';

class Routes extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLogined: false,
    };
  }

  componentWillMount() {
    const isLogined = localStorage.getItem('isLogined');
    this.setState({ isLogined });
  }

  render() {
    return (
      <Router>
        <div style={styles.app}>
          <Header />
          <Route path="/login" component={Login} />
              {
                this.state.isLogined ? 
                <div>
                  <div style={styles.nav}>
                    <Nav />
                  </div>
                  <div style={styles.content}>
                    <Paper style={styles.paper}>
                      <Route exact path="/" component={FoodList} />
                      <Route path="/foodlist" component={FoodList} />
                      <Route exact path="/editfood" component={EditFood} />
                        <Route path="/editfood/:id" component={EditFood} />
                      <Route path="/categorylist" component={CategoryList} />
                      <Route exact path="/editcategory" component={EditCategory} />
                        <Route path="/editcategory/:id" component={EditCategory} />
                      <Route path="/orderlist" component={OrderList} />
                      <Route path="/couponlist" component={CouponList} />
                      <Route exact path="/editcoupon" component={EditCoupon} />
                        <Route path="/editcoupon/:id" component={EditCoupon} />
                      <Route path="/userlist" component={UserList} />
                      <Route exact path="/edituser" component={EditUser} />
                        <Route path="/edituser/:id" component={EditUser} />
                    </Paper>
                  </div>
                </div>
                : null
              }
        </div>
      </Router>
    )
  }
}

const styles = {
  app: {
    width: '1160px',
    margin: '0 auto',
  },
  nav: {
    width: '200px',
    float: 'left',
  },
  content: {
    float: 'right',
  },
  paper: {
    width: '940px',
    margin: '16px 0 16px 0',
  },
};

export default Routes;