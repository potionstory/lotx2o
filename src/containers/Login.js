import React from 'react';
import { Authentication } from 'components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import { userInfoRequest } from 'actions/user';
import { headerHomeOn, headerHomeOff } from 'actions/header';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        this.props.handleHeaderHomeOn();
    };

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw).then(
            () => {
                if (this.props.authLoginStatus === 'SUCCESS') {
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    Materialize.toast('Welcome, ' + id + '!', 2000);
                    this.props.userInfoRequest();
                    this.props.handleHeaderHomeOff();
                    this.props.history.push('/');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        )
    }

    render () {

        return (
            <div>
                <Authentication
                    mode={true}
                    onLogin={this.handleLogin}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authLoginStatus: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        },
        userInfoRequest: () => dispatch(userInfoRequest()),
        handleHeaderHomeOn: () => dispatch(headerHomeOn()),
        handleHeaderHomeOff: () => dispatch(headerHomeOff())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);