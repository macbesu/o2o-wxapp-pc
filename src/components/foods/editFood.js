import React from 'react';

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
    const self = this;
    this.setState({
      id: self.props.match.params.id,
    });
  }

  render() {
    return (
      <div>
        <CardDetailImage />
      </div>
    );
  }

}

const styles = {

};

export default EditFood;