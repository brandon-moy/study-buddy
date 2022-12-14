import React from 'react';
import AppContext from '../../lib/app-context';

export default class NewDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      deckName: '',
      error: null
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ deckName: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { token } = this.context;
    const deckName = this.state.deckName;
    if (!deckName.length) {
      this.setState({ error: 'Deck name is a required field!' });
    } else if (deckName.length > 20) {
      this.setState({ error: 'Sorry, that deck name is too long!' });
    } else {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        },
        body: JSON.stringify(this.state)
      };
      fetch('/api/create-deck', req)
        .then(res => {
          res.json();
          this.props.submitDeck();
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const errorClass = this.state.error ? 'new-deck-error' : 'hidden';
    const { error } = this.state;
    return (
      <form className='new-deck-form' onSubmit={this.handleSubmit}>
        <button
        type='button'
        className='xmark-close'
        onClick={this.props.closeModal}>
          <i className='fa-solid fa-xmark' />
        </button>
        <h1 className='sticky-header'>
          Create New Deck
        </h1>
        <input
        value={this.state.deckName}
        className='sticky-input'
        onChange={this.handleChange}
        type='text'
        placeholder='e.g. HTML, CSS, JavaScript' />
        <p className={errorClass}>
          {error}
        </p>
        <button className='sticky-submit'>
          Continue
        </button>
      </form>
    );
  }
}

NewDeck.contextType = AppContext;
