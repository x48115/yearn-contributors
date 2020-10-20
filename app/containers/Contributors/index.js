import React from 'react';
import { useSelector } from 'react-redux';
import * as s from 'containers/App/selectors';
import styled from 'styled-components';

const Contributor = styled.a`
  margin: 15px 0px;
`;

const Wrapper = styled.div`
  margin: 50px auto;
  text-align: center;
  display: grid;
  width: 80%;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const UserImage = styled.img`
  width: 140px;
  height: 140px;
  margin: 20px;
  margin-bottom: 0px;
  border-radius: 50%;
`;

const UserName = styled.div`
  font-size: 22px;
  padding: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 160px;
  white-space: nowrap;
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
`;

export default function Contributors() {
  const contributors = useSelector(s.makeSelectContributors());
  const renderContributor = (contributor, idx) => {
    const { login, avatar_url, html_url } = contributor;
    return (
      <Contributor key={idx} href={html_url} target="_blank">
        <Button>
          <UserImage src={avatar_url} />
          <UserName title={login}>{login}</UserName>
        </Button>
      </Contributor>
    );
  };

  const contributorEls = _.map(contributors, renderContributor);

  return <Wrapper>{contributorEls}</Wrapper>;
}
