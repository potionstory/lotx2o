import React from "react";
import { Aside, Main } from "containers";
import { connect } from "react-redux";
import { headerHomeOff } from "actions/header";
import { lottoListRequest } from "actions/lottoList";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingState: false
    };

    this.loadNewLotto = this.loadNewLotto.bind(this);
    this.loadOldLotto = this.loadOldLotto.bind(this);
  }

  componentDidMount() {
    this.props.handleHeaderHomeOff();
    $(".button-aside").sideNav();
    $(".dropdown-button").dropdown();

    // const loadLottoLoop = () => {
    //     this.loadNewLotto().then(
    //         () => {
    //             this.lottoLoaderTimeoutId = setTimeout(loadLottoLoop, 20000);
    //         }
    //     );
    // }

    this.props.lottoListRequest(true).then(() => {
      //loadLottoLoop(); 새로운 로또번호 루프 임시로 막음
      return this.props.lottoListRequest(true);
    });

    $(".list-side .list-inner").scroll(() => {
      if (
        $(".list-side ul").height() -
          $(".list-side .list-inner").height() -
          $(".list-side .list-inner").scrollTop() <
        50
      ) {
        if (!this.state.loadingState) {
          this.loadOldLotto();
          this.setState({
            loadingState: true
          });
        }
      } else {
        if (this.state.loadingState) {
          this.setState({
            loadingState: false
          });
        }
      }
    });
  }

  loadNewLotto() {
    if (this.props.listStatus === "WAITING")
      return new Promise((resolve, reject) => {
        resolve();
      });

    if (this.props.lottoList.length === 0)
      return this.props.lottoListRequest(true);

    return this.props.lottoListRequest(
      false,
      "new",
      this.props.lottoList[0]._id
    );
  }

  loadOldLotto() {
    if (this.props.isLast) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }

    let lastId = this.props.lottoList[this.props.lottoList.length - 1]._id;

    return this.props.lottoListRequest(false, "old", lastId).then(() => {
      if (this.props.isLast) {
        Materialize.toast("You are loading the last lotto number", 2000);
      }
    });
  }

  render() {
    return (
      <div>
        <Aside onList={this.props.lottoList} />
        <Main />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lottoList: state.lottoList.list.data,
    listStatus: state.lottoList.list.status,
    isLast: state.lottoList.list.isLast
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleHeaderHomeOff: () => dispatch(headerHomeOff()),
    lottoListRequest: (isInitial, listType, id, username) => {
      return dispatch(lottoListRequest(isInitial, listType, id, username));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
