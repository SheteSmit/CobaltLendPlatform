import React, { useState } from "react"
import "./homepage.css"
import NavBar from "../../components/NavBar"
import { Alert } from "react-bootstrap"
import Tour from "reactour"
import Swap from "../../components/oldswap"
import Loading from "../Loading/Loading"
import Web3 from "web3"

const Home = (props) => {
  const [title, setTitle] = useState("cblt")
  const [cobalt, setCblt] = useState(0)

  const accentColor = "#49bcf8"
  const tourConfig = [
    {
      selector: ".metaacct",
      content: `This is your Meta Mask Account you are currently using. Please make sure you verify your account before making transaction.`,
    },
    {
      selector: ".form-field",
      content: `Enter the amount you would like to borrow, repay on a loan, make a deposit, widthdraw or donate.`,
    },
    {
      selector: "#cusSelectbox",
      content: `Find the token you want to handle here. Keep in mind once you select the button the transaction will begin.`,
    },
    {
      selector: ".walletActions",
      content:
        "Here is where the action is. You can borrow from the liquidity pool, repay a loan, deposit to the liquidity pool, withdraw your funds, or donate to Colbalt. ",
    },
    {
      selector: "#balanceNumber",
      content:
        "Visibility is important, monitor your balance of your selected token.",
    },
    {
      selector: "#contractAddress",
      content: () => (
        <div>
          Add the token of your choice straight into your Meta Mask wallet with a
          click of the button.
          <br />
          <hr />
          <h6 style={{ textAlign: "center" }}> "Think you got it now?" </h6>
          <button
            style={{
              border: "1px solid #f7f7f7",
              background: "none",
              padding: ".3em .7em",
              fontSize: "inherit",
              display: "block",
              cursor: "pointer",
              margin: "1em auto",
            }}
            onClick={this.closeTour}
          >
            Let's Begin
          </button>
        </div>
      ),
    },
  ]
  console.log(props.coinAddress)

  function handleRender(e) {
    setTitle("loading")
    setTimeout(function () {
      setTitle(e)
    }, 3000)
  }

  const exchange = () => {
    return (
      // <button onClick={props.testOracle(this)}>ORACLE</button>
      <div className="container">
        <div className="mainContent">
          <div className="mt-5">
            <img
              alt="logo"
              className="logo"
              src="https://miro.medium.com/max/4800/1*-k-vtfVGvPYehueIfPRHEA.png"
            />
          </div>
          <div>
            <div className="form-group">
              <input
                className="form-field"
                type="email"
                placeholder="Amount"
                onChange={(e) => props.handleInput}
              ></input>
              {/* <span className="coinInputText">{this.state.tokenName}</span> */}
              <select
                className="choices"
                type="select"
                onChange={(e) => props.changeToken(e.target.value)}
                id="cusSelectbox"
              >
                <option value="0">ETH</option>
                <option value="1">CHC</option>
                <option value="2">Wood</option>
                <option value="3">Slick</option>
                <option value="4">HAM</option>
                <option value="5">Smit</option>
              </select>
            </div>
          </div>

          <div className="walletActions">
            <div>
              <button
                className="buttonStart"
                type="button"
                onClick={props.borrow}
                disabled={props.tokenName === "Bank"}
              >
                Borrow
              </button>

              <button
                className="buttonMid"
                type="button"
                onClick={props.sendAmount}
                disabled={props.tokenName === "Bank"}
              >
                Repay Loan
              </button>
            </div>
            <div>
              <button
                className="buttonMid"
                type="button"
                onClick={props.depositBank}
              >
                Deposit
              </button>
              <button
                className="buttonMid"
                type="button"
                onClick={props.withdrawBank}
              >
                Withdraw
              </button>
              <button className="buttonEnd" type="button" onClick={props.donateBank}>
                Donate
              </button>
            </div>
          </div>
          <div className="contractInfo mt-2">
            <div className="bottomBar">
              <span className="choices" id="balance">
                <p className="balanceText">Balance</p>
              </span>
              <span className="form-field" id="balanceNumber">
                {(props.balance / 1000000000000000000).toString() +
                  " " +
                  props.symbol}
              </span>
              <span className="choices" id="refresh" onClick={props.refreshBalance}>
                <img
                  alt="refreshbtn"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Refresh_icon.svg/1024px-Refresh_icon.svg.png"
                  className="refreshLogo"
                ></img>
              </span>
              <span className="choices" id="contract">
                <p className="balanceText">Contract </p>
                <img
                  alt="clipboard"
                  onClick={() => {
                    navigator.clipboard.writeText(props.coinAddress)
                  }}
                  className="clipboard"
                  src="https://i.imgur.com/e7uIP8z.png"
                />
              </span>
              <input
                className="form-field"
                id="contractAddress"
                value={props.coinAddress}
              ></input>
              <span className="choices" id="refresh" onClick={props.refreshBalance}>
                <img
                  alt="refresh"
                  onClick={props.addToken}
                  src="https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png"
                  className="refreshLogo"
                ></img>
              </span>
              {/* <p
            onClick={() => {
              navigator.clipboard.writeText(this.state.coinAddress);
            }}
            href="#"
            id="pointer"
          >
            {this.state.coinAddress}{" "}
            <button onClick={this.addToken.bind(this)}>
              MetaMask Token
            </button>
            <img
              className="clipboard"
              src="https://i.imgur.com/e7uIP8z.png"
            />
          </p> */}
            </div>
            <div></div>
            <div className="accountBalance">
              <div style={{ fontSize: ".8rem" }}>
                <Alert variant="warning">
                  Balance cannot be seen until tokens are added in{" "}
                  <Alert.Link href="https://metamask.io/">MetaMask</Alert.Link>
                </Alert>
                <Alert variant="danger">
                  Please add the token to your{" "}
                  <Alert.Link href="https://metamask.io/">wallet</Alert.Link> to see
                  transactions
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const pageRender = () => {
    console.log(title)
    if (title === "swap") {
      return swap()
    } else if (title === "cblt") {
      return cblt()
    } else if (title === "exchange") {
      return exchange()
    } else if (title === "loading") {
      return <Loading />
    } else {
      return <h2>Coming Soon...</h2>
    }
  }

  const cblt = () => {
    return (
      <>
        <div className="cbltrender">
          <h1>Welcome to Cobalt Exchange</h1>
          <h2>Let's get started ith adding CBLT</h2>
          <button
            className="cblt"
            style={{ width: "9%" }}
            onClick={() => cobaltBalance()}
          >
            Add Your CBLT
          </button>
        </div>
      </>
    )
  }

  const cobaltBalance = async () => {
    const address = "0x433c6e3d2def6e1fb414cf9448724efb0399b698"
    await window.ethereum
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: address, // The address that the token is at.
            symbol: "CBLT", // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            image: "https://miro.medium.com/max/4800/1*-k-vtfVGvPYehueIfPRHEA.png", // A string url of the token logo
          },
        },
      })
      .then((success) => {
        if (success) {
          console.log(success)
          console.log("Cobalt successfully added to wallet!")
        } else {
          throw new Error("Something went wrong.")
        }
      })
      .catch(console.error)

    const web3 = new Web3(window.ethereum)
    var balance = web3.eth.getBalance(address).then((value) => {
      const credit = web3.utils.fromWei(value, "ether")
      setCblt(credit)
    })
    console.log(balance)
  }

  const swap = () => {
    return (
      <Swap
        handleInput={props.handleInput}
        deposit={props.depositBank}
        withdrawl={props.withdrawBank}
        changeToke={props.changeToken}
        balance={props.balance}
        symbol={props.symbol}
      />
    )
  }
  return (
    <>
      <Tour
        onRequestClose={props.closeTour}
        steps={tourConfig}
        isOpen={props.isTourOpen}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
        onAfterOpen={props.disableBody}
        onBeforeClose={props.enableBody}
      />

      <NavBar
        handleRender={handleRender}
        cobalt={cobalt}
        balance={props.balance}
        symbol={props.symbol}
        openTour={props.openTour}
        account={props.account}
      />
      {pageRender()}
    </>
  )
}

export default Home
