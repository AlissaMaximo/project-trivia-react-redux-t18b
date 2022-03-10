import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Play from './pages/Play';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ (props) => <Login { ...props } /> } />
      <Route exact path="/play" component={ (props) => <Play { ...props } /> } />
    </div>
  );
}
