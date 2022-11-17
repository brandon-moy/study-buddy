import React from 'react';
import Home from './pages/home';
import jwtDecode from 'jwt-decode';
import AddCard from './pages/addcard';
import Decks from './components/decks';
import EditCard from './pages/editcard';
import NotFound from './pages/notfound';
import Header from './components/header';
import ViewCards from './pages/viewcards';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import NewDeck from './components/newdeck';
import StudyCards from './pages/studycards';
import AuthForm from './components/auth-form';
import CardStudy from './components/cardstudy';
import DeleteForm from './components/deletecard';
import DeleteDeck from './components/deletedeck';
import ResetKnowledge from './components/resetknowledge';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    });
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('user-token', token);
    this.setState({ user, token });
    location.href = '#';
  }

  handleSignOut() {
    window.localStorage.removeItem('user-token');
    this.setState({ user: null });
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('user-token');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  renderPage() {
    const { path } = this.state.route;
    const pages = ['', 'add-card', 'view-cards', 'edit-card', 'study-cards'];
    if (pages.includes(path)) {
      return <Home path={path} route={this.state.route} />;
    } else if (path === 'sign-in' || path === 'sign-up') {
      return <AuthForm action={path} handleSignIn={this.handleSignIn} />;
    } else {
      return <NotFound />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const contextValue = { user, route };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Header signOut={this.handleSignOut} />
          { this.renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;
Home.contextType = AppContext;
Decks.contextType = AppContext;
Header.contextType = AppContext;
Header.contextType = AppContext;
AddCard.contextType = AppContext;
NewDeck.contextType = AppContext;
AuthForm.contextType = AppContext;
NotFound.contextType = AppContext;
EditCard.contextType = AppContext;
ViewCards.contextType = AppContext;
CardStudy.contextType = AppContext;
StudyCards.contextType = AppContext;
DeleteForm.contextType = AppContext;
DeleteDeck.contextType = AppContext;
ResetKnowledge.contextType = AppContext;
