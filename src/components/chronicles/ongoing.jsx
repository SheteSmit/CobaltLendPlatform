import React from "react"
import { SpaceAroundRow, CobaltCard } from "../styled/Dashboard"
import "./chronicles.css"

const OngoingLoans = () => {
  return (
    <>
      <SpaceAroundRow className="chronicles-card">
        <CobaltCard>
          <div className="paid-chronicles">
            <h3>Ongoing Loan</h3>
            <ul>
              <li>address</li>
              <li>loan amount</li>
              <li>loan status</li>
              <li>date paid</li>
            </ul>
          </div>
        </CobaltCard>
      </SpaceAroundRow>
    </>
  )
}

export default OngoingLoans
