import React from "react"
import { SpaceAroundRow, StyledCard } from "../styled/Dashboard"
import "./tiers.css"

const Tiers = () => {
  return (
    <>
      <SpaceAroundRow>
        <SpaceAroundRow>
          <StyledCard className="tier-group" elevation={3}>
            <h3>Tier System for Loans</h3>
            <ul className="tiers">
              <li>Tier 1 100.00 USD - 10,000.00 USD</li>
              <li>Tier 2 10,001.00 USD - 50,000.00 USD</li>
              <li>Tier 3 50,001.00 USD - 100,000.00 USD</li>
              <li>Tier 4 100,001.00 USD - 250,000.00 USD</li>
              <li>Tier 5 250,001.00 USD - 1 Million USD</li>
              <li>Tier 6 1,000,001.00 USD - 5 Million USD</li>
              <li>Tier 7 7,500,001.00 USD +</li>
            </ul>
          </StyledCard>
        </SpaceAroundRow>
        <SpaceAroundRow>
          <StyledCard className="tier-group nowrap" elevation={3}>
            <h3>Voting on a Loan Proposal</h3>
            <p>
              Minimum Number of Votes needed for each loan propsal - 21
              <br />
              <br />
              Maximum Number of Votes needed for each loan propsal - 100
              <br />
              <br />
              If the loan proposal does not get 21 votes needed for determination, it
              will be reset for 1 week (7 Days) <br />
              <br />
              If the loan propsal does not get the minimum number of votes for a
              second time, the proposal will be terminated and any collateral
              returned to potential borrower minus any fees.
            </p>
          </StyledCard>
        </SpaceAroundRow>
      </SpaceAroundRow>
      <StyledCard className="tier-group nowrap" elevation={3}>
        <h3>Voting Tier System for Loans</h3>
        <ul className="tiers">
          <li>Tier 1 100 Allowed Voters</li>
          <li>Tier 2 200 Allowed Voters</li>
          <li>Tier 3 400 Allowed Voters</li>
          <li>Tier 4 800 Allowed Voters</li>
          <li>Tier 5 1600 Allowed Voters</li>
          <li>Tier 6 3200 Allowed Voters</li>
          <li>Tier 7 6400 Allowed Voters</li>
        </ul>
      </StyledCard>
    </>
  )
}

export default Tiers
