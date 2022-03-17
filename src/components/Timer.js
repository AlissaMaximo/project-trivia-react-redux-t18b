import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetTimerFalse, verifyCountdown } from '../redux/actions';

const ONE_SECOND = 1000;

class Timer extends Component {
  state = {
    timer: 30,
  }

  componentDidMount() {
    this.timerID = setInterval(this.showTimer, ONE_SECOND);
  }

  componentDidUpdate() {
    this.clearTimer();
  }

  clearTimer = () => {
    const { resetTimer, dispatch, isTimeOver } = this.props;
    const { timer } = this.state;
    if (timer === 0 && !isTimeOver && !resetTimer) {
      console.log('teste');
      dispatch(verifyCountdown());
      dispatch(resetTimerFalse());
      clearInterval(this.timerID);
    }
    if (resetTimer) {
      clearInterval(this.timerID);
      this.setState({ timer: 30 }, () => {
        this.timerID = setInterval(this.showTimer, ONE_SECOND);
      });
      dispatch(resetTimerFalse());
    }
  }

  showTimer = () => {
    const { timer } = this.state;
    const { onTimeChange } = this.props;
    const changedTime = timer - 1;

    this.setState({ timer: changedTime });
    onTimeChange(changedTime);
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
  isTimeOver: PropTypes.bool.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  resetTimer: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isTimeOver: state.timer.isTimeOver,
  resetTimer: state.timer.resetTimer,
});

export default connect(mapStateToProps, null)(Timer);
