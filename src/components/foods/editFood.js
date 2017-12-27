import React from 'react';

import { requestGetData, requestPostData, requestPatchData } from '../../config/api';
import { CardDetailImage, CardDetailText, CardDetailToggle, CardDetailSelect, CardDetailTools } from '../utils/CardDetailItem';
import Paper from 'material-ui/Paper';
// import Alert from '../utils/Alert';
import Snackbar from 'material-ui/Snackbar';

class EditFood extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isAddingStatus: true, // ture是增加，false是修改
      alertOpen: false,
      alertMsg: '',
      food: {
        _id: '',
        foodName: '',
        price: '',
        imageUrl: '',
        sellout: '', 
        description: '',
        category: {},
        coupon: {},
      },
      categoryList: [],
      couponList: [],
    }
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.fetchData();
      this.setState({ isAddingStatus: false });
    }
    this.getCategoryList();
    this.getCouponList();
  }

  fetchData() {
    const self = this;
    requestGetData('getFoodById', self.props.match.params.id)
      .then((res) => {
        self.setState({ food: res.data });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  getCategoryList() {
    const self = this;
    requestGetData('getCategorylist')
      .then((res) => {
        self.setState({ categoryList: res.data });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  getCouponList() {
    const self = this;
    requestGetData('getCouponList')
      .then((res) => {
        self.setState({ couponList: res.data });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  changeFoodName(val) {
    const food = Object.assign({}, this.state.food);
    food.foodName = val;
    this.setState({ food });
  }

  changePrice(val) {
    const food = Object.assign({}, this.state.food);
    food.price = val;
    this.setState({ food });
  }

  changeDescription(val) {
    const food = Object.assign({}, this.state.food);
    food.description = val;
    this.setState({ food });
  }

  changeSellout(val) {
    const food = Object.assign({}, this.state.food);
    food.sellout = val;
    this.setState({ food });
  }

  changeCategory(obj) {
    const food = Object.assign({}, this.state.food);
    food.category._id = obj._id;
    food.category.categoryName = obj.categoryName;
    this.setState({ food });
  }

  changeCoupon(obj) {
    const food = Object.assign({}, this.state.food);
    food.coupon._id = obj._id;
    food.coupon.remark = obj.remark;
    this.setState({ food });
  }

  closeAlert() {
    setTimeout(() => {
      this.setState({ alertOpen: false, alertMsg: '' });
    }, 4000);
  }

  handleSave() {
    const self = this;
    const { _id, foodName, description, price, imageUrl, sellout } = this.state.food;
    const category = this.state.food.category._id || null;
    const coupon = this.state.food.coupon._id || null;
    const food = { _id, foodName, description, price, imageUrl, sellout, category, coupon }; 

    if (this.state.isAddingStatus) {
      requestPostData('createFood', '', food)
        .then((res) => {
          if (res.status === 200) {
            self.setState({ alertOpen: true, alertMsg: '√ 保存成功！' }, () => { self.closeAlert() });
          } else {
            const errMsg = JSON.parse(JSON.stringify(res)).response.data.message;
            self.setState({ alertOpen: true, alertMsg: `✘ ${errMsg} ！` }, () => { self.closeAlert() });
          }
        })
        .catch((err) => {
          self.setState({ alertOpen: true, alertMsg: '✘ 服务器开小差了！' }, () => { self.closeAlert() });
        });
    } else {
      requestPatchData('updateFood', self.props.match.params.id, food)
        .then((res) => {
          if (res.status === 200) {
            self.setState({ alertOpen: true, alertMsg: '√ 保存成功！' }, () => { self.closeAlert() });
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
   
  }

  render() {
    return (
      <div className="card-detail-box">
        <CardDetailImage label={'图片'} imageUrl={this.state.food.imageUrl} />
        {
          !this.state.isAddingStatus ? 
          <CardDetailText 
            label={'ID'} 
            text={this.state.food._id} 
            textDisabled={true} 
          /> :null
        }
        <CardDetailToggle 
          label={'售罄'} 
          truefalse={this.state.food.sellout} 
          toggleChange={val => this.changeSellout(val)}
        />
        <CardDetailText 
          label={'名字'} 
          text={this.state.food.foodName} 
          textChange={val => this.changeFoodName(val) } 
        />
        <CardDetailText 
          label={'价格'} 
          text={this.state.food.price} 
          textChange={val => this.changePrice(val) } 
        />
        <CardDetailText 
          label={'介绍'} 
          text={this.state.food.description} 
          textChange={val => this.changeDescription(val) } 
        />
        <CardDetailSelect 
          label={'分类'} 
          selected={this.state.food.category} 
          unification={'categoryName'} 
          dataList={this.state.categoryList} 
          selectChange={val => this.changeCategory(val)}
        />
        <CardDetailSelect 
          label={'优惠券'} 
          selected={this.state.food.coupon} 
          unification={'remark'} 
          dataList={this.state.couponList} 
          selectChange={val => this.changeCoupon(val)}
        />
        <CardDetailTools 
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

export default EditFood;