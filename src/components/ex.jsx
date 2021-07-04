import React, { useState } from "react"
import Gear from "../icons/settings.svg"
import Arrow from "../icons/arrow-down.svg"
import Down from "../icons/chevron-down.svg"
import CHC from "../abis/CHCToken.json"
import Wood from "../abis/WoodToken.json"
import Smit from "../abis/SmitCoin.json"
import Slick from "../abis/Token.json"
// +
import { useForm } from "react-hook-form"
import Chromium from "../abis/Chromium.json"
import Web3 from "web3"

function Swap(props) {
  const { register, handleSubmit } = useForm()
  async function submit(data) {
    console.log(data)
    const web3 = new Web3(window.ethereum)
    const networkId = await web3.eth.net.getId()
    web3.eth.defaultAccount = props.account
    const token = new web3.eth.Contract(
      Chromium.abi,
      Chromium.networks[networkId].address
    )

    const coin1 = await getToken(data.coin1)
    let coin2 = await getToken(data.coin2)
    const coin1Address = coin1.networks[networkId].address
    const coin2Address = coin2.networks[networkId].address
    let x = await token.methods
      .getExpectedReturn(coin1Address, coin2Address, parseInt(data.amount), 10, 0)
      .send({ from: props.account })
      .then((x) => console.log(x))
    console.log(x)
  }
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {/* <div className="cardtitle ml-4 mt-2 mb-3 mr-4">
          <h5>Swap</h5>
          <img alt="gear" src={Gear} />
        </div>
        <div className="swapfrom  ml-4 mr-4">
          <div className="m-atuo">
            <p>From</p>
            <input
              className="form-input"
              type="number"
              placeholder="0.0"
              {...register('amount')}
            />
          </div>
          <div>
            <div className="balancediv pb-2">
              <p>Balance</p>
              <div className="form-input balance pl-2 ">
                {(props.balance / 1000000000000000000).toString()}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <select {...register('coin1')}>
                <option value="ETH">ETH</option>
                <option value="CHC">CHC</option>
                <option value="Wood">Wood</option>
                <option value="Slick">Slick</option>
              </select>
            </div>
          </div>
        </div>

        <img className="downarrow" src={Arrow} alt="arrow" />
        <div className="swapto ml-4 mr-4">
          <div>
            <p>To</p>
            <input
              disabled
              className="form-input"
              type="number"
              placeholder="0.0"></input>
          </div>
          <div>
            <select {...register('coin2')}>
              <option value="ETH">ETH</option>
              <option value="CHC">CHC</option>
              <option value="Wood">Wood</option>
              <option value="Slick">Slick</option>
            </select>
          </div>
        </div>
        <div className="swapbtn">
          <input type="submit" />
        </div> */}
      </form>
    </>
  )
}

export default Swap

async function getToken(str) {
  switch (str) {
    case "CHC":
      return CHC
    case "Wood":
      return Wood
    case "Slick":
      return Slick
  }
}
