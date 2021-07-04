export async function loadBlockchainData(dispatch) {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    const netId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()

    if (typeof accounts[0] !== "undefined") {
      const balance = await web3.eth.getBalance(accounts[0])
      this.setState({ account: accounts[0], web3: web3 })
    } else {
      window.alert("Please login with MetaMask")
    }

    //load contracts
    try {
      const token = new web3.eth.Contract(Bank.abi, Bank.networks[netId].address)
      const coinAddress = CHC.networks[netId].address
      this.setState({
        token: token,
        coinAddress: coinAddress,
      })

      await this.state.token.methods
        .balanceOf()
        .call({ from: this.state.account })
        .then((result) => {
          console.log(result.toString())
          this.setState({
            balance: result.toString(),
          })
        })

      for (let i = 0; i < this.state.abiArr.length; i++) {
        this.state.allContracts.push(
          new web3.eth.Contract(
            this.state.abiArr[i].abi,
            this.state.abiArr[i].networks[netId].address
          )
        )
      }
    } catch (e) {
      console.log("Error", e)
      window.alert("Contracts not deployed to the current network")
    }
  } else {
    window.alert("Please install MetaMask")
  }
}
