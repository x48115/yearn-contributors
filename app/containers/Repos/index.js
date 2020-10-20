import React from 'react';
import { useSelector } from 'react-redux';
import * as s from 'containers/App/selectors';
import styled from 'styled-components';
import moment from 'moment';

const RepoList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 600px);
  justify-content: center;,
`;

const Repo = styled.table``;

const ItemHeader = styled.td`
  white-space: nowrap;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
`;

const ItemValue = styled.td`
  padding-left: 15px;
  white-space: nowrap;
  font-weight: 100;
  font-size: 18px;
  padding-bottom: 10px;
`;

const Item = styled.tr``;

const RepoWrapper = styled.a`
  padding: 40px;
  margin: 30px;
  border: 1px solid #ccc;
  cursor: pointer;
  color: #000;
  text-decoration: none;
`;

const RepoHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: 40px;
  font-weight: bold;
  > div:last-of-type {
    font-size: 18px;
    color: #777;
    line-height: 25px;
    font-weight: 100;
    max-width: 300px;
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom: 35px;
  }
`;

const Name = styled.div``;

const dateFormat = 'MMMM D YYYY, h:mm:ss a';
export default function Repos() {
  const repos = useSelector(s.makeSelectRepos());
  const renderRepo = (repo, idx) => (
    <RepoWrapper key={idx} href={repo.html_url} target="_blank">
      <RepoHeader>
        <Name>{repo.name}</Name>
        <Name>{repo.description}</Name>
      </RepoHeader>
      <Repo>
        <tbody>
          <Item>
            <ItemHeader>Open Issues</ItemHeader>
            <ItemValue>{repo.open_issues_count}</ItemValue>
          </Item>
          <Item>
            <ItemHeader>Forks</ItemHeader>
            <ItemValue>{repo.forks_count}</ItemValue>
          </Item>
          <Item>
            <ItemHeader>Watchers</ItemHeader>
            <ItemValue>{repo.watchers_count}</ItemValue>
          </Item>
          <Item>
            <ItemHeader>Last Pushed</ItemHeader>
            <ItemValue>{moment(repo.pushed_at).format(dateFormat)}</ItemValue>
          </Item>
          <Item>
            <ItemHeader>Last Updated</ItemHeader>
            <ItemValue>{moment(repo.updated_at).format(dateFormat)}</ItemValue>
          </Item>
          <Item>
            <ItemHeader>Created</ItemHeader>
            <ItemValue>{moment(repo.created_at).format(dateFormat)}</ItemValue>
          </Item>
        </tbody>
      </Repo>
    </RepoWrapper>
  );
  const repoEls = _.map(repos, renderRepo);
  return <RepoList>{repoEls}</RepoList>;
}
