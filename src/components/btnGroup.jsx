import React from "react"
import { ButtonGroup, Button } from "react-bootstrap"

export default function BtnGroupCrypto(props) {
  return (
    <section>
      <Button onClick={props.borrow(this)} variant="outline-primary">
        BORROW
      </Button>
      <Button onClick={props.sendAmount(this)} variant="outline-primary">
        RETURN
      </Button>
      <Button onClick={props.balance(this)} variant="outline-primary">
        GET BALANCE
      </Button>
      {/* <Button onClick={props.stateShow(this)} variant="outline-primary">State</Button> */}
    </section>
  )
}
