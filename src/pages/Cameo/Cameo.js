import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import Posting from "../../components/cameo/posting"
import "./Cameo.css"

const Cameo = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col mx="auto" mb={4} lg={10}>
            <div className="section-title text-center ">
              <h3 className="cameo-title">Catalyst</h3>
              <p className="cameo-info">
                List your services here in exchange for crypto.{" "}
              </p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col lg={10}>
            <div className="career-search mb-60">
              <form className="career-form mb-60">
                <Row>
                  <Col md={6} lg={3}>
                    <div className="input-group position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Keywords"
                        id="keywords"
                      />
                    </div>
                  </Col>
                  <Col md={6} lg={3} my={3}>
                    <div className="input-group position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                      />
                    </div>
                  </Col>
                  <Col md={6} lg={3} my={3}>
                    <div className="input-group position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Job Type"
                      />
                    </div>
                  </Col>
                  <Col md={6} lg={3} my={3}>
                    <Button variant="light" block="true" size="lg">
                      Search
                    </Button>
                  </Col>
                </Row>
              </form>
              <p className="mb-30 ff-montserrat">Total Job Openings : 89</p>
              <Posting />
              <Posting />
              <Posting />
              <Posting />
              <Posting />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Cameo
