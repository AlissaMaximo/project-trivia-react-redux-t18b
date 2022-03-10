import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderInGame extends Component {
  render() {
    const { name, hashEmail } = this.props;
    return (
      <>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt={ name } />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">0</span>
      </>
    );
  }
}

HeaderInGame.propTypes = {
  name: PropTypes.string.isRequired,
  hashEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  hashEmail: state.user.hashEmail,
});

export default connect(mapStateToProps)(HeaderInGame);
