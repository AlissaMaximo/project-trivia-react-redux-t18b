import React, { Component } from 'react';

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

  isEmail = (email) => String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  render() {
    const { isDisabled } = this.state;

    return (
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
        <button type="button" data-testid="btn-play" disabled={ isDisabled }>Play</button>
      </form>
    );
  }
}

export default Login;
