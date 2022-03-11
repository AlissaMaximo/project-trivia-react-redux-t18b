import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderInGame from '../components/HeaderInGame';

class Feedback extends Component {
  createMessageFeedback = () => {
    const { assertions } = this.props;
    console.log(assertions);
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
    return (
      <div>
        <HeaderInGame />
        {this.createMessageFeedback()}
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.user.assertions,
});

export default connect(mapStateToProps)(Feedback);
