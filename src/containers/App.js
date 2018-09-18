import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Header } from "components";
import { Home, Login, Register, Rank, Footer } from "containers";
import {
  getStatusRequest,
  logoutRequest,
  withdrawRequest
} from "actions/authentication";
import { userInfoRequest } from "actions/user";
import { headerHomeOn, headerHomeOff } from "actions/header";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
  }

  componentDidMount() {
    function getCookie(name) {
      let value = "; " + document.cookie;
      let parts = value.split("; " + name + "=");
      if (parts.length == 2)
        return parts
          .pop()
          .split(";")
          .shift();
    }

    let loginData = getCookie("key");

    if (typeof loginData === "undefined") return;

    loginData = JSON.parse(atob(loginData));

    if (!loginData.isLoggedIn) return;
    this.props.getStatusRequest().then(() => {
      if (!this.props.authStatus.valid) {
        loginData = {
          isLoggedIn: false,
          username: ""
        };
        document.cookie = "key=" + btoa(JSON.stringify(loginData));

        let $toastContent = $(
          '<span style="color:#FFB4BA"> Your session is expired, please log in agagin</span>'
        );
        Materialize.toast($toastContent, 4000);
      } else {
        this.props.userInfoRequest();
      }
    });
  }

  handleLogout() {
    this.props.logoutRequest().then(() => {
      Materialize.toast("Good Bye", 2000);

      let loginData = {
        isLoggedIn: false,
        username: ""
      };

      document.cookie = "key=" + btoa(JSON.stringify(loginData));
    });
  }

  handleWithdraw() {
    this.props.withdrawRequest().then(() => {
      Materialize.toast("Good Bye", 2000);

      let loginData = {
        isLoggedIn: false,
        username: ""
      };

      document.cookie = "key=" + btoa(JSON.stringify(loginData));
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Header
            isLoggedIn={this.props.authStatus.isLoggedIn}
            onLogout={this.handleLogout}
            onWithdraw={this.handleWithdraw}
            onUser={this.props.authStatus.currentUser}
            onMoney={this.props.userStatus.money}
            onCount={this.props.userStatus.count}
            onNumber={this.props.userStatus.number}
            onHome={this.props.home}
            onHomeOn={this.props.handleHeaderHomeOn}
            onHomeOff={this.props.handleHeaderHomeOff}
          />
          <div className="contents">
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/rank" component={Rank} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    authStatus: state.authentication.status,
    userStatus: state.user.status,
    home: state.header.home
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
    withdrawRequest: () => {
      return dispatch(withdrawRequest());
    },
    userInfoRequest: () => dispatch(userInfoRequest()),
    handleHeaderHomeOn: () => dispatch(headerHomeOn()),
    handleHeaderHomeOff: () => dispatch(headerHomeOff())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
