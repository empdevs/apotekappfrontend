import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MainDashboard from './components/MainDashboard';
import './components/style/App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={`/`}>
          <Redirect to={`/Index`} />
        </Route>
        <Route path={`/Index`} component={MainDashboard}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
