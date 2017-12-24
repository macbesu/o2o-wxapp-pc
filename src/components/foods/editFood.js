import React from 'react';

import { requestGetData } from '../../config/api';
import Paper from 'material-ui/Paper';
import { CardDetailImage, CardDetailText, CardDetailToggle } from '../utils/CardDetailItem';

class EditFood extends React.Component {
  constructor(props) {
    super();
    this.state = {
      food: {},
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;
    requestGetData('getFoodById', 'get', self.props.match.params.id)
      .then((res) => {
        self.setState({ food: res.data });
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

  changeDescription() {
    const food = Object.assign({}, this.state.food);
    food.description = val;
    this.setState({ food });
  }

  render() {
    return (
      <div className="card-detail-box">
        <CardDetailImage label={'图片'} imageUrl={this.state.food.imageUrl} />
        <CardDetailText label={'ID'} text={this.state.food._id} textDisabled={true} />
        <CardDetailToggle label={'售罄'} yn={this.state.food.sellout} />
        <CardDetailText label={'名字'} text={this.state.food.foodName} textChange={val => this.changeFoodName(val) } />
        <CardDetailText label={'价格'} text={this.state.food.price} textChange={val => this.changePrice(val) } />
        <CardDetailText label={'介绍'} text={this.state.food.description} textChange={val => this.changeDescription(val) } />
        
      </div>
    );
  }

}

const styles = {

};

export default EditFood;