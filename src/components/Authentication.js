import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Authentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(
            (success) => {
                if (!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleRegister() {
        let id = this.state.username;
        let email = this.state.email;
        let pw = this.state.password;
        let repw = this.state.repassword;

        this.props.onRegister(id, email, pw, repw).then(
            (result) => {
                if (!result) {
                    this.setState({
                        username: '',
                        email: '',
                        password: '',
                        repassword: ''
                    });
                }
            }
        );
    }

    handleKeyPress(e) {
        if (e.charCode == 13) {
            if (this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    render () {

        const inputLogin = (
            <div>
                <div className="input-field col s12 username">
                    <input
                        name="username"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                    <label>Username</label>
                </div>
                <div className="input-field col s12">
                    
                    <input
                        name="password"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.password}
                        onKeyPress={this.handleKeyPress}
                    />
                    <label>Password</label>
                </div>
            </div>
        );

        const inputRegister = (
            <div>
                <div className="input-field col s12 username">
                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                </div>
                <div className="input-field col s12">
                    <label>E-mail</label>
                    <input
                        name="email"
                        type="email"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                </div>
                <div className="input-field col s12">
                    <label>Confirm Password</label>
                    <input
                        name="repassword"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.repassword}
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputLogin}
                        <a 
                            className="waves-effect waves-light col s12 blue btn-large"
                            onClick={this.handleLogin}>SUBMIT</a>
                    </div>
                </div>
                <div className="footer">
                    <div className="card-content">
                        <div className="right">
                            New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

        const registerView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputRegister}
                        <a
                            className="waves-effect waves-light col s12 blue btn-large"
                            onClick={this.handleRegister}>CREATE</a>
                    </div>
                </div>
                <div className="footer">
                    <div className="card-content">
                        <div className="right">
                            You Member? <Link to="/login">Login account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView}
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: PropTypes.bool,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func
};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error('login function not defined'); },
    onRegister: (id, email, pw) => { console.error('register function not defined'); }
};

export default Authentication;