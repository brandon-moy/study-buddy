import React from 'react';

export default class NewDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ deckName: '' });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ deckName: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/create-deck', req)
      .then(res => {
        res.json();
        this.setState({ deckName: '' });
        this.props.closeModal();
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <form className="new-deck-form" onSubmit={this.handleSubmit}>
        <a className="xmark-close" onClick={this.props.closeModal}>
          <i className="fa-solid fa-xmark" />
        </a>
        <h1 className="sticky-header">Create New Deck</h1>
        <input value={this.state.deckName} className="sticky-input" onChange={this.handleChange} type="text" placeholder="e.g. HTML, CSS, JavaScript" />
        <button className="sticky-submit">Continue</button>
      </form>
    );
  }
}