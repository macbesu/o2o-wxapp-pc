import React from 'react';

import { requestGetData, requestDeleteData, requestPostData, requestPatchData } from '../../config/api';
import { CardDetailText, CardDetailTools } from '../utils/CardDetailItem';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

class EditCategory extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isAddingStatus: true, // ture是增加，false是修改
      alertOpen: false,
      alertMsg: '',
      category: {
        _id: '',
        categoryName: '',
      },
    };
  }

  componentWillMount() {
    const self = this;
    if (this.props.match.params.id) {
      this.setState({ isAddingStatus: false }, () => {
        this.fetchData();
      });
    }
  }

  fetchData() {
    const self = this;
    requestGetData('categories', `id=${self.props.match.params.id}`)
      .then((res) => {
        self.setState({ category: res.data });
      })
      .catch((e) => {
        console.error(e);
      }); 
  }

  closeAlert() {
    setTimeout(() => {
      this.setState({ alertOpen: false, alertMsg: '' });
    }, 4000);
  }

  changeCategoryName(val) {
    const category = Object.assign({}, this.state.category);
    category.categoryName = val;
    this.setState({ category });
  }

  handleSave() {
    const { categoryName } = this.state.category;
    const category = { categoryName };
    const self = this;
    if (this.state.isAddingStatus) {
      requestPostData('categories', category)
        .then((res) => {
          if (res.status === 201) {
            self.setState({ alertOpen: true, alertMsg: '√ 保存成功！' }, () => { 
              self.props.history.replace('/categorylist');
              self.closeAlert(); 
            });
          } else {
            const errMsg = JSON.parse(JSON.stringify(res)).response.data.message;
            self.setState({ alertOpen: true, alertMsg: `✘ ${errMsg} ！` }, () => { self.closeAlert() });
          }
        })
        .catch((err) => {
          self.setState({ alertOpen: true, alertMsg: '✘ 服务器开小差了！' }, () => { self.closeAlert() });
        });
    } else {
      category._id = this.state.category._id;
      requestPatchData('categories', self.props.match.params.id, category)
        .then((res) => {
          if (res.status === 200) {
            self.setState({ alertOpen: true, alertMsg: '√ 保存成功！' }, () => { 
              self.props.history.replace('/categorylist');
              self.closeAlert(); 
            });
          } else {
            const errMsg = JSON.parse(JSON.stringify(res)).response.data.message;
            self.setState({ alertOpen: true, alertMsg: `✘ ${errMsg} ！` }, () => { self.closeAlert() });
          }
        })
        .catch((err) => {
          self.setState({ alertOpen: true, alertMsg: '✘ 服务器开小差了！' }, () => { self.closeAlert() });
        });
    }
  }

  handleDelete() {
    const self = this;
    requestDeleteData('categories', self.props.match.params.id)
      .then((res) => {
        self.props.history.replace('/categorylist');
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    return (
      <div className="card-detail-box">
        {
          !this.state.isAddingStatus ? 
          <CardDetailText 
            label={'ID'} 
            text={this.state.category._id} 
            textDisabled={true} 
          /> :null
        }
        <CardDetailText 
          label={'分类名'} 
          text={this.state.category.categoryName} 
          textChange={val => this.changeCategoryName(val) } 
        />
        <CardDetailTools 
          historyBack="/categorylist"
          isAddingStatus={this.state.isAddingStatus}
          handleUpdate={() => this.handleSave()}
          handleDelete={() => this.handleDelete()}
        />
        <Snackbar
          open={this.state.alertOpen}
          message={this.state.alertMsg}
          onRequestClose={this.handleRequestClose}
          contentStyle={{ textAlign: 'center' }}
        />
      </div>
    );
  }
}

export default EditCategory;