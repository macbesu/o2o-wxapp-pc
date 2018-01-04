import React from 'react';

import { requestGetData, requestDeleteData } from '../../config/api';
import { CardDetailText, CardDetailTools } from '../utils/CardDetailItem';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

class EditUser extends React.Component {
  constructor(props) {
    super();
    this.state ={
      user: {
        _id: '',
        fullName: '',
        address: '',
        birthday: '',
        phone: '',
      }
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;
    requestGetData('users', `id=${self.props.match.params.id}`)
      .then((res) => {
        self.setState({ user: res.data });
      })
      .catch((e) => {
        console.error(e);
      }); 
  }

  render() {
    return (
      <div className="card-detail-box">
        <CardDetailText 
          label={'ID'} 
          text={this.state.user._id} 
          textDisabled={true}
        />
        <CardDetailText 
          label={'名称'} 
          text={this.state.user.fullName} 
          textDisabled={true}
        />
        <CardDetailText 
          label={'手机'} 
          text={this.state.user.phone} 
          textDisabled={true}
        />
        <CardDetailText 
          label={'地址'} 
          text={this.state.user.address || ' '} 
          textDisabled={true}
        />
        <CardDetailText 
          label={'生日'} 
          text={this.state.user.birthday || ' '} 
          textDisabled={true}
        />
        <CardDetailTools 
          historyBack="/userlist"
          onlyReturn={true}
        />
      </div>
    )
  }
}

export default EditUser;