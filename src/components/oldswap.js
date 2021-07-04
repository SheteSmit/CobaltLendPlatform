import React from "react"
import Gear from "../icons/settings.svg"
import Arrow from "../icons/arrow-down.svg"
// import Down from '../icons/chevron-down.svg';
import CHC from "../../abis/CHCToken.json"
import Wood from "../../abis/WoodToken.json"
import { Box, makeStyles, Typography } from "@material-ui/core"
import Slick from "../../abis/Token.json"
import { useForm } from "react-hook-form"
import Chromium from "../../abis/Chromium.json"
import { Formik } from "formik"
import Web3 from "web3"

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    height: "200px",
  },
  headerContaner: {},
  header: {
    color: "red",
  },
}))

function Swap(props) {
  const { register, handleSubmit } = useForm()
  const classes = useStyles()
  async function submit(data) {
    console.log(data)
    const web3 = new Web3(window.ethereum)
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
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

  async function getToken(str) {
    switch (str) {
      case "CHC":
        return CHC
      case "Wood":
        return Wood
      case "Slick":
        return Slick
      default:
        return console.log("Done")
    }
  }

  return (
    <Box className={classes.root}>
      <Formik>
        <form onSubmit={handleSubmit(submit)}>
          <div className={classes.headerContaner}>
            <Typography className={classes.header} variant="h4">
              Swap
            </Typography>
            <img alt="gear" src={Gear} />
          </div>
          <div>
            <div>
              <p>From</p>
              <input type="number" placeholder="0.0" {...register("amount")} />
            </div>
            <div>
              <div>
                <p>Balance</p>
                <div>{(props.balance / 1000000000000000000).toString()}</div>
              </div>
              <div style={{ display: "flex" }}>
                <select {...register("coin1")}>
                  <option value="ETH">ETH</option>
                  <option value="CHC">CHC</option>
                  <option value="Wood">Wood</option>
                  <option value="Slick">Slick</option>
                </select>
              </div>
            </div>
          </div>

          <img src={Arrow} alt="arrow" />
          <div>
            <div>
              <p>To</p>
              <input disabled type="number" placeholder="0.0"></input>
            </div>
            <div>
              <select {...register("coin2")}>
                <option value="ETH">ETH</option>
                <option value="CHC">CHC</option>
                <option value="Wood">Wood</option>
                <option value="Slick">Slick</option>
              </select>
            </div>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </Formik>
    </Box>
  )
}

export default Swap
