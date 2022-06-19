import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainDashboard from './components/MainDashboard';
import { Provider } from 'react-redux';
import store from './store/index';
import './components/style/App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path={`/Index`} component={MainDashboard}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
