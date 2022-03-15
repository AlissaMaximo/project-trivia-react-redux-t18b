import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderInGame extends Component {
  showScore = () => {
    const score = JSON.parse(localStorage.getItem('player'));
    console.log(localStorage);
    return score.score;
  }

  render() {
    const { name, hashEmail } = this.props;
    return (
      <>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt={ name } />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">
          {
            localStorage.player
              ? this.showScore()
              : '0'
          }
        </span>
      </>
    );
  }
}

HeaderInGame.propTypes = {
  name: PropTypes.string.isRequired,
  hashEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  hashEmail: state.player.hashEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(HeaderInGame);
