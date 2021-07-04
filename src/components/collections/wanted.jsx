import React from "react"
import "./wanted.css"
import { SpaceAroundRow } from "../styled/Dashboard"

const Wanted = () => {
  return (
    <>
      <SpaceAroundRow>
        <div className="wanted">
          <h1>Wanted</h1>
          <h2>Have you seen this address?</h2>

          <img
            src="https://images.pexels.com/photos/7785077/pexels-photo-7785077.jpeg?cs=srgb&dl=pexels-kindel-media-7785077.jpg&fm=jpg"
            alt="Collections"
          />
          <p>
            Description: The description of the loan! CAUTION THIS ADDRESS IS
            DANGEORUS!
          </p>
          <p>If you have any information email ... </p>

          <h1>Reward: ...CBLT</h1>
        </div>
      </SpaceAroundRow>
    </>
  )
}

export default Wanted
