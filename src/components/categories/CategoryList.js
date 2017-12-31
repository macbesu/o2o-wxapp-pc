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
import AddIcon from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class CategoryList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      openDialog: false,
      categories: [],
      loading: true,
      selected: [],
      categoryNameFilter: '',
    };
    this.isSelected = (index) => this.state.selected.indexOf(index) !== -1;
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;
    self.setState({ loading: true });
    requestGetData('categories')
      .then((res) => {
        self.setState({ categories: res.data }, () => {
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

  handleNameChange(e, newValue) {
    let str = newValue.replace(/(^\s+)|(\s+$)/g, '');
    str === '' ? str = '*' : null;
    this.setState({
      loading: true,
      categoryNameFilter: str,
    }, () => {
      this.search();
    });
  }

  search() {
    const str = `categoryName=${this.state.categoryNameFilter}`;
    const self = this;
    requestGetData('categories', str)
      .then((res) => {
        self.setState({ categories: res.data }, () => {
          self.setState({ loading: false });
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  deleteAction() {
    const selected = this.state.selected;
    if (selected.length > 0 || selected === 'all') {
      this.setState({ openDialog: true });
    } 
  }

  handleDelete() {
    const self = this;
    const selected = this.state.selected;
    if (selected.length > 0 || selected === 'all') {
      let deleteItems = '';      
      if (selected === 'all') {
        const categories = self.state.categories;
        for (let i = 0; i < categories.length; i ++) {
          deleteItems += categories[i]._id + (i !== categories.length - 1 ? '&' : '');
        }
      } else {
        for (let i = 0; i < selected.length; i ++) {
          deleteItems += this.state.categories[selected[i]]._id + (i !== selected.length - 1 ? '&' : '');
        }
      }
      requestDeleteData('categories', deleteItems)
        .then((res) => {
          self.fetchData();
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  handleComfirmDelete() {
    if (this.state.selected.length > 0) {
      this.handleDelete();
    }
    this.setState({ openDialog: false });
  }
  
  handleCloseDialog() {
    this.setState({ openDialog: false });
  }

  render() {
    const actions = [
      <FlatButton label="确认" primary={false}  onClick={() => this.handleComfirmDelete()} />,
      <FlatButton label="取消" primary={true} keyboardFocused={true} onClick={() => this.handleCloseDialog()} />,
    ];
    return (
      <div>
        <div className="clearfix my-tools">
          <div className="pullLeft">
            <TextField hintText="搜索分类" className="my-tools-textinput" onChange={(e, newValue) => this.handleNameChange(e, newValue) } />
          </div>
          <div className="pullRight">
            <Link to="/editcategory">
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
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={true} stripedRows={false} deselectOnClickaway={false}>
                {
                  this.state.categories.map((item, index) =>
                    <TableRow key={item._id} selected={this.isSelected(index)}>
                      <TableRowColumn>{item.categoryName}</TableRowColumn>
                      <TableRowColumn>
                        <Link to={`/editcategory/${item._id}`} className="my-table-checkMore">查看 / 修改</Link>
                      </TableRowColumn>
                    </TableRow>)
                }
              </TableBody>
            </Table>
            :
            <RefreshIndicator size={50} top={30} left={36} status="hide" status="loading" />
          }
          {
            this.state.categories.length === 0 ? <div className="my-table-nothing"> (゜v゜)つ什么都没有...</div> : null
          }
        </div>
        <Dialog title="警告" actions={actions} modal={false} open={this.state.openDialog}>
          如果删除该分类，其下分类的所有菜单都将被删除！是否确定删除？
        </Dialog>
      </div>
    );
  }
}

export default CategoryList;