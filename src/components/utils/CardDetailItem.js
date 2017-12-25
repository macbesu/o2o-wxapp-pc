import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
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
            style={{ minWidth: '300px' }}
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
    this.props.toggleChange(isInputChecked);
  }

  render() {
    const { label, truefalse } = this.props;
    return (
      <div className="card-detail-item">
        <div className="card-detail-item-label">
          {label}：
        </div>
        <div className="card-detail-item-toggle">
          <Toggle
            label={this.state.toggleText}
            labelPosition="right"
            toggled={this.state.isInputChecked}
            onToggle={(e, isInputChecked) => this.handleToggle(e, isInputChecked)}
          />
        </div>
      </div>
    );
  }
}

class CardDetailSelect extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selected: {},
      dataList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.dataList) {
      const { selected, dataList, unification } = nextProps;
      this.setState({ selected, dataList, unification });
		}
  }

  handleSelect(e, key, payload) {
    const selected = Object.assign({}, this.state.selected);
    selected._id = payload;
    selected[this.state.unification] = e.target.innerText;
    this.setState({ selected });
    this.props.selectChange(selected);
  }

  render() {
    const { label, unification } = this.props;
    return (
      <div className="card-detail-item">
        <div className="card-detail-item-label">
          {label}：
        </div>
        <div className="card-detail-item-select">
          <SelectField
            value={this.state.selected._id}
            style={{ minWidth: '300px' }}
            onChange={(e, key, payload) => this.handleSelect(e, key, payload)}
          >
            {
              this.state.dataList.map(item => (
                <MenuItem 
                  key={item._id} 
                  value={item._id} 
                  primaryText={item[unification]} 
                />
              ))
            }
          </SelectField>
        </div>
      </div>
    );
  }
}

class CardDetailTools extends React.Component {
  constructor(props) {
    super();
    this.state = {
      
    };
  }

  render() {
    const styles = {
      btn: {
        margin: '0 16px 0 0',
      }
    }
    return (
      <div className="card-detail-item">
        <div className="card-detail-item-label">
          操作：
        </div>
        <div className="card-detail-item-tools">
          <Link to="/foodList">
            <RaisedButton label="返回" style={styles.btn} />
          </Link>
          <RaisedButton 
            label="保存修改" 
            primary={true} 
            style={styles.btn} 
            onClick={ this.props.handleUpdate } 
          />
          <RaisedButton 
            label="删除" 
            secondary={true} 
            style={styles.btn} 
            onClick={ this.props.handleDelete } 
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
  CardDetailSelect,
  CardDetailTools,
};
