import React from 'react';

import { requestGetData, requestDeleteData, requestPostData, requestPatchData } from '../../config/api';
import { CardDetailText, CardDetailTools } from '../utils/CardDetailItem';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Snackbar from 'material-ui/Snackbar';

class EditCoupon extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isAddingStatus: true, // ture是增加，false是修改
      alertOpen: false,
      alertMsg: '',
      coupon: {
        _id: null,
        couponType: null,
        value: null,
        limit: null,
        remark: null,
      },
      showDisc: null,
      discountError: null,
      limitError: null,
      valueError: null,
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
        self.setState({ 
          coupon: res.data,
          showDisc: res.data.couponType === 0 ? res.data.value : null
        });
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
    const { couponType, value, limit } = this.state.coupon;
    if ((couponType === 0 || couponType === 1 )&& !this.state.limitError && !this.state.valueError) {
      const coupon = { couponType, value, limit };
      if (couponType === 0) coupon.limit = null; 
      const self = this;
      if (this.state.isAddingStatus) {
        requestPostData('coupons', coupon)
          .then((res) => {
            if (res.status === 201) {
              self.setState({ alertOpen: true, alertMsg: '√ 保存成功！' }, () => { 
                self.props.history.replace('/couponlist');
                self.closeAlert(); 
              });
            } else {
              const errMsg = JSON.parse(JSON.stringify(res)).response.data.errmsg;
              self.setState({ alertOpen: true, alertMsg: `✘ ${errMsg} ！` }, () => { self.closeAlert() });
            }
          })
          .catch((err) => {
            self.setState({ alertOpen: true, alertMsg: '✘ 服务器开小差了！' }, () => { self.closeAlert() });
          });
      } else {
        coupon._id = this.state.coupon._id;
        requestPatchData('coupons', self.props.match.params.id, coupon)
          .then((res) => {
            if (res.status === 200) {
              self.setState({ alertOpen: true, alertMsg: '√ 保存成功！' }, () => { 
                self.props.history.replace('/couponlist');
                self.closeAlert(); 
              });
            } else {
              const errMsg = JSON.parse(JSON.stringify(res)).response.data.errmsg;
              self.setState({ alertOpen: true, alertMsg: `✘ ${errMsg} ！` }, () => { self.closeAlert() });
            }
          })
          .catch((err) => {
            self.setState({ alertOpen: true, alertMsg: '✘ 服务器开小差了！' }, () => { self.closeAlert() });
          });
      }
    }
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

  changeCouponType(e, val) {
    const coupon = Object.assign({}, this.state.coupon);
    coupon.couponType = parseInt(val);
    coupon.limit = null;
    coupon.value = null;
    if (val === 1) {
      this.setState({ coupon, limitError: '必填', valueError: '必填' });
    } else {
      this.setState({ coupon, discountError: '必填' });
    }
  }

  handleDiscountChange(e, val) {
    const num = Number(val);
    const len = val.length;
    if (!isNaN(num) && (len <= 2) && val[0] !== '0') {
      const coupon = Object.assign({}, this.state.coupon);
      coupon.limit = null;
      coupon.value = (len === 0 ?  null : coupon.value = num * 1.0 / (10 ** len));
      this.setState({ coupon, discountError: null }, () => {
        // console.warn(`coupon value: ${this.state.coupon.value}`);
      });
    }
  }

  handleOffLimitChange(e, val) {
    const num = Number(val);
    const len = val.length;
    if (!isNaN(num) && len <= 4 && val !== '0') {
      const coupon = Object.assign({}, this.state.coupon);
      if (len === 0) {
        coupon.limit = null;
        this.setState({ coupon, limitError: '必填' });
      } else {
        coupon.limit = num;
        if (num < this.state.coupon.value) {
          this.setState({ coupon, limitError: null, valueError: '数值超出' });
        } else {
          this.setState({ coupon, limitError: null });
        }
      }
    } 
  }

  handleOffValueChange(e, val) {
    const num = Number(val);
    const len = val.length;
    if (!isNaN(num) && len <= 4 && val !== '0') {
      const coupon = Object.assign({}, this.state.coupon);
      if (len === 0) {
        coupon.value = null;
        this.setState({ coupon, valueError: '必填' });
      } else {
        coupon.value = num ;
        this.setState({ coupon, valueError: num > this.state.coupon.limit ? '数值超出' : null });
      }
    }
    
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
            <RadioButtonGroup 
              name="couponType"
              valueSelected={this.state.coupon.couponType}
              onChange={(e, val) => this.changeCouponType(e, val)} 
              style={{display:'flex'}} 
            >
              <RadioButton 
                value={0} 
                label="打折" 
                disabled={!this.state.isAddingStatus && this.state.coupon.couponType === 1} 
                style={{ width: '200px' }}
              />
              <RadioButton 
                value={1} 
                label="满减" 
                disabled={!this.state.isAddingStatus && this.state.coupon.couponType === 0}
              />
            </RadioButtonGroup>
          </div>
        </div>
        {
          this.state.coupon.couponType === 0 ?
          <div className="card-detail-item">
            <div className="card-detail-item-label">
              打折额度
            </div>
            <div className="card-detail-item-text">
              <span style={{ marginTop: '15px' }}>0.&nbsp;</span>
              <TextField 
                name="discount" 
                value={ this.state.coupon.value ? this.state.coupon.value * (10 ** (`${this.state.coupon.value}`.length - 2)) : '' } 
                errorText={this.state.discountError}
                style={{ width: '40px' }} 
                onChange={(e, val) => this.handleDiscountChange(e, val)}
              /> 
            </div> 
          </div> : null
        }
        {
          this.state.coupon.couponType === 1 ?
          <div className="card-detail-item">
            <div className="card-detail-item-label">
              满减额度
            </div>
            <div className="card-detail-item-text">
              <span style={{ marginTop: '12px' }}>满&nbsp;</span>
              <TextField 
                name="offlimit" 
                value={this.state.coupon.limit ? this.state.coupon.limit : ''} 
                errorText={this.state.limitError}
                style={{ width: '50px' }} 
                onChange={(e, val) => this.handleOffLimitChange(e, val)}
              /> 
              <span style={{ marginTop: '12px' }}>&nbsp;减&nbsp;</span>
              <TextField 
                name="offvalue" 
                value={this.state.coupon.value ? this.state.coupon.value : ''} 
                errorText={this.state.valueError}
                style={{ width: '50px' }} 
                onChange={(e, val) => this.handleOffValueChange(e, val)}
              /> 
            </div> 
          </div> : null
        }
        <CardDetailTools 
          historyBack="/couponlist"
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

export default EditCoupon;