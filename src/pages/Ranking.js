import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  handleClickGoHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <header>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          onClick={ this.handleClickGoHome }
          type="button"
          data-testid="btn-go-home"
        >
          Go Home
        </button>
      </header>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ranking;
