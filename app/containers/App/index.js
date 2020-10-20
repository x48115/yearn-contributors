import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useDispatch } from 'react-redux';
import Contributors from 'containers/Contributors/Loadable';
import Commits from 'containers/Commits/Loadable';
import Repos from 'containers/Repos/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import _ from 'lodash';
import GlobalStyle from '../../global-styles';
import { fetchRepos } from './actions';
import saga from './saga';
import reducer from './reducer';

export default function App() {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'saga', saga });
  const dispatch = useDispatch();
  const init = () => {
    dispatch(fetchRepos());
  };
  useEffect(init, []);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Contributors} />
        <Route exact path="/commits" component={Commits} />
        <Route exact path="/repositories" component={Repos} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
