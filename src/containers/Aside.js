import React from 'react';
import { AsideLottoNo } from 'components';
import update from 'react-addons-update';
import PropTypes from 'prop-types';

class Aside extends React.Component {

    constructor(props){
        super(props);

        this.handleList = this.handleList.bind(this);
    }

    

    handleList() {
        return (
            <ul>
                {this.props.onList.map((n, i) => {
                    return (
                        <AsideLottoNo key={i} onNumber={n.number} onUser={n.username.username}/>
                    );
                })}
            </ul>
        );
    }
    
    render () {
        return (
            <aside className="aside">
                <div id="slide-out" className="side-nav collection">
                    <strong className="blue">LIST</strong>
                    <div className="list-side">
                        <div className="list-inner">
                            {this.handleList()}
                        </div>
                    </div>
                </div>
                <a data-activates="slide-out" className="btn-floating btn-large button-aside waves-light waves-effect blue pulse"><i className="medium material-icons">dns</i></a>
            </aside>
        );
    }
}

export default Aside;
