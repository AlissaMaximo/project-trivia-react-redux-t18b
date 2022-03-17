import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderInGame from '../components/HeaderInGame';
import Timer from '../components/Timer';
import { addCorrectAnswer, addTokenRequest, addScore } from '../redux/actions';

class Play extends Component {
  state = {
    questions: [],
    questionPosition: 0,
    reveal: false,
  }

  currentTime = 0;

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

  getAlternatives = () => [...document.getElementsByClassName('alternative')];

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
    // this.resetAlternativesStyle();
    const { reveal } = this.state;

    if (reveal) {
      this.revealAnswers();
    } else {
      this.resetAlternativesStyle();
    }
  }

  getDifficultyScore = (difficulty) => {
    const hard = 3;
    const medium = 2;
    const easy = 1;

    switch (difficulty) {
    case 'hard':
      return hard;
    case 'medium':
      return medium;
    case 'easy':
      return easy;
    default:
      return 0;
    }
  }

  calculateScore = (difficulty) => {
    const correctScore = 10;
    const difficultyScore = this.getDifficultyScore(difficulty);

    return correctScore + (this.currentTime * difficultyScore);
  }

  handleCorrect = ({ difficulty }) => {
    const { dispatch } = this.props;
    const score = this.calculateScore(difficulty);

    dispatch(addCorrectAnswer());
    dispatch(addScore(score));
    // this.revealAnswers();
    this.setState({ reveal: true });
  }

  handleWrong = () => {
    // this.revealAnswers();
    this.setState({ reveal: true });
  }

  handleClickNext = () => {
    const { history } = this.props;
    const { questionPosition } = this.state;
    const maximumLengthAnswer = 4;
    if (questionPosition === maximumLengthAnswer) {
      history.push('/feedback');
    }
    this.setState({
      questionPosition: questionPosition + 1,
      reveal: false,
    });
  }

  handleOnChangeTime = (changedTime) => {
    this.currentTime = changedTime;
  }

  showQuestions = () => {
    const { questions, questionPosition, reveal } = this.state;
    const { isTimeOver } = this.props;

    const currentQuestion = questions[questionPosition];
    const incorrectAnswers = currentQuestion.incorrect_answers;
    const correctAnswer = currentQuestion.correct_answer;

    const allAnswersSorted = incorrectAnswers
      .map((incorrect, i) => (
        <button
          type="button"
          key={ i }
          className="alternative wrong"
          data-testid={ `wrong-answer-${i}` }
          disabled={ isTimeOver }
          onClick={ this.handleWrong }
        >
          {incorrect}
        </button>
      ));
    allAnswersSorted
      .splice(Math.round(Math.random()
        * incorrectAnswers.length),
      0,
      (this.correctButton(correctAnswer, currentQuestion)));

    return (
      <div>
        <p data-testid="question-category">{questions[questionPosition].category}</p>
        <p data-testid="question-text">{questions[questionPosition].question}</p>
        <Timer onTimeChange={ this.handleOnChangeTime } />
        <div data-testid="answer-options">
          {allAnswersSorted}
        </div>

        {reveal
          && this.buttonNext()}
      </div>
    );
  }

  correctButton = (correctAnswer, currentQuestion) => {
    const { isTimeOver } = this.props;
    return (
      <button
        key="correct"
        type="button"
        className="alternative correct"
        data-testid="correct-answer"
        disabled={ isTimeOver }
        onClick={ () => this.handleCorrect(currentQuestion) }
      >
        {correctAnswer}
      </button>
    );
  }

  buttonNext = () => (
    <button
      data-testid="btn-next"
      onClick={ this.handleClickNext }
      type="button"
    >
      Next

    </button>
  )

  render = () => {
    const { questions } = this.state;
    return (
      <div>
        <HeaderInGame />
        {questions.length > 0
          && this.showQuestions()}
      </div>

    );
  }
}

Play.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  isTimeOver: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isTimeOver: state.timer.isTimeOver,
});

export default connect(mapStateToProps)(Play);
