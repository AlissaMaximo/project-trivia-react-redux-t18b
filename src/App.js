import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Play from './pages/Play';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ (props) => <Login { ...props } /> } />
      <Route exact path="/play" component={ (props) => <Play { ...props } /> } />
      <Route exact path="/settings" component={ (props) => <Settings { ...props } /> } />
      <Route exact path="/feedback" component={ (props) => <Feedback { ...props } /> } />
      <Route exact path="/ranking" component={ (props) => <Ranking { ...props } /> } />
    </div>
  );
}
