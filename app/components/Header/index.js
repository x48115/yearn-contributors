import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as s from 'containers/App/selectors';

const Wrapper = styled.div`
  display: flex;
  max-width: 70%;
  flex-direction: column;
  margin: 0 auto;
`;

const Statistics = styled.div`
  display: flex;
  align-self: center;
`;

const Statistic = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 260px;
  padding-top: 15px;
  color: #000;
  text-decoration: none;
  > div {
    opacity: 0.3;
  }
  &.active {
    > div {
      opacity: 1;
    }
  }
`;

const StatisticHeader = styled.div`
  font-size: 24px;
  color: #000;
`;

const StatisticValue = styled.div`
  font-size: 76px;
`;

const Roboto = styled.div`
  font-size: 154px;
  margin-bottom: 10px;
  text-align: center;
  color: #2666c9;
`;

export default function Header() {
  const statistics = useSelector(s.makeSelectStatistics());
  return (
    <Wrapper>
      <Roboto>yearn.finance</Roboto>
      <Statistics>
        <Statistic to="/repositories" activeClassName="active">
          <StatisticHeader>Repositories</StatisticHeader>
          <StatisticValue>{statistics.repoCount}</StatisticValue>
        </Statistic>
        <Statistic to="/" exact activeClassName="active">
          <StatisticHeader>Contributors</StatisticHeader>
          <StatisticValue>{statistics.contributorCount}</StatisticValue>
        </Statistic>
        <Statistic to="/commits" activeClassName="active">
          <StatisticHeader>Commits</StatisticHeader>
          <StatisticValue>{statistics.commitCount}</StatisticValue>
        </Statistic>
      </Statistics>
    </Wrapper>
  );
}
