import React from 'react';
import AppContext from '../lib/app-context';

export default class CardStudy extends React.Component {
  constructor(props) {
    super(props);
    const cards = this.props.cards;
    this.state = ({
      cards,
      position: 0,
      reveal: 'question'
    });
    this.startFlip = this.startFlip.bind(this);
    this.finishFlip = this.finishFlip.bind(this);
    this.updateConfidence = this.updateConfidence.bind(this);
  }

  startFlip(event) {
    const reveal = this.state.reveal === 'question' ? 'half-a' : 'half-q';
    this.setState({ reveal });
  }

  finishFlip(event) {
    if (this.state.reveal === 'half-a') {
      this.setState({ reveal: 'answer' });
    } else if (this.state.reveal === 'half-q') {
      const length = this.state.cards.length;
      const position = this.state.position + 1;
      if (position === length) {
        location.href = `/#view-cards?deckId=${this.props.deckId}`;
      } else {
        this.setState({
          reveal: 'question',
          position
        });
      }
    }
  }

  async updateConfidence(event) {
    try {
      const { token } = this.context;
      const confidence = { confidence: event.target.getAttribute('id') };
      const { cardId } = this.state.cards[this.state.position];
      const req = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        },
        body: JSON.stringify(confidence)
      };
      const response = await fetch(`/api/card/confidence/${cardId}`, req);
      if (response.ok) {
        this.startFlip();
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const face = this.state.reveal;
    const card = this.state.cards[this.state.position];
    const questionPlace = `${this.state.position + 1} / ${this.state.cards.length}`;
    return (
      <>
        <h2 className='question-number'>
          Q : {questionPlace}
        </h2>
        <div className='study-scene'>
          <div
        className={`study-card-set flex wrap just-center col-100 ${face}`}
        onTransitionEnd={this.finishFlip}>
            <div
          className='study-card-front flex-column'
          onClick={this.startFlip}>
              <div className={`highlight confidence-${card.confidence}`} />
              <h1 className='view-card-question'>
                {card.question}
              </h1>
            </div>
            <div className='study-card-back'>
              <div className='flash-card-repeating-blue flex just-center'>
                <h2 className='view-card-answer'>
                  {card.answer}
                </h2>
              </div>
              <div className='button-container flex just-even col-100'>
                <button
              id='1'
              type='button'
              className='confidence'
              onClick={this.updateConfidence}>
                  1
                </button>
                <button
                id='2'
                type='button'
                className='confidence'
                onClick={this.updateConfidence}>
                  2
                </button>
                <button
                id='3'
                type='button'
                className='confidence'
                onClick={this.updateConfidence}>
                  3
                </button>
                <button
                id='4'
                type='button'
                className='confidence'
                onClick={this.updateConfidence}>
                  4
                </button>
                <button
                id='5'
                type='button'
                className='confidence'
                onClick={this.updateConfidence}>
                  5
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

CardStudy.contextType = AppContext;
