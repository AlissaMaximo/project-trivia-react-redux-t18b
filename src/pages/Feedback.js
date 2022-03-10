import React, { Component } from 'react';
import HeaderInGame from '../components/HeaderInGame';

class FeedBack extends Component {
  createMessageFeedback = () => {
    // aqui é necessário recuperar as informações de acertos que vem do localstorage
    const acceptableHitNumber = 3;
    const rightAnswers = localStorage.getItem('rightAnswers');
    const rightAnswersLength = rightAnswers.length;
    if (rightAnswersLength < acceptableHitNumber) {
      return (
        <p data-testid="feedback-text">Could be better...</p>
      );
    }
    if (rightAnswersLength >= acceptableHitNumber) {
      return (
        <p data-testid="feedback-text">Well Done!</p>
      );
    }
  }

  render() {
    return (
      <div>
        <HeaderInGame />
        {this.createMessageFeedback}
      </div>
    );
  }
}

export default FeedBack;
