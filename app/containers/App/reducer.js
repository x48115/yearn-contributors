import produce from 'immer';
import * as c from './constants';
export const initialState = {
  statistics: {},
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case c.COMMITS_LOADED: {
        draft.commits = action.commits;
        break;
      }
      case c.STATISTICS_LOADED: {
        draft.statistics = action.statistics;
        break;
      }
      case c.REPOS_LOADED: {
        draft.repos = action.repos;
        const contributorMap = {};
        const contributorEntries = _.union(
          ..._.map(action.repos, repo => repo.contributors),
        );
        const updateContributor = contributor => {
          const { login } = contributor;
          let { contributions = 0 } = contributor;
          const foundContributor = contributorMap[login];
          if (foundContributor) {
            const { contributions: previousContributions } = foundContributor;
            contributions += previousContributions;
            contributor.contributions = contributions;
          }
          contributorMap[login] = contributor;
        };

        _.each(contributorEntries, updateContributor);

        const contributors = _.map(contributorMap);
        draft.contributors = contributors;
        break;
      }
    }
  });

export default appReducer;
