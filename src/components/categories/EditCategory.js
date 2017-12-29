import React from 'react';

import { requestGetData, requestDeleteData } from '../../config/api';

class EditCategory extends React.Component {
  constructor(props) {
    super();
    this.state = {
      openDialog: false,
      categories: [],
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    requestGetData('categories')
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      }); 
  }


  render() {
    return (
      <div>
        1
      </div>
    );
  }
}

export default EditCategory;