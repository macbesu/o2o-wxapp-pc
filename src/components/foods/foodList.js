import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import requestData from '../../config/api';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class Nav extends React.Component {
  constructor(props) {
    super();
    this.state = {
      list: [],
      category: 1,
      showSelectMore: false,
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;
    requestData('getFoodList', 'get')
      .then((res) => {
        self.setState({
          list: res.data
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  handleChange() {

  }

  deleteAction() {
    this.setState({
      showSelectMore: true
    });
  }

  render() {
    return (
      <div>
        <div className="clearfix" style={styles.tools}>
          <div style={styles.pullLeft}>
            <SelectField
              floatingLabelText="按分类查找"
              value={this.state.category}
              onChange={this.handleChange}
              style={styles.pullLeft}
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <TextField hintText="搜索食品" style={styles.textInput} />
          </div>
          <div style={styles.pullRight}>
            <RaisedButton label="删除" 
              style={styles.btns} 
              labelPosition="before" 
              icon={<DeleteIcon style={{width: '21px', height: '21px', marginTop: '-1px'}}/>} 
              onClick={() => this.deleteAction()}
            />
          </div>
        </div>
        <div style={styles.table}>
          <Table multiSelectable={true}>
            <TableHeader displaySelectAll={this.state.showSelectMore} adjustForCheckbox={this.state.showSelectMore}>
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
            <TableBody displayRowCheckbox={this.state.showSelectMore} stripedRows={false}>
              {
                this.state.list.map((item, index) =>
                  <TableRow key={index}>
                    <TableRowColumn style={tableColStyles.col1}>
                      <img src={item.imageUrl} style={styles.images}/>
                    </TableRowColumn>
                    <TableRowColumn>{item.foodName}</TableRowColumn>
                    <TableRowColumn>{item.price}</TableRowColumn>
                    <TableRowColumn>{item.description}</TableRowColumn>
                    <TableRowColumn>{item.category.categoryName}</TableRowColumn>
                    <TableRowColumn>{item.sellout ? '是' : '否'}</TableRowColumn>
                    <TableRowColumn>{item.favoriteCount}</TableRowColumn>
                    <TableRowColumn style={styles.checkMore}>查看 / 修改</TableRowColumn>
                  </TableRow>)
              }
            </TableBody>
          </Table>
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
    margin: '25px 0 0 0',
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
  },
  images: {
    width: '100%',
    height: '40px',
  },
  checkMore: {
    color: '#2196F3',
    cursor: 'pointer',
  },
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