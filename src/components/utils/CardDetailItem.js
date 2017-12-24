import React from 'react';

class CardDetailImage extends React.Component {
  constructor(props) {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="card-detail-item">
        <div className="card-detail-item-label">
        </div>
        <div className="card-detail-item-image">
        </div>
      </div>
    );
  }
}

class CardDetailText extends React.Component {
  constructor(props) {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        content
      </div>
    );
  }
}

export {
  CardDetailImage,
  CardDetailText,
};
