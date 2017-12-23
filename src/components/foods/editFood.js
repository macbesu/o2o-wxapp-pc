import React from 'react';

import Paper from 'material-ui/Paper';

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
        <div className="card-detail-item">
          <div >1</div>
          <div>2</div>
        </div>
      </div>
    );
  }

}

const styles = {

};

export default EditFood;