import React from 'react';
import { Link } from 'react-router-dom';

import { requestGetData, requestDeleteData } from '../../config/api';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class UserList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      users: [],
      loading: true,
      userFilter: '',
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;
    self.setState({ loading: true });
    requestGetData('users')
      .then((res) => {
        self.setState({ users: res.data }, () => {
          self.setState({ loading: false });
        });
      })
      .catch((e) => {
        console.error(e);
      }); 
  }

  handleNameChange(e, newValue) {
    let str = newValue.replace(/(^\s+)|(\s+$)/g, '');
    str === '' ? str = '*' : null;
    this.setState({
      loading: true,
      userFilter: str,
    }, () => {
      this.search();
    });
  }

  search() {
    const str = `userName=${this.state.userNameFilter}`;
    const self = this;
    requestGetData('users', str)
      .then((res) => {
        self.setState({ users: res.data }, () => {
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
            <TextField hintText="搜索分类" className="my-tools-textinput" onChange={(e, newValue) => this.handleNameChange(e, newValue) } />
          </div>
        </div>
        <div className="my-table">
          {
            !this.state.loading ?
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>名称</TableHeaderColumn>
                  <TableHeaderColumn>手机号</TableHeaderColumn>
                  <TableHeaderColumn>邮箱</TableHeaderColumn>
                  <TableHeaderColumn>生日</TableHeaderColumn>
                  <TableHeaderColumn>地址</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} stripedRows={false} deselectOnClickaway={false}>
                {
                  this.state.users.map((item, index) =>
                    <TableRow key={item._id}>
                      <TableRowColumn>{item.fullName}</TableRowColumn>
                      <TableRowColumn>{item.phone}</TableRowColumn>
                      <TableRowColumn>{item.email}</TableRowColumn>
                      <TableRowColumn>{item.birthday}</TableRowColumn>
                      <TableRowColumn>{item.address}</TableRowColumn>
                      <TableRowColumn>
                        <Link to={`/edituser/${item._id}`} className="my-table-checkMore">查看 / 修改</Link>
                      </TableRowColumn>
                    </TableRow>)
                }
              </TableBody>
            </Table>
            :
            <RefreshIndicator size={50} top={30} left={36} status="hide" status="loading" />
          }
          {
            this.state.users && this.state.users.length === 0 ? <div className="my-table-nothing"> (゜v゜)つ什么都没有...</div> : null
          }
        </div>
      </div>
    );
  }
}

export default UserList;