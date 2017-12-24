import React from 'react';

import { requestGetData } from '../../config/api';
import Paper from 'material-ui/Paper';
import { CardDetailImage, CardDetailText } from '../utils/CardDetailItem';

class EditFood extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: null,
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;
    requestGetData('getFoodById', 'get', self.props.match.params.id)
    .then((res) => {
      console.warn(res);
    })
    .catch((e) => {
      console.error(e);
    });
  }

  render() {
    return (
      <div>
        <CardDetailImage label={'图片'} imageUrl={'1'}/>
      </div>
    );
  }

}

const styles = {

};

export default EditFood;