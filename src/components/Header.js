import React from 'react';

import AppBar from 'material-ui/AppBar';

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <AppBar
          title="润っ餐饮"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        
      </div>
    );
  }
}

const styles = {
  headerBlueTheme: {
    backgroundColor: 'rgb(33, 150, 243)',
  },
};


export default Header;