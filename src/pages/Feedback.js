import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

  handleClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
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
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClickPlayAgain }
        >
          Play Again
        </button>
        <Link to="/ranking">
          <button data-testid="btn-ranking" type="button">Ranking</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
