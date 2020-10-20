import * as c from './constants';

export function fetchRepos() {
  return {
    type: c.FETCH_REPOS,
  };
}

export function reposLoaded(repos) {
  return {
    type: c.REPOS_LOADED,
    repos,
  };
}

export function statisticsLoaded(statistics) {
  return {
    type: c.STATISTICS_LOADED,
    statistics,
  };
}

export function commitsLoaded(commits) {
  return {
    type: c.COMMITS_LOADED,
    commits,
  };
}
