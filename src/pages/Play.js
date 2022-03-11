import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderInGame from '../components/HeaderInGame';
import { addCorrectAnswer, addTokenRequest } from '../redux/actions';

class Play extends Component {
  state = {
    questions: [],
    questionPosition: 0,
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const userToken = localStorage.getItem('token');
    const fetchQuestionsTrivia = await fetch(`https://opentdb.com/api.php?amount=5&token=${userToken}`);
    let questions = await fetchQuestionsTrivia.json();
    if (questions.results.length === 0) {
      await dispatch(addTokenRequest());
      const newUserToken = localStorage.getItem('token');
      const newFetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${newUserToken}`);
      questions = await newFetchQuestions.json();
    }
    this.setState({
      questions: questions.results,
    });
  }

  getAlternatives = () => [...document.getElementsByClassName('alternative')] || []

  resetAlternativesStyle = () => {
    this
      .getAlternatives()
      .forEach((alternative) => { alternative.style = {}; });
  }

   revealAnswers = () => {
     const alternatives = this.getAlternatives();

     if (alternatives) {
       alternatives
         .filter((alternative) => alternative.className.includes('correct'))
         .forEach((alternative) => {
           alternative.style.border = '3px solid rgb(6, 240, 15)';
         });

       alternatives
         .filter((alternative) => alternative.className.includes('wrong'))
         .forEach((alternative) => {
           alternative.style.border = '3px solid rgb(255, 0, 0)';
         });
     }
   }

  componentDidUpdate = () => {
    this.resetAlternativesStyle();
  }

  handleCorrect = () => {
    this.revealAnswers();
    const { dispatch } = this.props;
    dispatch(addCorrectAnswer());
  }

  handleWrong = () => {
    this.revealAnswers();
  }

    handleClickNext = () => {
      const { history } = this.props;
      const { questionPosition } = this.state;
      const maximumLengthAnswer = 4;
      if (questionPosition === maximumLengthAnswer) {
        history.push('/feedback');
      }
    }

  showQuestions = () => {
    const { questions, questionPosition } = this.state;
    const incorrectAnswers = questions[questionPosition].incorrect_answers;
    const allAnswerSorted = incorrectAnswers
      .map((incorrect, i) => (
        <button
          type="button"
          key={ i }
          className="alternative wrong"
          data-testid={ `wrong-answer-${i}` }
          onClick={ this.handleWrong }
        >
          {incorrect}
        </button>
      ));

    allAnswerSorted
      .splice(Math.round(Math.random()
      * incorrectAnswers.length), 0, (
        <button
          key="correct"
          type="button"
          className="alternative correct"
          data-testid="correct-answer"
          onClick={ this.handleCorrect }
        >
          {questions[questionPosition].correct_answer}
        </button>
      ));
    return (
      <div>
        <p data-testid="question-category">{questions[questionPosition].category}</p>
        <p data-testid="question-text">{questions[questionPosition].question}</p>
        <div data-testid="answer-options">
          { allAnswerSorted }
        </div>
        <button
          data-testid="btn-next"
          onClick={ () => {
            this.setState({
              questionPosition: questionPosition + 1,
            });
            this.handleClickNext();
          } }
          type="button"
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <HeaderInGame />
        {questions.length > 0 && this.showQuestions()}
      </div>
    );
  }
}

Play.propTypes = {
  dispatch: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect()(Play);
