import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyCountdown } from '../redux/actions';

const ONE_SECOND = 1000;

class Timer extends Component {
  state = {
    timer: 30,
    timerID: 0,
  }

  componentDidMount() {
    const timerID = setInterval(this.showTimer, ONE_SECOND);
    this.setState({ timerID });
  }

  showTimer = () => {
    const { timer, timerID } = this.state;
    const { dispatch, onTimeChange } = this.props;

    const changedTime = timer - 1;

    this.setState({ timer: changedTime });
    onTimeChange(changedTime);

    if (timer === 1) {
      clearInterval(timerID);
      dispatch(verifyCountdown());
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <h2>{ timer }</h2>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
};

export default connect()(Timer);
