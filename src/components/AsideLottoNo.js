import React from "react";

class AsideLottoNo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ["orange", "blue", "red", "purple", "green"]
    };
  }

  render() {
    let array = [];
    for (let i = 0; i < 6; i++) {
      let digit = parseInt(this.props.onNumber[i] / 10);
      let color = this.state.color[digit];
      array[i] = color;
    }
    return (
      <li className="collection-item">
        <div className="box-lotto grey lighten-3">
          <span className={array[0] + " lighten-2"}>
            {this.props.onNumber[0]}
          </span>
          <span className={array[1] + " lighten-2"}>
            {this.props.onNumber[1]}
          </span>
          <span className={array[2] + " lighten-2"}>
            {this.props.onNumber[2]}
          </span>
          <span className={array[3] + " lighten-2"}>
            {this.props.onNumber[3]}
          </span>
          <span className={array[4] + " lighten-2"}>
            {this.props.onNumber[4]}
          </span>
          <span className={array[5] + " lighten-2"}>
            {this.props.onNumber[5]}
          </span>
        </div>
        <span className="txt-username">{this.props.onUser}</span>
      </li>
    );
  }
}

export default AsideLottoNo;
