import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = state => state.app || initialState;

export const makeSelectRepos = () =>
  createSelector(
    selectApp,
    substate => substate.repos,
  );

export const makeSelectStatistics = () =>
  createSelector(
    selectApp,
    substate => substate.statistics,
  );

export const makeSelectContributors = () =>
  createSelector(
    selectApp,
    substate => substate.contributors,
  );

export const makeSelectCommits = () =>
  createSelector(
    selectApp,
    substate => substate.commits,
  );
