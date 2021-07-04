import { useState, useEffect } from "react"
import Web3 from "web3"

function OracleAPI() {
  const [token, setToken] = useState([])
  const [callback, setCallback] = useState(false)
  const [web3, setWeb3] = useState(false)
  const [allContracts, setAllContracts] = useState(false)

  const testOracle = async () => {
    // if (this.state.token !== "undefined") {
    //   try {
    //     const response = await this.state.allContracts[6].methods
    //       .testCall()
    //       .call({
    //         from: this.state.account,
    //       })
    //       .then((result) => {
    //         console.log(result);
    //       });
    //   } catch (e) {
    //     console.log("Error, deposit: ", e);
    //   }
    // }
  }

  useEffect(() => {}, [])

  return {}
}

export default OracleAPI
