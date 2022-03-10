import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import { addGravatar, addTokenRequest, loginButton } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  }

  buttonVerify = () => {
    const { email, name } = this.state;
    const minLengthName = 1;
    this.setState({
      isDisabled: true,
    });
    if (this.isEmail(email) && name.length >= minLengthName) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.buttonVerify);
  }

  handleClick = () => {
    const { requestHashEmail, addUserInfo, history, requestToken } = this.props;
    const { email, name } = this.state;
    const emailMd5 = md5(email).toString();
    addUserInfo({ email, name });
    requestHashEmail(emailMd5);
    requestToken();
    // localStorage.setItem('token');
    console.log(this.props);
    history.push('/play');
  }

  isEmail = (email) => String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  handleSettingsBtnClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.handleSettingsBtnClick() }
        >
          Configurações
        </button>
        <form>
          <label htmlFor="input-email">
            E-mail
            <input
              id="input-email"
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="input-name">
            Nome
            <input
              id="input-name"
              type="text"
              data-testid="input-player-name"
              name="name"
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ () => (this.handleClick()) }
          >
            Play
          </button>
        </form>
      </header>
    );
  }
}

Login.propTypes = {
  requestHashEmail: PropTypes.func.isRequired,
  addUserInfo: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  requestToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token.token,
});

const mapDispatchToProps = (dispatch) => ({
  requestHashEmail: (email) => dispatch(addGravatar(email)),
  addUserInfo: (user) => dispatch(loginButton(user)),
  requestToken: () => dispatch(addTokenRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
