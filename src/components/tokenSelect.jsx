import React from "react"
import { DropdownButton, Dropdown, Tabs } from "react-bootstrap"

export default function DropdownCrypto(props) {
  return (
    <section>
      <DropdownButton
        variant="outline-primary"
        id="dropdown-item-button"
        title="Select Token"
      >
        <Dropdown.ItemText>Which Coin Would You Like</Dropdown.ItemText>
        <Dropdown.Item
          onClick={props.changeToken.bind(this, props.Wood)}
          as="button"
        >
          Wood Token
        </Dropdown.Item>
        <Dropdown.Item
          onClick={props.changeToken.bind(this, props.Smit)}
          as="button"
        >
          Smit Token
        </Dropdown.Item>
        <Dropdown.Item onClick={props.changeToken.bind(this, props.CHC)} as="button">
          CHC Token
        </Dropdown.Item>
        <Dropdown.Item onClick={props.changeToken.bind(this, props.Ham)} as="button">
          Ham Token
        </Dropdown.Item>
        <Dropdown.Item
          onClick={props.changeToken.bind(this, props.Slick)}
          as="button"
        >
          Slick Token
        </Dropdown.Item>
      </DropdownButton>
    </section>
  )
}
