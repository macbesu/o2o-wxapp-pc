import React from 'react';
import { Link } from 'react-router-dom';

import { SERVER, requestGetData, requestDeleteData } from '../../config/api';
import { formatTime } from '../../config/utils';
import RefreshIndicator from 'material-ui/RefreshIndicator';
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
      loading: true,
      statusFilter: '',
      phoneFilter: '',
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

  render() {
    return (
      <div>
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
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} stripedRows={false} deselectOnClickaway={false}>
                {
                  this.state.orders.map((item, index) =>
                    <TableRow key={item._id} >
                      <TableRowColumn style={styles.col1}>{formatTime(new Date(item.time))}</TableRowColumn>
                      <TableRowColumn style={styles.col2}>
                        <Link to={`/edituser/${item.user._id}`} style={{color: '#2196F3'}}>{item.user.phone}</Link>
                      </TableRowColumn>
                      <TableRowColumn style={styles.col3}>{item._id}</TableRowColumn>
                      <TableRowColumn style={styles.col4}>{item.address}</TableRowColumn>
                      <TableRowColumn style={styles.col5}>¥ {item.totalPrice}</TableRowColumn>
                      <TableRowColumn style={styles.col6}>
                        { item.status === 0 ? <span style={{color:'#f00'}}>{this.state.statusTextList[item.status]}</span> : null }
                        { item.status === 1 ? <span style={{color:'#4CAF50'}}>{this.state.statusTextList[item.status]}</span> : null }
                        { item.status === 2 ? <span>{this.state.statusTextList[item.status]}</span> : null }
                        { item.status === 3 ? <span style={{color:'#999'}}>{this.state.statusTextList[item.status]}</span> : null }
                      </TableRowColumn>
                      { /** <TableRowColumn>
                        <Link to={`/editcategory/${item._id}`} className="my-table-checkMore">查看 / 修改</Link>
                      </TableRowColumn> **/}
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
    width: '90px',
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
  },
}

export default OrderList;