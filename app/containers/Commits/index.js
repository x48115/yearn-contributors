import React from 'react';
import { useSelector } from 'react-redux';
import * as s from 'containers/App/selectors';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Commit = styled.tr`
  cursor: pointer;
`;
const Avatar = styled.img`
  height: 40px;
  border-radius: 50%;
`;
const Td = styled.td`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px;
  max-width: 880px;
`;

const Table = styled.table`
  max-width: 80%;
  margin: 0 auto;
  margin-top: 80px;
`;

const Author = styled.div`
  padding-left: 10px;
  font-weight: bold;
  display: inline;
`;

export default function Commits() {
  const commits = useSelector(s.makeSelectCommits());
  const openCommit = url => {
    window.open(url);
  };
  const renderCommit = (commit, idx) => {
    return (
      <Commit key={idx} onClick={() => openCommit(commit.html_url)}>
        <Td>
          <Avatar src={commit.author.avatar_url} />
          <Author>{commit.author.login}</Author>
        </Td>
        <Td>{commit.repoName}</Td>
        <Td />
        <Td>{commit.date}</Td>
        <Td>{commit.message}</Td>
      </Commit>
    );
  };

  const commitEls = _.map(commits, renderCommit);
  return (
    <Wrapper>
      <Table>
        <tbody>{commitEls}</tbody>
      </Table>
    </Wrapper>
  );
}
