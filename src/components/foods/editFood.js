import React from 'react';

import { requestGetData, requestPatchData } from '../../config/api';
import Paper from 'material-ui/Paper';
import { CardDetailImage, CardDetailText, CardDetailToggle, CardDetailSelect, CardDetailTools } from '../utils/CardDetailItem';

class EditFood extends React.Component {
  constructor(props) {
    super();
    this.state = {
      food: {
        _id: null,
        foodName: null,
        price: null,
        imageUrl: null,
        sellout: null, 
        description: null,
        category: {},
        coupon: {},
      },
      categoryList: [],
      couponList: [],
    }
  }

  componentWillMount() {
    this.fetchData();
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

  handleUpdate() {
    const self = this;
    const { _id, foodName, description, price, imageUrl, sellout } = this.state.food;
    const category = this.state.food.category._id || null;
    const coupon = this.state.food.coupon._id || null;
    const food = { _id, foodName, description, price, imageUrl, sellout, category, coupon }; 
    requestPatchData('updateFood', self.props.match.params.id, food)
      .then((res) => {
        
      })
      .catch((err) => {
        console.error(e);
      });
  }

  handleDelete() {
   
  }

  render() {
    return (
      <div className="card-detail-box">
        <CardDetailImage label={'图片'} imageUrl={this.state.food.imageUrl} />
        <CardDetailText 
          label={'ID'} 
          text={this.state.food._id} 
          textDisabled={true} 
        />
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
          handleUpdate={() => this.handleUpdate()}
          handleDelete={() => this.handleDelete()}
        />
      </div>
    );
  }

}

const styles = {

};

export default EditFood;