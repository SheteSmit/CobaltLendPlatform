import React from "react"
import { SpaceAroundRow, StyledCard } from "../styled/Dashboard"
import "./nftScoring.css"

const NFTScoring = () => {
  return (
    <>
      <SpaceAroundRow>
        <SpaceAroundRow>
          <StyledCard className="nft-group" elevation={3}>
            <h3>Loan Scoring System</h3>
            <ul className="nftscoring">
              <li>How many times per month</li>
              <li>The age of your wallet</li>
              <li>Total amount of transactions</li>
            </ul>
          </StyledCard>
        </SpaceAroundRow>
        <SpaceAroundRow>
          <StyledCard className="nft-group" elevation={3}>
            <h3>Loan Scoring Ratings</h3>
            <ul className="nftscoring">
              <li>1 - Bad</li>
              <li>3.5 - Avergae</li>
              <li>7 - Exceptional</li>
            </ul>
          </StyledCard>
        </SpaceAroundRow>
      </SpaceAroundRow>
    </>
  )
}

export default NFTScoring
