import React from 'react';

export default class DeleteForm extends React.Component {
  constructor(props) {
    super(props);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  confirmDelete(event) {
    event.preventDefault();
    const cardId = this.props.cardId;
    const req = {
      method: 'DELETE'
    };
    fetch(`/api/deletecard/${cardId}`, req)
      .then(res => {
        this.props.closeModal();
        location.href = `/#view-cards?deckName=${this.props.deckName}&deckId=${this.props.deckId}`;
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <section className="delete-confirm">
        <h2 className='delete-card-message'>
          Are you sure you want to delete this card?
        </h2>
        <div className="flex jsb">
          <a className='cancel-delete' onClick={this.props.closeModal}>Cancel</a>
          <a className='confirm-delete' onClick={this.confirmDelete}>Continue</a>
        </div>
      </section>
    );
  }
}
