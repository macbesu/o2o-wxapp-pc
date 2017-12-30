import React from 'react';

import { requestGetData, requestDeleteData, requestPostData, requestPatchData } from '../../config/api';
import { CardDetailText, CardDetailTools, CardDetailSelect } from '../utils/CardDetailItem';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Snackbar from 'material-ui/Snackbar';

class EditCoupon extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isAddingStatus: true, // ture是增加，false是修改
      alertOpen: false,
      alertMsg: '',
      coupon: {
        _id: '',
        couponType: '',
        value: '',
        limit: '',
        remark: '',
        selectCouponType: '0',
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
    requestGetData('coupons', `id=${self.props.match.params.id}`)
      .then((res) => {
        self.setState({ coupon: res.data });
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

  handleSave() {

  }

  handleDelete() {
    const self = this;
    requestDeleteData('coupons', self.props.match.params.id)
      .then((res) => {
        self.props.history.replace('/couponlist');
      })
      .catch((e) => {
        console.error(e);
      });
  }
  
  closeAlert() {

  }

  changeCouponType(e, val) {
    this.setState({ selectCouponType: val })
  }

  handleDiscountChange(e, val) {

  }

  render() {
    return (
      <div className="card-detail-box">
        {
          !this.state.isAddingStatus ? 
          <CardDetailText 
            label={'ID'} 
            text={this.state.coupon._id} 
            textDisabled={true} 
          /> :null
        }
        <div className="card-detail-item">
          <div className="card-detail-item-label">
            优惠券类型
          </div>
          <div className="card-detail-item-text">
            <RadioButtonGroup name="couponType" defaultSelected="" onChange={(e, val) => this.changeCouponType(e, val)} style={{display:'flex'}} >
              <RadioButton value="0" label="打折" style={{ width: '200px' }}/>
              <RadioButton value="1" label="满减" />
            </RadioButtonGroup>
          </div>
        </div>
        <div className="card-detail-item">
          <div className="card-detail-item-label">
            打折额度
          </div>
          <div className="card-detail-item-text">
            <TextField 
              name="discount" 
              value={this.state.discount} 
              style={{ width: '60px' }} 
              onChange={(e, val) => this.handleDiscountChange(e, val)}
            /> 
            <span style={{ marginTop: '12px' }}>折</span>
          </div>
        </div>
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

export default EditCoupon;