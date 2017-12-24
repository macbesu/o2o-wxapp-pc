import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

class CardDetailImage extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const { label, imageUrl } = this.props;
    return (
      <div className="card-detail-item">
        <div className="card-detail-item-label">
          {label}：
        </div>
        <div className="card-detail-item-image">
          <img src={imageUrl} />
        </div>
      </div>
    );
  }
}

class CardDetailText extends React.Component {
  constructor(props) {
    super();
    this.state = {
      text: props.text ? props.text : '',
      textDisabled: props.textDisabled || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
			this.setState({
				text: nextProps.text ? nextProps.text : '',
        textDisabled: nextProps.textDisabled || false,
			});
		}
  }

  handleChange(e, text) {
    this.setState({ text });
    this.props.textChange(text);
  }

  render() {
    const { label } = this.props;
    const { text, textDisabled } = this.state;
    return (
      <div className="card-detail-item">
        <div className="card-detail-item-label">
          {label}：
        </div>
        <div className="card-detail-item-text">
          <TextField 
            hintText={`请输入${label}`} 
            value={text} 
            disabled={textDisabled}
            onChange={(e, text) => this.handleChange(e, text)}
          />
        </div>
      </div>
    );
  }
}

export {
  CardDetailImage,
  CardDetailText,
};
