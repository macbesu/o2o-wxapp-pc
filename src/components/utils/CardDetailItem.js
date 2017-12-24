import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

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

class CardDetailToggle extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isInputChecked: true,
      toggleText: '是',
    };
  }

  handleToggle(e, isInputChecked) {
    this.setState({ 
      isInputChecked,
      toggleText: isInputChecked ? '是': '否',
    });
  }

  render() {
    const { label } = this.props;
    return (
      <div className="card-detail-item">
        <div className="card-detail-item-label">
          {label}：
        </div>
        <div className="card-detail-item-toggle">
          <Toggle
            label={this.state.toggleText}
            labelPosition="right"
            defaultToggled={true}
            onToggle={(e, isInputChecked) => this.handleToggle(e, isInputChecked)}
          />
        </div>
      </div>
    );
  }
}

export {
  CardDetailImage,
  CardDetailText,
  CardDetailToggle,
};
