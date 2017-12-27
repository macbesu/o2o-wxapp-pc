import React from 'react';
import { Link } from 'react-router-dom';

import { requestGetData } from '../../config/api';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import AddIcon from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class Nav extends React.Component {
  constructor(props) {
    super();
    this.state = {
      foods: [],
      loading: true,
      categories: [],
      categoryFilter: undefined,
      foodNameFilter: undefined,
    }
  }

  componentWillMount() {
    this.fetchData();
    this.getCategories();
  }

  fetchData() {
    const self = this;
    requestGetData('getFoodList')
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
    requestGetData('getCategorylist')
      .then((res) => {
        self.setState({
          categories: res.data
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  handleCategoryChange(e, key, payload) {
    this.setState({
      loading: true,
      categoryFilter: payload,
    });
    const self = this;
    requestGetData('getFoodByCategory', payload)
      .then((res) => {
        self.setState({ foods: res.data }, () => {
          self.setState({ loading: false });
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  deleteAction() {
    this.setState({
      showSelectMore: true
    });
  }

  handleSearch(e, newValue) {
    this.setState({
      loading: true,
      foodNameFilter: newValue,
    });
    const self = this;
    requestGetData('getFoodByName', newValue)
      .then((res) => {
        self.setState({ foods: res.data }, () => {
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
        <div className="clearfix" style={styles.tools}>
          <div style={styles.pullLeft}>
            <SelectField
              floatingLabelText="按分类查找"
              value={this.state.categoryFilter}
              onChange={(e, key, payload) => this.handleCategoryChange(e, key, payload)}
              style={styles.pullLeft}
            >
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
            <TextField hintText="搜索食品" style={styles.textInput} onChange={(e, newValue) => this.handleSearch(e, newValue) } />
          </div>
          <div style={styles.pullRight}>
            <Link to="/editFood">
              <RaisedButton label="增加" 
                style={styles.btns}
                labelPosition="before" 
                icon={<AddIcon style={{width: '21px', height: '21px', marginTop: '-1px'}}/>}
              />
            </Link> 
            <RaisedButton label="删除" 
              style={styles.btns} 
              labelPosition="before" 
              icon={<DeleteIcon style={{width: '21px', height: '21px', marginTop: '-1px'}}/>} 
              onClick={() => this.deleteAction()}
            />
          </div>
        </div>
        <div style={styles.table}>
          {
            !this.state.loading ?
            <Table multiSelectable={true}>
              <TableHeader displaySelectAll={true} adjustForCheckbox={true}>
                <TableRow>
                  <TableHeaderColumn style={tableColStyles.col1}>图片</TableHeaderColumn>
                  <TableHeaderColumn>名称</TableHeaderColumn>
                  <TableHeaderColumn>价格</TableHeaderColumn>
                  <TableHeaderColumn>介绍</TableHeaderColumn>
                  <TableHeaderColumn>分类</TableHeaderColumn>
                  <TableHeaderColumn>是否售罄</TableHeaderColumn>
                  <TableHeaderColumn>赞</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={true} stripedRows={false}>
                {
                  this.state.foods.map((item, index) =>
                    <TableRow key={item._id}>
                      <TableRowColumn style={tableColStyles.col1}>
                        <img src={item.imageUrl} style={styles.images}/>
                      </TableRowColumn>
                      <TableRowColumn>{item.foodName}</TableRowColumn>
                      <TableRowColumn>{item.price}</TableRowColumn>
                      <TableRowColumn>{item.description}</TableRowColumn>
                      <TableRowColumn>{item.category.categoryName}</TableRowColumn>
                      <TableRowColumn>{item.sellout ? '是' : '否'}</TableRowColumn>
                      <TableRowColumn>{item.favoriteCount}</TableRowColumn>
                      <TableRowColumn>
                        <Link to={`/editfood/${item._id}`} style={styles.checkMore}>查看 / 修改</Link>
                      </TableRowColumn>
                    </TableRow>)
                }
              </TableBody>
            </Table>
            :
            <RefreshIndicator
              size={50}
              top={50}
              left={540}
              status="hide"
              loadingColor="#FF9800"
              status="loading"
            />
          }
          {
            this.state.foods.length === 0 ? <div style={styles.nothing}> (゜v゜)つ什么都没有...</div> : null
          }
        </div>
      </div>
    );
  }

}

const styles = {
  tools: {
    height: '60px',
    margin: '0 0 10px 0',
    padding: '0 36px',
  },
  btns: {
    margin: '25px 0 0 12px',
  },
  textInput: {
    padding: '24px 0 0 0',
    margin: '0 0 0 68px',
    fontSize: '14px',
  },
  pullLeft: {
    float: 'left',
  },
  pullRight: {
    float: 'right',
  },
  table: {
    padding: '14px',
    minHeight: '140px',
    position: 'relative',
  },
  images: {
    width: '100%',
    height: '40px',
  },
  checkMore: {
    color: '#2196F3',
    cursor: 'pointer',
  },
  nothing: {
    color: '#999',
    textAlign: 'center',
    marginTop: '30px',
  }
};

const tableColStyles = {
  col1: {
    width: '40px',
    textAlign: 'center',
  },
  col2: {

  },
};

export default Nav;