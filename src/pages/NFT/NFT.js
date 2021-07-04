import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import NFTScore from "../../abis/NFTLoan.json"
import NFTScoring from "../../components/nft/nftScoring"
import { Alert } from "react-bootstrap"

const NFT = () => {
  const [account, setAccount] = useState("")
  const [network, setNetwork] = useState("")
  const [nftAddress, setNFTAddress] = useState(null)
  // const [nftBalance, setNFTBalance] = useState(0);
  // const [nftName, setNFTName] = useState(0);

  const loadBlockchainData = async () => {
    // Build web3 instane
    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    // Current Metamask network in use
    const networkID = await web3.eth.net.getId()
    switch (networkID) {
      case 1:
        setNetwork("This is mainnet")
        break
      case 4:
        setNetwork("This is the Rinkeby test network.")
        break
      case 5777:
        setNetwork("This is the Ganache test network.")
        break
      default:
        setNetwork("This is an unknown network.")
    }

    // NFT info: address, evets, hash
    const networkData = NFTScore.networks[networkID]

    if (networkData) {
      // NFT methods
      // const abi = NFTScore.abi

      // NFT Address
      const address = networkData.address
      setNFTAddress(address)

      // Get NFT Contract Instance
      // const contract = new web3.eth.Contract(abi, address)

      // NFT Methods

      // Get NFT Balance
      // const loanBalance = await contract.methods.balanceOf(address).call((err, res) => {
      //     console.log(res)
      //     return (!res === "undefined" ? setBalance(res) : setBalance(0))
      //   })

      // Get NFT Name
      // const loanName = await contract.methods.name().call((err, res) => {
      //     console.log(res)
      //   })

      // Get NFT Owner
      // const loanOwner = await contract.methods.ownerOf(address).call((err, res) => {
      //     console.log(res)
      //   })

      // Get NFT Mint
      // const loanMint = await contract.methods.mint(account, address, 'What is the string').call((err, res) => {
      //     console.log(res)
      //   })

      // Get NFT Transfer
      // const loanTransfer = await contract.methods.safeTransferFrom(account, to, address).call((err, res) => {
      //     console.log(res)
      //   })
    } else {
      window.alert("Smart contract not deployed to detected network.")
    }
  }
  useEffect(() => {
    async function fetchData() {
      await loadBlockchainData()
    }
    fetchData()
  }, [account])

  return (
    <Container>
      {network && (
        <Alert
          style={{ display: "flex", justifyContent: "center" }}
          variant="secondary"
        >
          {network}
        </Alert>
      )}
      <p>NFT address: {nftAddress}</p>
      <NFTScoring />
    </Container>
  )
}

export default NFT
