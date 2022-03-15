import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderInGame from '../components/HeaderInGame';

class Feedback extends Component {
  createMessageFeedback = () => {
    const { assertions } = this.props;
    const acceptableHitNumber = 3;
    if (assertions < acceptableHitNumber) {
      return (
        <p data-testid="feedback-text">Could be better...</p>
      );
    }
    if (assertions >= acceptableHitNumber) {
      return (
        <p data-testid="feedback-text">Well Done!</p>
      );
    }
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <HeaderInGame />
        {this.createMessageFeedback()}
        <p data-testid="feedback-total-score">
          {
            score || '0'
          }

        </p>
        <p data-testid="feedback-total-question">
          {
            assertions || '0'
          }
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
