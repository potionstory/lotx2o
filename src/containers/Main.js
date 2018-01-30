import React from 'react';
import { Card } from 'components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { lottoSaveRequest, lottoRemoveRequest, lottoCountIncrease, lottoCountDecrease, lottoNumberUpdate } from 'actions/lotto';
import { userInfoRequest } from 'actions/user';

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        const userCard = (
            <Card
                onTitle="Your Lotto Number"
                onAuthUser={this.props.authStatusCurrentUser}
                onUserInfoRequest={this.props.userInfoRequest}
                onUserCount={this.props.userStatus.count}
                onUserNumber={this.props.userStatus.number}
                onLottoRemoveRequest={this.props.lottoRemoveRequest}
                onLottoRemove={this.props.lottoRemoveStatus}
                isUserCard={true}
            />
        );

        return (
            <main className="main">
                <div className="container">
                    <Card
                        onTitle="Lotto Number Creator"
                        onAuthLogged={this.props.authStatusIsLoggedIn}
                        onAuthUser={this.props.authStatusCurrentUser}
                        onUserInfoRequest={this.props.userInfoRequest}
                        onUserCount={this.props.userStatus.count}
                        onUserNumber={this.props.userStatus.number}
                        onUserMoney={this.props.userStatus.money}
                        onLottoSaveRequest={this.props.lottoSaveRequest}
                        onLottoSave={this.props.lottoSaveStatus}
                    />
                    {this.props.authStatusIsLoggedIn ? userCard : ''}
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authStatusIsLoggedIn: state.authentication.status.isLoggedIn,
        authStatusCurrentUser: state.authentication.status.currentUser,
        lottoSaveStatus: state.lotto.save.status,
        lottoRemoveStatus: state.lotto.remove.status,
        userStatus: state.user.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        lottoSaveRequest: (count, number, username) => {
            return dispatch(lottoSaveRequest(count, number, username));
        },
        lottoRemoveRequest: (count, number, username) => {
            return dispatch(lottoRemoveRequest(count, number, username));
        },
        userLottoRemoveRequest: (count, number, username) => {
            return dispatch(userLottoRemoveRequest(count, number, username));
        },
        userInfoRequest: () => dispatch(userInfoRequest())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);