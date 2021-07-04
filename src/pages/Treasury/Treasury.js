import React from "react"
import Logo from "../../icons/MovingLogo.mp4"
import { CobaltCard } from "../../components/styled/Dashboard"
import { Accordion, Card } from "react-bootstrap"

const Treasury = () => {
  return (
    <>
      <div className="cobalt-card">
        <div className="box">
          <h3>Cobalt Treasury</h3>
          <video
            className="treasury-logo-video"
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
          >
            <source src={Logo} type="video/mp4" />
          </video>
          <h2>
            Treasury Balance
            <br />
            <span>Crypto</span>
          </h2>
          <p></p>
        </div>
      </div>
      <div>
        <CobaltCard className="treasury-info" elevation={3}>
          <h3>How is the treasury used?</h3>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Chromium Trades
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm the body</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Staked Assets
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                Leading to the community
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </CobaltCard>
      </div>
    </>
  )
}

export default Treasury
