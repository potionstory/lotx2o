import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      number: [["", "", "", "", "", ""]],
      color: ["orange", "blue", "red", "purple", "green"]
    };
    this.handleNumber = this.handleNumber.bind(this);
  }

  handleNumber() {
    return (
      <div>
        {this.props.onNumber.map((n, i) => {
          let array = [];
          for (let j = 0; j < 6; j++) {
            let digit = parseInt(n.number[j] / 10);
            let color = this.state.color[digit];
            array[j] = color;
          }
          return (
            <div key={i} className="list-lotto grey lighten-3">
              <span className={array[0] + " lighten-2"}>{n.number[0]}</span>
              <span className={array[1] + " lighten-2"}>{n.number[1]}</span>
              <span className={array[2] + " lighten-2"}>{n.number[2]}</span>
              <span className={array[3] + " lighten-2"}>{n.number[3]}</span>
              <span className={array[4] + " lighten-2"}>{n.number[4]}</span>
              <span className={array[5] + " lighten-2"}>{n.number[5]}</span>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    let money = String(this.props.onMoney).replace(
      /(\d)(?=(?:\d{3})+(?!\d))/g,
      "$1,"
    );

    const emptyNumber = (
      <span className="grey lighten-3 box-empty">LOTTO EMPTY</span>
    );

    const loginButton = (
      <li>
        <Link to="/login" onClick={this.props.onHomeOn}>
          <i className="material-icons left">vpn_key</i>
          LOG IN
        </Link>
      </li>
    );

    const loginUser = (
      <ul>
        <li>
          <a className="dropdown-button" href="#" data-activates="usermenu">
            {this.props.onUser}님
            <i className="material-icons right">arrow_drop_down</i>
          </a>
          <ul id="usermenu" className="dropdown-content">
            <li>
              <a href="#" className="right-align">
                &#8361; {money}
              </a>
            </li>
            <li>
              <a href="#" className="right-align">
                {this.props.onNumber.length ? this.handleNumber() : emptyNumber}
              </a>
            </li>
            <li className="row">
              <div className="btn-blue col s6">
                <a
                  onClick={this.props.onLogout}
                  className="weves-effect waves-light btn blue"
                >
                  <i className="material-icons left">lock_open</i>
                  LOG OUT
                </a>
              </div>
              <div className="btn-red col s6">
                <a
                  onClick={this.props.onWithdraw}
                  className="weves-effect waves-light btn red darken-2"
                >
                  <i className="material-icons left">exit_to_app</i>
                  LEAVE
                </a>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    );

    const homeButton = (
      <li>
        <Link to="/" onClick={this.props.onHomeOff}>
          <i className="material-icons left">home</i>
          HOME
        </Link>
      </li>
    );

    const gnbButton = (
      <li>
        <a className="dropdown-button" data-activates="gnb">
          <i className="medium material-icons">menu</i>
        </a>
        <ul id="gnb" className="dropdown-content">
          <li>
            <a>
              <i className="material-icons">cloud</i>
              ABOUT LOTX2O
            </a>
          </li>
          <li>
            <a>
              <i className="material-icons">cloud</i>
              HOW TO USE
            </a>
          </li>
          <li>
            <a>
              <i className="material-icons">cloud</i>
              RANK
            </a>
          </li>
          <li>
            <a>
              <i className="material-icons">cloud</i>
              CHART
            </a>
          </li>
          <li>
            <a>
              <i className="material-icons">cloud</i>
              HELP(TECHNOLOGY)
            </a>
          </li>
        </ul>
      </li>
    );

    const homeOnOff = <ul>{this.props.onHome ? homeButton : loginButton}</ul>;

    return (
      <nav>
        <div className="nav-wrapper blue">
          <h1 className="brand-logo center">
            <Link to="/">LOTX2O</Link>
          </h1>
          <div className="left">
            <ul>{gnbButton}</ul>
          </div>
          <div className="right">
            {this.props.isLoggedIn ? loginUser : homeOnOff}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  onWithdraw: PropTypes.func,
  onHome: PropTypes.bool,
  onHomeOn: PropTypes.func,
  onHomeOff: PropTypes.func,
  onUser: PropTypes.string,
  onMoney: PropTypes.number
};

Header.defaultProps = {
  isLoggedIn: false,
  onLogout: () => {
    console.error("logout function not defined");
  },
  onWithdraw: () => {
    console.error("withdraw function not defined");
  },
  onHome: false,
  onHomeOn: () => {
    console.error("HomeOn function not defined");
  },
  onHomeOff: () => {
    console.error("HomeOff function not defined");
  },
  onUser: ""
};

export default Header;
