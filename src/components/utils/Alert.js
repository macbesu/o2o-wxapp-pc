import React from 'react';

import FontIcon from 'material-ui/FontIcon';

class Alert extends React.Component {
  constructor(props) {
    super();
    this.state = {

    };
  }

  render() {
    const { open, msg, theme } = this.props;
    return (
      <div className={open ? "alert-opened" : "alert-closed" }>
        <div className={`alert-box alert-theme-${theme ? theme : 'success'}`}>
        <FontIcon
        className="muidocs-icon-action-home"
      />
          <span>{theme && theme === 'success' ? "√ " : null}{theme && theme === 'danger' ? "✘ " : null}{msg}</span>
        </div>
      </div>
    );
  }
}

export default Alert;