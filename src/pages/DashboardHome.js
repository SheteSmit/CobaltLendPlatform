import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { SpaceAroundRow } from '../components/styled/Dashboard';
import { Card, Avatar } from '@material-ui/core';
import {
  AccountBalance,
  Redeem,
  QueryBuilder,
  ThumbUp,
} from '@material-ui/icons';


const BalanceArr = [
  {
    title: 'TREASURY BALANCE',
    balance: '24,000',
    icon: <AccountBalance />,
    color: 'rgb(229, 57, 53)',
  },
  {
    title: 'STAKING REWARDS',
    balance: '2,000',
    icon: <Redeem />,
    color: 'rgb(67, 160, 71)',
  },
  {
    title: 'OUTSTANDING LOANS',
    balance: '5,000',
    icon: <QueryBuilder />,
    color: 'rgb(251, 140, 0)',
  },
  {
    title: 'PENDING PROPOSALS',
    balance: '5,000',
    icon: <ThumbUp />,
    color: 'rgb(57, 73, 171)',
  },
];

export default function DashBoardHome() {

  const [cryptos, setCryptoList] = useState([]);
  const [crypto, setCrypto] = useState('');

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const getCrypto = async () => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    try {
      const res = await axios.get(url)
      setCryptoList(res.data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getCrypto()
  }, [])

  function handleChange(event) {
    setCrypto(event.target.value);
    console.log(crypto)
  }

  return (
    <Container>
      <SpaceAroundRow>
        {BalanceArr.map((item, index) => {
          return <SmallCard {...item} />;
        })}
      </SpaceAroundRow>

      <CobaltContainer>
        <CobaltCard elevation={3}>
          <img
            src="CobaltLogo.jpg"
            style={{ width: '50%', padding: '5%' }}
            alt="cobalt logo"
          />
          <form>
            <label>
              Please add token to your wallet
              <select onChange={handleChange}>
                <option>
                  Please add token to your wallet
                </option>
                {cryptos.map(crypto => {
                  return (<>
                    <option key={crypto.name} value={crypto.name}>
                      <img src={crypto.image} alt={crypto.name} width="40px" />
                      {crypto.name}
                    </option>
                  </>)
                })}
              </select>
            </label>
          </form>
          <h3>CBLT</h3>
          <p>Current Price</p>
          <SpaceAroundRow style={{ width: '100%' }}>
            <span> .5 BTC</span>
            <span> 2 ETH</span>
            <span>100,000 USD</span>
          </SpaceAroundRow>
        </CobaltCard>
      </CobaltContainer>
    </Container>
  );
}

function SmallCard({ title, balance, icon, color }) {
  console.log(color);
  return (
    <StyledCard elevation={3}>
      <Row>
        <Col>
          {title}
          <p>{balance}</p>
        </Col>
        <StyledAvatar inputColor={color}>{icon}</StyledAvatar>
      </Row>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  border-radius: 10px;
  flex-wrap: wrap;
  padding: 1% 2% 0 2%;
  font-size: 14px;
  color: #6b7774 !important;
  font-weight: 600;
  p {
    padding-top: 5%;
    color: black;
    font-size: 18px;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1%;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${(props) => props.inputColor} !important;
`;

const Container = styled.div`
  margin-top: 4%;
`;

const CobaltContainer = styled.div`
  display: flex;
  padding: 3%;
`;

const CobaltCard = styled(Card)`
  h3 {
    color: ${(props) => props.theme.grayText};
  }
  padding: 2%;
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
