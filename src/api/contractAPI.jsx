import { useState } from "react"
// import Web3 from "web3";
// import CHC from "../abis/CHCToken.json";
// import Wood from "../abis/WoodToken.json";
// import Smit from "../abis/SmitCoin.json";
// import Slick from "../abis/Token.json";
// import Ham from "../abis/HAM.json";
// import Bank from "../abis/Bank.json";

function ContractAPI() {
  const [contract, setContract] = useState([])
  // const [abiArr] = useState([]);
  // const [symbol, setSymbol] = useState([]);
  // const [token, setToken] = useState([]);
  // const [tokenName] = useState([]);
  // const [input] = useState(0);
  const [coinAddress, setCoinAddress] = useState([])
  const [callback, setCallback] = useState(false)
  const [account, setAccount] = useState(false)
  const [balance, setBalance] = useState(false)
  const [web3, setWeb3] = useState(false)
  // const [setResponse] = useState();
  const [allContracts, setAllContracts] = useState(false)

  //Send token
  // const sendAmount = async () => {
  //   if (token === Bank) {
  //   }
  //   if (token !== "undefined") {
  //     try {
  //       const response = await token.methods.donate(account, input).send({
  //         from: account,
  //       });
  //       setResponse({
  //         response: response,
  //       });
  //     } catch (e) {
  //       console.log("Error, deposit: ", e);
  //     }
  //   }
  // };

  // Borrow tokens
  // const borrow = async () => {
  //   if (token !== "undefined") {
  //     try {
  //       const response = await token.methods.borrow(account, input).send({
  //         from: account,
  //       });
  //       setResponse({
  //         response: response,
  //       });
  //     } catch (e) {
  //       console.log("Error, deposit: ", e);
  //     }
  //   }
  // };

  // refresh token balance
  // const refreshBalance = async () => {
  //   if (tokenName === Bank) {
  //     await token.methods
  //       .balanceOf()
  //       .call({ from: account })
  //       .then((result) => {
  //         console.log(result.toString());
  //         setBalance({
  //           balance: result.toString(),
  //         });
  //       });
  //   } else {
  //     await token.methods
  //       .balanceOf(account)
  //       .call({ from: account })
  //       .then((result) => {
  //         console.log(result.toString());
  //         setBalance({
  //           balance: result.toString(),
  //         });
  //       });
  //   }
  // };

  // add token
  // const addToken = async () => {
  //   const tokenAddress = coinAddress;
  //   const tokenSymbol = symbol;
  //   const tokenDecimals = 18;
  //   const tokenImage = "https://i.imgur.com/rRTK4EH.png";

  //   try {
  //     // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  //     const wasAdded = await window.ethereum.request({
  //       method: "wallet_watchAsset",
  //       params: {
  //         type: "ERC20", // Initially only supports ERC20, but eventually more!
  //         options: {
  //           address: tokenAddress, // The address that the token is at.
  //           symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
  //           decimals: tokenDecimals, // The number of decimals in the token
  //           image: tokenImage, // A string url of the token logo
  //         },
  //       },
  //     });

  //     if (wasAdded) {
  //       console.log("Thanks for your interest!");
  //     } else {
  //       console.log("Your loss!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //change tokens
  // const changeToken = async (event) => {
  //   const Token = abiArr[event];
  //   // creates a new web3 service
  //   const web3 = new Web3(window.ethereum);
  //   // gets networkId
  //   const netId = await web3.eth.net.getId();
  //   // creates contract
  //   const token = await new web3.eth.Contract(
  //     Token.abi,
  //     Token.networks[netId].address
  //   );
  //   if (abiArr[event].contractName !== "Bank") {
  //     await token.methods
  //       .symbol()
  //       .call()
  //       .then((result) => {
  //         setSymbol({
  //           symbol: result,
  //         });
  //       });
  //   } else {
  //     setSymbol({ symbol: "ETH" });
  //   }

  //   const coinAddress = Token.networks[netId].address;
  //   // all data is saved inside state to use for later
  //   setToken({
  //     tokenName: Token.contractName,
  //     tokenSymbol: Token.tokenSymbol,
  //     token: token,
  //     coinAddress: coinAddress,
  //   });

  //   if (token.tokenName === "Bank") {
  //     await token.methods
  //       .balanceOf()
  //       .call({ from: account })
  //       .then((result) => {
  //         console.log(result.toString());
  //         setBalance({
  //           balance: result.toString(),
  //         });
  //       });
  //   } else {
  //     await token.methods
  //       .balanceOf(account)
  //       .call({ from: account })
  //       .then((result) => {
  //         console.log(result.toString());
  //         setBalance({
  //           balance: result.toString(),
  //         });
  //       });
  //   }
  // };

  // check metmask
  // const loadBlockchainData = async (dispatch) => {
  //   if (typeof window.ethereum !== "undefined") {
  //     const web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //     const netId = await web3.eth.net.getId();
  //     const accounts = await web3.eth.getAccounts();

  //     if (typeof accounts[0] !== "undefined") {
  //       const balance = await web3.eth.getBalance(accounts[0]);
  //       setAccount({ account: accounts[0] });
  //       setBalance({ balance: balance });
  //       setWeb3({ web3: web3 });
  //     } else {
  //       window.alert("Please login with MetaMask");
  //     }

  //     //load contracts
  //     try {
  //       const token = new web3.eth.Contract(
  //         CHC.abi,
  //         CHC.networks[netId].address
  //       );
  //       const coinAddress = CHC.networks[netId].address;
  //       setToken({ token: token });
  //       setCoinAddress({ coinAddress: coinAddress });

  //       for (let i = 0; i < abiArr.length; i++) {
  //         allContracts.push(
  //           new web3.eth.Contract(
  //             abiArr[i].abi,
  //             abiArr[i].networks[netId].address
  //           )
  //         );
  //       }
  //     } catch (e) {
  //       console.log("Error", e);
  //       window.alert("Contracts not deployed to the current network");
  //     }
  //   } else {
  //     window.alert("Please install MetaMask");
  //   }
  // };

  // useEffect(() => {
  //   loadBlockchainData();
  //   borrow()
  //   sendAmount()
  //   refreshBalance()
  //   addToken()
  //   changeToken()
  // }, []);

  return {
    contract: [contract, setContract],
    callback: [callback, setCallback],
    allContracts: [allContracts, setAllContracts],
    coinAddress: [coinAddress, setCoinAddress],
    account: [account, setAccount],
    balance: [balance, setBalance],
    web3: [web3, setWeb3],
  }
}

export default ContractAPI
