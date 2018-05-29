import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './app';
import { About, PostsContainer } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={PostsContainer} />
        <Route path="/about" component={About} />
        <Route path="/posts" component={PostsContainer}/>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  );
}

const NotFound = () => (<h2>404.. This page is not found!</h2>)