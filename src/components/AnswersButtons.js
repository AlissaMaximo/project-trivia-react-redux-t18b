// import React, { Component } from 'react';

// class AnswersButtons extends Component {
//   showButtons = (questions, questionPosition, isTimeOver, handleWrong, handleCorrect, handleClickNext) => {
//     const currentQuestion = questions[questionPosition];
//     const incorrectAnswers = currentQuestion.incorrect_answers;
//     const correctAnswer = currentQuestion.correct_answer;

//     const allAnswersSorted = incorrectAnswers
//       .map((incorrect, i) => (
//         <button
//           type="button"
//           key={ i }
//           className="alternative wrong"
//           data-testid={ `wrong-answer-${i}` }
//           disabled={ isTimeOver }
//           onClick={ handleWrong }
//         >
//           {incorrect}
//         </button>
//       ));
//     allAnswersSorted
//       .splice(Math.round(Math.random()
//         * incorrectAnswers.length), 0, (
//           <button
//           key="correct"
//           type="button"
//           className="alternative correct"
//           data-testid="correct-answer"
//           disabled={ isTimeOver }
//           onClick={ () => handleCorrect(currentQuestion) }
//         >
//           {correctAnswer}
//         </button>
//       ));

//     return (
//       <div>
//         <button
//           data-testid="btn-next"
//           onClick={ handleClickNext }
//           type="button"
//         >
//           Next
//         </button>
//       </div>
//     );
//   };

//   render() {
//     const { questions, questionPosition, isTimeOver } = this.props;

//     return (
//       <div>
//         {this.showButtons()}
//       </div>
//     );
//   }
// }

// export default AnswersButtons;
