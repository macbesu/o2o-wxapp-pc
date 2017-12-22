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
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        111
      </div>
    );
  }
}

const styles = {
  headerbox: {
    width: '1140px',
    margin: '0 auto'
  }
}


export default Header;