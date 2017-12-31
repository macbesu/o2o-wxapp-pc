import React from 'react';
import { Link } from 'react-router-dom';

import { requestGetData, requestDeleteData } from '../../config/api';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import AddIcon from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class CouponList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      openDialog: false,
      coupons: [],
      filterCoupons: [], 
      loading: true,
      selected: [],
      couponType: '*',
    };
    this.isSelected = (index) => this.state.selected.indexOf(index) !== -1;
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;
    self.setState({ loading: true });
    requestGetData('coupons')
      .then((res) => {
        self.setState({ coupons: res.data }, () => {
          self.setState({ filterCoupons: res.data });
          self.setState({ loading: false });
        });
      })
      .catch((e) => {
        console.error(e);
      }); 
  }

  tableSelect(selectedRows) {
    this.setState({ selected: selectedRows });
  }

  deleteAction() {
    this.setState({ openDialog: true });
  }

  handleDelete() {
    const self = this;
    const selected = this.state.selected;
    if (selected.length > 0 || selected === 'all') {
      let deleteItems = '';      
      if (selected === 'all') {
        const coupons = self.state.coupons;
        for (let i = 0; i < coupons.length; i ++) {
          deleteItems += coupons[i]._id + (i !== coupons.length - 1 ? '&' : '');
        }
      } else {
        for (let i = 0; i < selected.length; i ++) {
          deleteItems += this.state.coupons[selected[i]]._id + (i !== selected.length - 1 ? '&' : '');
        }
      }
      requestDeleteData('coupons', deleteItems)
        .then((res) => {
          self.fetchData();
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  handleOpenDialog() {
    if (this.state.selected.length > 0) {
      this.handleDelete();
    }
    this.setState({ openDialog: false });
  }
  
  handleCloseDialog() {
    this.setState({ openDialog: false });
  }

  selectCouponType(e, key, payload) {
    const coupons = this.state.coupons;
    this.setState({ couponType: payload });
    if(payload === '*') {
      this.setState({ filterCoupons: coupons });
    } else {
      let filterArray = [];
      coupons.forEach((item, index) => {
        if (item.couponType.toString() === payload) {
          filterArray.push(item);
        }
      });
      this.setState({ filterCoupons: filterArray });
    }
  }

  render() {
    const actions = [
      <FlatButton label="确认" primary={false}  onClick={() => this.handleOpenDialog()} />,
      <FlatButton label="取消" primary={true} keyboardFocused={true} onClick={() => this.handleCloseDialog()} />,
    ];
    return (
      <div>
        <div className="clearfix my-tools">
          <div className="pullLeft">
            <SelectField
              floatingLabelText="优惠券类型"
              value={this.state.couponType}
              onChange={(e, key, payload) => this.selectCouponType(e, key, payload)}
              className="pullLeft my-tools-select"
            >
              <MenuItem value='*'  primaryText="(所有)" />
              <MenuItem value='0'  primaryText=" 打折 " />
              <MenuItem value='1'  primaryText=" 满减 " />
            </SelectField>
          </div>
          <div className="pullRight">
            <Link to="/editcoupon">
              <RaisedButton label="增加" 
                className="my-tools-btns"
                labelPosition="before" 
                icon={<AddIcon style={{width: '21px', height: '21px', marginTop: '-1px'}}/>}
              />
            </Link> 
            <RaisedButton label="删除" 
              className="my-my-tools-btns"
              labelPosition="before" 
              icon={<DeleteIcon style={{width: '21px', height: '21px', marginTop: '-1px'}}/>} 
              onClick={() => this.deleteAction()}
            />
          </div>
        </div>
        <div className="my-table">
          {
            !this.state.loading ?
            <Table multiSelectable={true} onRowSelection={(selectedRows) => this.tableSelect(selectedRows)}>
              <TableHeader displaySelectAll={true} adjustForCheckbox={true}>
                <TableRow>
                  <TableHeaderColumn>名称</TableHeaderColumn>
                  <TableHeaderColumn>类型</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={true} stripedRows={false} deselectOnClickaway={false}>
                {
                  this.state.filterCoupons.map((item, index) =>
                    <TableRow key={item._id} selected={this.isSelected(index)}>
                      <TableRowColumn>{item.remark}</TableRowColumn>
                      <TableRowColumn>{item.couponType === 0 ? '打折' : '满减'}</TableRowColumn>
                      <TableRowColumn>
                        <Link to={`/editcoupon/${item._id}`} className="my-table-checkMore">查看 / 修改</Link>
                      </TableRowColumn>
                    </TableRow>)
                }
              </TableBody>
            </Table>
            :
            <RefreshIndicator size={50} top={30} left={36} status="hide" status="loading" />
          }
          {
            this.state.coupons.length === 0 ? <div className="my-table-nothing"> (゜v゜)つ什么都没有...</div> : null
          }
        </div>
        <Dialog title="警告" actions={actions} modal={false} open={this.state.openDialog}>
          是否确定删除？
        </Dialog>
      </div>
    );
  }
}

export default CouponList;