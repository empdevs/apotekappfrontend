import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainDashboard from './components/MainDashboard';
import './components/style/App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={`/Index`} component={MainDashboard}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
