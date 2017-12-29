import React from 'react';
import { Link } from 'react-router-dom';

import { requestGetData, requestDeleteData } from '../../config/api';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import AddIcon from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class Nav extends React.Component {
  constructor(props) {
    super();
    this.state = {
      openDialog: false,
      foods: [],
      loading: true,
      categories: [],
      categoryFilter: '*',
      foodNameFilter: '*',
      selected: [],
    };
    this.isSelected = (index) => this.state.selected.indexOf(index) !== -1;
  }

  componentWillMount() {
    this.fetchData();
    this.getCategories();
  }

  fetchData() {
    const self = this;
    self.setState({ loading: true });
    requestGetData('foods')
      .then((res) => {
        self.setState({ foods: res.data }, () => {
          self.setState({ loading: false });
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  getCategories() {
    const self = this;
    requestGetData('categories')
      .then((res) => {
        self.setState({
          categories: res.data
        });
      })
      .catch((e) => {
        console.error(e);
      });
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
        const foods = self.state.foods;
        for (let i = 0; i < foods.length; i ++) {
          deleteItems += foods[i]._id + (i !== foods.length - 1 ? '&' : '');
        }
      } else {
        for (let i = 0; i < selected.length; i ++) {
          deleteItems += this.state.foods[selected[i]]._id + (i !== selected.length - 1 ? '&' : '');
        }
      }
      requestDeleteData('foods', deleteItems)
        .then((res) => {
          self.fetchData();
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  handleCategoryChange(e, key, payload) {
    key === 0 ? payload = '*' : null;
    this.setState({
      loading: true,
      categoryFilter: payload,
    }, () => {
      this.search();
    });
  }

  handleNameChange(e, newValue) {
    let str = newValue.replace(/(^\s+)|(\s+$)/g, '');
    str === '' ? str = '*' : null;
    this.setState({
      loading: true,
      foodNameFilter: str,
    }, () => {
      this.search();
    });
  }

  search() {
    const str = `category=${this.state.categoryFilter}&foodName=${this.state.foodNameFilter}`;
    const self = this;
    requestGetData('foods', str)
      .then((res) => {
        self.setState({ foods: res.data }, () => {
          self.setState({ loading: false });
        });
      })
      .catch((e) => {
        console.error(e);
      });
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
  
  isSelected(index) {
    this.state.selected.indexOf(index) !== -1;
  }

  tableSelect(selectedRows) {
    this.setState({ selected: selectedRows });
  }

  render() {
    const actions = [
      <FlatButton label="取消" primary={false} onClick={() => this.handleCloseDialog()} />,
      <FlatButton label="确认" primary={true}  onClick={() => this.handleOpenDialog()} />,
    ];
    return (
      <div>
        <div className="clearfix my-tools">
          <div className="pullLeft">
            <SelectField
              floatingLabelText="按分类查找"
              value={this.state.categoryFilter}
              onChange={(e, key, payload) => this.handleCategoryChange(e, key, payload)}
              className="pullLeft my-tools-select"
            >
              <MenuItem 
                key={0} 
                value='*' 
                primaryText="(所有)"
              />
            {
              this.state.categories.map((item, index) => 
                <MenuItem 
                  key={item._id} 
                  value={item._id} 
                  primaryText={item.categoryName}
                />
              )
            }
            </SelectField>
            <TextField hintText="搜索食品" className="my-tools-textinput" onChange={(e, newValue) => this.handleNameChange(e, newValue) } />
          </div>
          <div className="pullRight">
            <Link to="/editfood">
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
                  <TableHeaderColumn style={tableColStyles.col1}>图片</TableHeaderColumn>
                  <TableHeaderColumn>名称</TableHeaderColumn>
                  <TableHeaderColumn>价格</TableHeaderColumn>
                  <TableHeaderColumn>介绍</TableHeaderColumn>
                  <TableHeaderColumn>分类</TableHeaderColumn>
                  <TableHeaderColumn>是否售罄</TableHeaderColumn>
                  <TableHeaderColumn>优惠券</TableHeaderColumn>
                  <TableHeaderColumn style={tableColStyles.col2}>操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={true} stripedRows={false} deselectOnClickaway={false}>
                {
                  this.state.foods.map((item, index) =>
                    <TableRow key={item._id} selected={this.isSelected(index)}>
                      <TableRowColumn style={tableColStyles.col1}>
                        <img src={item.imageUrl} style={styles.images}/>
                      </TableRowColumn>
                      <TableRowColumn>{item.foodName}</TableRowColumn>
                      <TableRowColumn>{item.price}</TableRowColumn>
                      <TableRowColumn>{item.description}</TableRowColumn>
                      <TableRowColumn>{item.category.categoryName}</TableRowColumn>
                      <TableRowColumn>{item.sellout ? '是' : '否'}</TableRowColumn>
                      <TableRowColumn>{item.coupon === null ? '(无)' : item.coupon.remark}</TableRowColumn>
                      <TableRowColumn style={tableColStyles.col2}>
                        <Link to={`/editfood/${item._id}`} className="my-table-checkMore">查看 / 修改</Link>
                      </TableRowColumn>
                    </TableRow>)
                }
              </TableBody>
            </Table>
            :
            <RefreshIndicator size={50} top={30} left={36} status="hide" status="loading" />
          }
          {
            this.state.foods.length === 0 ? <div className="my-table-nothing"> (゜v゜)つ什么都没有...</div> : null
          }
        </div>
        <Dialog title="警告" actions={actions} modal={false} open={this.state.openDialog}>
          是否确定删除？
        </Dialog>
      </div>
    );
  }

}

const styles = {
  images: {
    width: '100%',
    height: '40px',
  },
};

const tableColStyles = {
  col1: {
    width: '40px',
    textAlign: 'center',
  },
  col2: {
    width: '68px',
    textAlign: 'center',
  },
};

export default Nav;