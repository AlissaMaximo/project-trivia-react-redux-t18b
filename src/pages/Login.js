import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import { addGravatar, loginButton } from '../redux/actions';

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
    const { requestHashEmail, addUserInfo, history } = this.props;
    console.log(this.props);
    const { email, name } = this.state;
    const emailMd5 = md5(email).toString();
    addUserInfo({ email, name });
    requestHashEmail(emailMd5);
    history.push('/play');
  }

  isEmail = (email) => String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  render() {
    const { isDisabled } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
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
};

const mapDispatchToProps = (dispatch) => ({
  requestHashEmail: (email) => dispatch(addGravatar(email)),
  addUserInfo: (user) => dispatch(loginButton(user)),
});

export default connect(null, mapDispatchToProps)(Login);
