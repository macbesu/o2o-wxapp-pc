import React from 'react';
import { Link } from 'react-router-dom';

import { requestGetData, requestDeleteData } from '../../config/api';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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

  isSelected() {

  }

  handleNameChange(e, newValue) {

  }

  deleteAction() {
    
  }

  render() {
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
      </div>
    );
  }
}

export default CategoryList;