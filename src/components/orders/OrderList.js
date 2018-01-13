import React from 'react';
import { Link } from 'react-router-dom';

import { SERVER, requestGetData, requestPostData } from '../../config/api';
import { formatTime } from '../../config/utils';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class OrderList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      openDialog: false,
      orders: [],
      statusTextList: ['下单', '配送', '完成', '取消'],
      btnText: ['配送', '完成', '还原', '恢复'],
      loading: true,
      statusFilter: '*',
      phoneFilter: '*',
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;
    self.setState({ loading: true });
    requestGetData('orders')
      .then((res) => {
        self.setState({ orders: res.data }, () => {
          self.setState({ loading: false });
        });
      })
      .catch((e) => {
        console.error(e);
      }); 
  }

  handleOperation(id, status) {
    console.log(id, status);
    switch (status) {
      case 0:
        status = 1;
        break;
      case 1:
        status = 2;
        break;
      case 3:
        status = 0;
        break;
      default:
        break;
    }
    const self = this;
    requestPostData('orders', id, { status: status })
      .then((res) => {
        if (res.status === 200) {
          self.fetchData();
        }
      })
      .catch((e) => {
        console.error(e);
      }); 
  }

  handleStatusChange(e, key, payload) {
    key === 0 ? payload = '*' : null;
    this.setState({
      loading: true,
      statusFilter: payload,
    }, () => {
      this.search();
    });
  }

  handlePhoneChange(e, newValue) {
    let str = newValue.replace(/(^\s+)|(\s+$)/g, '');
    str === '' ? str = '*' : null;
    this.setState({
      loading: true,
      phoneFilter: str,
    }, () => {
      this.search();
    });
  }

  search() {
    const str = `status=${this.state.statusFilter}&phone=${this.state.phoneFilter}`;
    const self = this;
    requestGetData('orders', str)
      .then((res) => {
        self.setState({ orders: res.data }, () => {
          self.setState({ loading: false });
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    return (
      <div>
        <div className="clearfix my-tools">
          <div className="pullLeft">
            <SelectField
              floatingLabelText="按订单状态查找"
              value={this.state.statusFilter}
              onChange={(e, key, payload) => this.handleStatusChange(e, key, payload)}
              className="pullLeft my-tools-select"
            >
              <MenuItem value='*' primaryText="(所有)" />
              <MenuItem value='0' primaryText="下单" />
              <MenuItem value='1' primaryText="配送" />
              <MenuItem value='2' primaryText="完成" />
              <MenuItem value='3' primaryText="取消" />
            </SelectField>
            <TextField hintText="搜索手机" className="my-tools-textinput" onChange={(e, newValue) => this.handlePhoneChange(e, newValue) } />
          </div>
        </div>
        <div className="my-table padding-table">
          {
            !this.state.loading ?
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={styles.col1}>时间</TableHeaderColumn>
                  <TableHeaderColumn style={styles.col2}>手机</TableHeaderColumn>
                  <TableHeaderColumn style={styles.col3}>内容</TableHeaderColumn>
                  <TableHeaderColumn style={styles.col4}>地址</TableHeaderColumn>
                  <TableHeaderColumn style={styles.col5}>价格</TableHeaderColumn>
                  <TableHeaderColumn style={styles.col6}>状态</TableHeaderColumn>
                  <TableHeaderColumn style={styles.col7}>操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} stripedRows={false} deselectOnClickaway={false}>
                {
                  this.state.orders.map((order, index) =>
                    <TableRow key={order._id} >
                      <TableRowColumn style={styles.col1}>{formatTime(new Date(order.time))}</TableRowColumn>
                      <TableRowColumn style={styles.col2}>
                        <Link to={`/edituser/${order.user._id}`} style={{color: '#2196F3'}}>{order.user.phone}</Link>
                      </TableRowColumn>
                      <TableRowColumn style={styles.col3}>
                        {
                          order.foods.map((food, idx) => <div style={{margin: '3px 0', color: '#795548'}} key={food._id}>
                            <span style={{display: 'inline-block', width: '55%'}}>{food.foodName}</span>
                            <span style={{display: 'inline-block', width: '27%'}}>¥ {food.totalWithCoupon}</span>
                            <span style={{display: 'inline-block', width: '18%'}}>{food.count}份</span>
                          </div>)
                        }
                      </TableRowColumn>
                      <TableRowColumn style={styles.col4}>{order.address}</TableRowColumn>
                      <TableRowColumn style={styles.col5}>
                        <span>¥ {order.totalPrice}</span>
                      </TableRowColumn>
                      <TableRowColumn style={styles.col6}>
                        { order.status === 0 ? <span style={{color:'#f00'}}>{this.state.statusTextList[order.status]}</span> : null }
                        { order.status === 1 ? <span style={{color:'#4CAF50'}}>{this.state.statusTextList[order.status]}</span> : null }
                        { order.status === 2 ? <span>{this.state.statusTextList[order.status]}</span> : null }
                        { order.status === 3 ? <span style={{color:'#999'}}>{this.state.statusTextList[order.status]}</span> : null }
                      </TableRowColumn>
                      <TableRowColumn style={styles.col7}>
                        {
                          order.status !== 2 ? 
                          <span 
                            style={styles.btn} 
                            onClick={() => this.handleOperation(order._id, order.status)}
                          >
                            {this.state.btnText[order.status]}
                          </span> : null
                        }
                      </TableRowColumn>
                    </TableRow>)
                }
              </TableBody>
            </Table>
            :
            <RefreshIndicator size={50} top={30} left={36} status="hide" status="loading" />
          }
          {
            this.state.orders.length === 0 ? <div className="my-table-nothing"> (゜v゜)つ什么都没有...</div> : null
          }
        </div>
      </div>
    );
  }
}

const styles = {
  col1: {
    width: '100px',
  },
  col2: {
    width: '62px',
  },
  col3: {
    width: '200px',
  },
  col4: {
    width: '140px',
  },
  col5: {
    width: '40px',
  },
  col6: {
    width: '40px',
    textAlign: 'center',
  },
  col7: {
    width: '40px',
    textAlign: 'center',
  },
  btn: {
    display: 'inline-block', 
    cursor: 'pointer',
    color: '#00BCD4',
    padding: '4px 10px', 
    border: '1px solid #00BCD4',
    borderRadius: '4px',
  },
}

export default OrderList;