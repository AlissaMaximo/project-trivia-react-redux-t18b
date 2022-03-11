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

  handleClickCorrectAnswer = ({ target }) => {
    console.log(target);
    const { dispatch } = this.props;
    dispatch(addCorrectAnswer());
  }

  handleClickWrongAnswer = ({ target }) => {
    console.log(target);
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
          value="wrong"
          onClick={ this.handleClickWrongAnswer }
          type="button"
          key={ i }
          data-testid={ `wrong-answer-${i}` }
          disabled={ false }
        >
          {incorrect}
        </button>
      ));
    allAnswerSorted
      .splice(Math.round(Math.random()
      * incorrectAnswers.length), 0, (
        <button
          value="correct"
          key="correct"
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClickCorrectAnswer }
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
