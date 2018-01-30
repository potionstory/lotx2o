import React from 'react';
import { LottoNo } from 'components';
import update from 'react-addons-update';
import PropTypes from 'prop-types';

class Card extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            ready: false,
            count: 1,
            number: [['', '', '', '', '', '']]
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleReady = this.handleReady.bind(this);
        this.handleSaveModal = this.handleSaveModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRefreshAll = this.handleRefreshAll.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRemoveModal = this.handleRemoveModal.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        $('.modal').modal();
    }

    handleCreate() {
        let number = this.state.number.map((n, i) => {
            let lotto = n;
            for(let i = 0; i < 6; i++) {
                let flag = true;
                if(n[i] == ''){
                    while(flag){
                        let x = parseInt(Math.random() * 45 + 1);
                        if(lotto.indexOf(x) == -1){
                            lotto[i] = x;
                            flag = false;
                        }
                    }
                }
            }
            return lotto.sort((a, b) => {
                return a - b;
            });
        });

        this.setState({
            ready: true,
            number: number
        });
    }

    handleReady(ready) {
        this.setState({
            ready: ready
        }); 
    }

    handleSaveModal() {
        let count = this.props.onUserCount + this.state.count;
        let ready = this.state.ready;
        let number = this.state.number;
        let money = this.props.onUserMoney;
        let username = this.props.onAuthUser;
        let empty = 0;

        number.map((n, i) => {
            n.indexOf('') != -1 ? empty += 1 : empty += 0 ;
        });

        if (!ready){
            Materialize.toast('Please press the CREATE button', 2000);
            return true;
        }

        if (count > 5) {
            Materialize.toast('Game is 5 over not save', 2000);
            return true;
        }

        if (empty > 0) {
            Materialize.toast('There is a blank number', 2000);
            return true;
        }

        if ((number.length * 1000) > money) {
            Materialize.toast('You do not have enough money', 2000);
            return true;
        }

        $('#save-modal').modal('open');
    }

    handleSave() {
        let count = this.props.onUserCount + this.state.count;
        let number = this.state.number;
        let username = this.props.onAuthUser;

        return this.props.onLottoSaveRequest(count, number, username).then(
            () => {
                if (this.props.onLottoSave === 'SUCCESS') {
                    Materialize.toast('Success', 2000);
                    this.props.onUserInfoRequest();
                    return true;
                } else {
                    Materialize.toast('Failure', 2000);
                    return false;
                }
            }
        )
    }

    handleAdd() {
        let n = this.state.count;

        if (n < 5){
            this.setState({
                count: this.state.count + 1,
                number: update(
                    this.state.number,
                    {
                        $push: [['', '', '', '', '', '']]
                    }
                )
            });
        } else {
            Materialize.toast('To Much Game Index!!!', 2000);
        }
    }

    handleRefreshAll() {
        let _this = this;
        let emptyNumber = [];
        for (let i = 0; i < this.state.count; i += 1){
            emptyNumber[i] = ['', '', '', '', '', ''];
        }
        Promise.all(emptyNumber).then(
            function() {
                _this.setState({
                    number: emptyNumber
                });
            }
        );
    }

    handleNumber(index, key, number) {
        this.setState({
            number: update(
                this.state.number,
                {
                    [index]: { 
                        [key]: { $set: number }
                    }
                }
            )
        });
    }

    handleRefresh(index) {
        this.setState({
            number: update(
                this.state.number,
                {
                    [index]: { $set: ['', '', '', '', '', ''] }
                }
            )
        });
    }
    
    handleDelete(index) {
        this.setState({
            count: this.state.count - 1,
            number: update(
                this.state.number,
                {
                    $splice: [[index, 1]]
                }
            )
        });
    }

    handleRemoveModal(id) {
        $('#remove-modal').modal('open');
        this.setState({
            id: id
        });
    }

    handleRemove(id) {
        return this.props.onLottoRemoveRequest(id).then(
            () => {
                if (this.props.onLottoRemove === 'SUCCESS') {
                    Materialize.toast('Success', 2000);
                    this.props.onUserInfoRequest();
                    return true;
                } else {
                    Materialize.toast('Failure', 2000);
                    return false;
                }
            }
        )
    }

    loopLotto() {
        return (
            <ul className="box-number creator">
                {this.state.number.map((n, i) => {
                    return (
                        <LottoNo key={i} onIndex={i} onNumber={n} onCreateNumber={this.handleNumber} onReady={this.handleReady} onDelete={this.handleDelete} onRefresh={this.handleRefresh}/>
                    )
                })}
            </ul>
        );
    }

    loopUserLotto() {
        if (this.props.onUserCount) {
            return (
                <ul className="box-number">
                    {this.props.onUserNumber.map((n, i) => {
                        return (
                            <LottoNo key={i} onIndex={i} onId={n._id} onUserNumber={n.number} onRemoveModal={this.handleRemoveModal}/>
                        )
                    })}
                </ul>
            );
        } else {
            return (
                <span className="box-empty">LOTTO EMPTY</span>
            );
        }
    }

    render () {
        const saveModal = (
            <div id="save-modal" className="modal">
                <h4 className="blue">SAVE</h4>
                <div className="modal-content">
                    <p>Save lotto number?</p>
                </div>
                <div className="modal-footer">
                    <a onClick={this.handleSave} className="modal-action modal-close waves-effect waves-light btn blue darken-2">Yes</a>
                    <a href="#!" className="modal-action modal-close waves-effect waves-light btn red darken-2">No</a>
                </div>
            </div>
        )

        const removeModal = (
            <div id="remove-modal" className="modal">
                <h4 className="blue">REMOVE</h4>
                <div className="modal-content">
                    <p>Remove lotto number?</p>
                </div>
                <div className="modal-footer">
                    <a onClick={() => this.handleRemove(this.state.id)} className="modal-action modal-close waves-effect waves-light btn blue darken-2">Yes</a>
                    <a href="#!" className="modal-action modal-close waves-effect waves-light btn red darken-2">No</a>
                </div>
            </div>
        )

        const buttonCreate = (
            <ul>
                <li>
                    <a onClick={this.handleAdd} className="waves-effect waves-light btn blue">
                        <i className="material-icons">add</i>
                    </a>
                </li>
                <li>
                    <a onClick={this.handleRefreshAll} className="waves-effect waves-light btn blue">
                        <i className="material-icons">refresh</i>
                    </a>
                </li>
            </ul>
        );

        const buttonUser = (
            <ul>
                <li>
                    <a href="#" className="waves-effect waves-light btn blue">
                        <i className="material-icons">delete_forever</i>
                    </a>
                </li>
            </ul>
        );

        const buttonSave = (
            <a onClick={this.handleSaveModal} className={(this.state.ready ? 'light-green' : 'grey lighten-1') + " waves-effect waves-light col s12 btn-large"}>SAVE</a>
        );

        const buttonBottom = (
            <div className="box-btn">
                <a onClick={this.handleCreate} className="waves-effect waves-light col s12 blue btn-large">CREATE</a>
                {this.props.onAuthLogged ? buttonSave : ''}
            </div>
        )

        return (
            <div className="box-card">
                <div className="tit-card row">
                    <div className="left">
                        <h2>{this.props.onTitle}</h2>
                    </div>
                    <div className="right">
                        {this.props.isUserCard ? ''/* buttonUser */ : buttonCreate}
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        {this.props.isUserCard ? this.loopUserLotto() : this.loopLotto()}
                        {this.props.isUserCard ? '' : buttonBottom}
                        {this.props.isUserCard ? removeModal : saveModal}
                    </div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    onUserCount: PropTypes.number,
    onUserNumber: PropTypes.array
};

Card.defaultProps = {
    onUserCount: 0
};

export default Card;