import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import {
  SpaceAroundRow,
  StyledCard,
  CobaltContainer,
  StyledCardHeightFit,
  Row,
  Col,
  StyledAvatar,
  Container,
  CobaltCard,
} from "../components/styled/Dashboard"
import { AccountBalance, Redeem, QueryBuilder, ThumbUp } from "@material-ui/icons"
import Activity from "../components/activity"
import Wallet from "../components/wallet"

const BalanceArr = [
  {
    title: "TREASURY BALANCE",
    balance: "24,000",
    icon: <AccountBalance />,
    color: "rgb(229, 57, 53)",
  },
  {
    title: "STAKING REWARDS",
    balance: "2,000",
    icon: <Redeem />,
    color: "rgb(67, 160, 71)",
  },
  {
    title: "OUTSTANDING LOANS",
    balance: "5,000",
    icon: <QueryBuilder />,
    color: "rgb(251, 140, 0)",
  },
  {
    title: "PENDING PROPOSALS",
    balance: "5,000",
    icon: <ThumbUp />,
    color: "rgb(57, 73, 171)",
  },
]

export default function DashBoardHome() {
  const [cryptos, setCryptoList] = useState([])
  const [crypto, setCrypto] = useState("")

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const getCrypto = async () => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    try {
      const res = await axios.get(url)
      setCryptoList(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getCrypto()
  }, [])

  function handleChange(event) {
    setCrypto(event.target.value)
    console.log(crypto)
  }

    

  return (
    <Container>
      {/* <SpaceAroundRow>
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
        <CobaltCard elevation={3} className="ml-5">
        <Activity />
        </CobaltCard>
        <SpaceAroundRow className="ml-5">
          <Col>
          <StyledCardHeightFit className="mb-5" elevation={3}>
          <Row>
        <Col>
        <Wallet/>   
        </Col>
        </Row>
        </StyledCardHeightFit>
        <StyledCardHeightFit className="mb-5" elevation={3}>
          <Row>
        <Col>
        <Wallet/>   
        </Col>
        </Row>
        </StyledCardHeightFit>
        <StyledCardHeightFit className="mb-5" elevation={3}>
          <Row>
        <Col>
        <Wallet/>   
        </Col>
        </Row>
          </StyledCardHeightFit>
          </Col>
        </SpaceAroundRow>
      </CobaltContainer> */}
    </Container>
  )
}

function SmallCard({ title, balance, icon, color }) {
  console.log(color)
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
  )
}
