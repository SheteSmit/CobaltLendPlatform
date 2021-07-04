const web3 = window.web3
const cblt = "0x29a99c126596c0Dc96b02A88a9EAab44EcCf511e"

// Get Current Gas Price
export const gasPrice = () => {
  web3.eth.getGasPrice().then((result) => {
    const convertedBalance = web3.utils.fromWei(result, "ether")
    console.log(convertedBalance)
  })
}

// Get Current CBLT Balance
export const cbltBalance = async () => {
  await new web3.eth.getBalance(cblt, (err, bal) => {
    const convertedBalance = web3.utils.fromWei(bal, "ether")
    console.log(convertedBalance)
  })
}
// Get Current CBLT Price
export const getCurrentCBLT = async () => {
  await new web3.eth.getBalance(cblt, (err, bal) => {
    const convertedBalance = web3.utils.fromWei(bal, "ether")
    console.log(convertedBalance)
  })
}
