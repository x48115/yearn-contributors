import * as r from 'redux-saga/effects';
import * as a from './actions';
import * as c from './constants';
import * as s from './selectors';

export function* fetchRepos() {
  const reposUrl = 'https://api.yearn.tools/yearn/repos';
  const statisticsUrl = 'https://api.yearn.tools/yearn/repos/statistics';
  const statistics = yield fetch(statisticsUrl).then(res => res.json());
  yield r.put(a.statisticsLoaded(statistics));
  const repos = yield fetch(reposUrl).then(res => res.json());
  yield r.put(a.reposLoaded(repos));
}

function* fetchCommitsForRepo(commitsUrl) {
  const commits = yield fetch(commitsUrl).then(res => res.json());
  return commits;
}

function* addCommits(repo) {
  let { commits_url: commitsUrl } = repo;
  commitsUrl = `${commitsUrl.substring(0, commitsUrl.length - 6)}?per_page=100`;
  const commitsForRepo = yield fetchCommitsForRepo(commitsUrl);
  return commitsForRepo;
}

export function* fetchCommitsForRepos() {
  const repos = yield r.select(s.makeSelectRepos());
  const commits = [];
  const repoSample = _.take(repos, 15);
  for (const repo of repoSample) {
    const commitsForRepo = yield addCommits(repo);
    const injectRepoName = commit => {
      const newCommit = commit;
      newCommit.repoName = repo.name;
      return newCommit;
    };
    const commitsForRepoWithInjectedRepoName = _.map(
      commitsForRepo,
      injectRepoName,
    );
    commits.push(...commitsForRepoWithInjectedRepoName);
  }
  const mapCommit = commit => {
    const newCommit = {
      ...commit.commit,
      author: commit.author,
      date: commit.commit.committer.date,
      html_url: commit.html_url,
      repoName: commit.repoName,
    };
    return newCommit;
  };

  const mappedCommits = _.map(commits, mapCommit);
  const orderedCommits = _.orderBy(mappedCommits, 'date', 'desc');
  yield r.put(a.commitsLoaded(orderedCommits));
}

export default function* initialize() {
  yield r.takeLatest(c.FETCH_REPOS, fetchRepos);
  yield r.takeLatest(c.REPOS_LOADED, fetchCommitsForRepos);
}
