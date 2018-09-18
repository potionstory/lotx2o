import React from "react";

class LottoNo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      color: ["orange", "blue", "red", "purple", "green"]
    };
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.setState({
      index: this.props.onIndex
    });
  }

  handleSaveButton(value, key) {
    switch (key) {
      case 0:
        value < this.props.onNumber[key + 1]
          ? this.props.onReady(true)
          : this.props.onReady(false);
        break;
      case 5:
        value > this.props.onNumber[key - 1]
          ? this.props.onReady(true)
          : this.props.onReady(false);
        break;
      default:
        value > this.props.onNumber[key - 1] &&
        value < this.props.onNumber[key + 1]
          ? this.props.onReady(true)
          : this.props.onReady(false);
    }
  }

  handleChange(e) {
    let index = this.state.index;
    let value = parseInt(e.target.value);
    let key = parseInt(e.target.name);
    let number = "";

    if (value > 0 && value < 46) {
      number = value == "" ? "" : value;
      this.handleSaveButton(value, key);
    } else {
      number = "";
      Materialize.toast("Please enter only 1 to 45 ", 2000);
    }
    this.props.onCreateNumber(index, key, number);
  }

  handleBlur(e) {
    let index = this.state.index;
    let key = parseInt(e.target.name);
    let number = parseInt(e.target.value);
    let overlab = this.props.onNumber.filter(x => {
      return x == number;
    });

    if (overlab.length == 2) {
      Materialize.toast("It is a number that already exists ", 2000);
      this.props.onCreateNumber(index, key, "");
      let ipt = document.querySelectorAll(".creator .list-number")[index];
      ipt.childNodes[1].childNodes[0].childNodes[key].childNodes[0].focus();
    }
  }

  handleRefresh() {
    this.props.onRefresh(this.state.index);
  }

  handleDelete() {
    this.props.onDelete(this.state.index);
  }

  handleRemove() {
    this.props.onRemoveModal(this.props.onId);
  }

  loopNumber() {
    let array = [];

    for (let i = 0; i < 6; i++) {
      let digit = parseInt(this.props.onNumber[i] / 10);
      let color = this.state.color[digit];
      (i => {
        this.props.onNumber[i] == "" ? (array[i] = "grey") : (array[i] = color);
      })(i);
    }

    return (
      <ol className="grey lighten-3">
        {this.props.onNumber.map((n, i) => {
          return (
            <li key={i}>
              <input
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                type="number"
                name={i}
                className={array[i] + " lighten-2"}
                value={n}
                placeholder="?"
              />
            </li>
          );
        })}
      </ol>
    );
  }

  loopUserNumber() {
    let array = [];

    for (let i = 0; i < 6; i++) {
      let digit = parseInt(this.props.onUserNumber[i] / 10);
      let color = this.state.color[digit];
      (i => {
        this.props.onUserNumber[i] == ""
          ? (array[i] = "grey")
          : (array[i] = color);
      })(i);
    }

    return (
      <ol className="grey lighten-3">
        {this.props.onUserNumber.map((n, i) => {
          return (
            <li key={i}>
              <span className={array[i] + " lighten-2"}>{n}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  render() {
    const buttonList = (
      <span className="btns">
        <a
          onClick={this.handleRefresh}
          className="btn-floating waves-effect waves-light blue"
        >
          <i className="material-icons">refresh</i>
        </a>
        {this.props.onIndex != 0 ? (
          <a
            onClick={this.handleDelete}
            className="btn-floating waves-effect waves-light red darken-2"
          >
            <i className="material-icons">clear</i>
          </a>
        ) : (
          ""
        )}
      </span>
    );
    const buttonUser = (
      <span className="btns">
        <a
          onClick={this.handleRemove}
          className="btn-floating waves-effect waves-light red darken-2"
        >
          <i className="material-icons">clear</i>
        </a>
      </span>
    );
    return (
      <li className="list-number">
        <strong>#{this.state.index + 1}</strong>
        <div>
          {this.props.onCreateNumber
            ? this.loopNumber()
            : this.loopUserNumber()}
        </div>
        {this.props.onCreateNumber ? buttonList : buttonUser}
      </li>
    );
  }
}

export default LottoNo;
