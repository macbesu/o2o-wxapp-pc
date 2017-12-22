import React from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Nav extends React.Component {
  constructor(props) {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Paper>
          <Menu>
            <MenuItem primaryText="Maps" />
            <MenuItem primaryText="Books" />
            <MenuItem primaryText="Flights" />
            <MenuItem primaryText="Apps" />
          </Menu>
        </Paper>
      </div>
    );
  }

}

export default Nav;