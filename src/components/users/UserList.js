import React from 'react';
import { Link } from 'react-router-dom';

import { SERVER, requestGetData, requestDeleteData } from '../../config/api';
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

  handlePhoneChange(e, newValue) {
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
    const str = `phone=${this.state.userFilter}`;
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
            <TextField hintText="搜索手机" className="my-tools-textinput" onChange={(e, newValue) => this.handlePhoneChange(e, newValue) } />
          </div>
        </div>
        <div className="my-table padding-table">
          {
            !this.state.loading ?
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={tableColStyles.col1}>头像</TableHeaderColumn>
                  <TableHeaderColumn style={tableColStyles.col2}>名称</TableHeaderColumn>
                  <TableHeaderColumn style={tableColStyles.col3}>手机号</TableHeaderColumn>
                  <TableHeaderColumn style={tableColStyles.col4}>邮箱</TableHeaderColumn>
                  <TableHeaderColumn style={tableColStyles.col5}>生日</TableHeaderColumn>
                  <TableHeaderColumn style={tableColStyles.col6}>地址</TableHeaderColumn>
                  <TableHeaderColumn style={tableColStyles.col7}>操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} stripedRows={false} deselectOnClickaway={false}>
                {
                  this.state.users.map((item, index) =>
                    <TableRow key={item._id}>
                      <TableRowColumn style={tableColStyles.col1}>
                        <img src={SERVER + item.avatar} style={styles.images}/>
                      </TableRowColumn>
                      <TableRowColumn style={tableColStyles.col2}>{item.fullName}</TableRowColumn>
                      <TableRowColumn style={tableColStyles.col3}>{item.phone}</TableRowColumn>
                      <TableRowColumn style={tableColStyles.col4}>{item.email}</TableRowColumn>
                      <TableRowColumn style={tableColStyles.col5}>{item.birthday}</TableRowColumn>
                      <TableRowColumn style={tableColStyles.col6}>{item.address}</TableRowColumn>
                      <TableRowColumn style={tableColStyles.col7}>
                        <Link to={`/edituser/${item._id}`} className="my-table-checkMore">查看 / 详情</Link>
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

const styles = {
  images: {
    width: '100%',
    height: '40px',
    borderRadius: '50%',
  },
};

const tableColStyles = {
  col1: {
    width: '20px',
    'verticalAlign': 'middle',
    textAlign: 'center',
  },
  col2: {
    width: '50px',
  },
  col3: {
    width: '65px',
  },
  col4: {
    width: '80px',
  },
  col5: {
    width: '60px',
  },
  col6: {
    width: '120px',
  },
  col7: {
    width: '60px',
    textAlign: 'center',
  },
};

export default UserList;