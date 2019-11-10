import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Contact from './pages/Contact';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/styles.scss';

function App() {
  return (
    <Router>
      <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
