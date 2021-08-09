import { configure } from "mobx";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Bank from "../../abis/Bank.json";
import Exchange from "../../abis/ChromiumV2.json";

configure({
  enforceActions: "never",
});

export function createStakingStore() {
  return {
    // Metamask data
    chainId: "eth",
    address: "",
    cblt: "0x29a99c126596c0Dc96b02A88a9EAab44EcCf511e",
    // Staking contract data
    stakingContract: null,
    tokenReserve: 0,
    startStakingDate: 0,
    endStakingDate: 0,
    interest: 0,
    cbltReward: 0,
    estimatedReturn: 0,
    estimateReturnUSD: 0,
    estimateReturnStakingUSD: 0,
    lotteryResult: "No",
    stakeReady: false,
    userData: [[0], [0], [0], [0], [0], [0]],
    tierData: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    // Exchange
    exchangeContract: null,
    numETH: 0,
    numCBLT: 0,
    direction: "down",
    async buyCBLT() {
      try {
        await this.exchangeContract.methods.buyCBLT().send({
          from: this.address,
          value: this.numETH + 10,
        });
      } catch (e) {
        console.log("Error, deposit: ", e);
      }
    },
    async sellCBLT() {
      try {
        await this.exchangeContract.methods
          .sellCBLT(this.numCBLT.toString())
          .send({
            from: this.address,
          });
      } catch (e) {
        console.log("Error, deposit: ", e);
      }
    },
    async estimateBuyCBLT(_eth) {
      if (_eth == 0) {
        this.numCBLT = 0;
      } else {
        try {
          let returnCBLT = await this.exchangeContract.methods
            .expectedBuyReturn(_eth.toString())
            .call();
          this.numCBLT = returnCBLT[0];
        } catch (e) {
          console.log("Error, deposit: ", e);
        }
      }
    },
    async estimateSellCBLT(_CBLT) {
      if (_CBLT == 0) {
        this.numETH = 0;
      } else {
        try {
          let returnETH = await this.exchangeContract.methods
            .expectedSellReturn(_CBLT.toString())
            .call();
          this.numETH = returnETH[0];
        } catch (e) {
          console.log("Error, deposit: ", e);
        }
      }
    },
    // Load chain
    async loadChain() {
      // Dectect provider
      const provider = await detectEthereumProvider();
      const web3 = new Web3(window.ethereum);

      // If provider exists load blockchain
      if (provider) {
        // Pull chainId from metamask
        this.chainId = await provider.request({ method: "eth_chainId" });

        // Create contract
        const web3 = new Web3(window.ethereum);

        this.stakingContract = await new web3.eth.Contract(
          Bank.abi,
          Bank.networks[1].address
        );

        this.exchangeContract = await new web3.eth.Contract(
          Exchange.abi,
          Exchange.networks[1].address
        );

        // Handle chain change from metamask on user change
        provider.on("chainChanged", this.handleChainChanged);

        // Pull account address
        const response = await provider
          .request({ method: "eth_accounts" })
          .catch((err) => {
            // Some unexpected error.
            // For backwards compatibility reasons, if no accounts are available,
            // eth_accounts will return an empty array.
            console.error(err);
          });
        this.address = response.toString();
        //Save user

        // Handle account change from metamask
        await provider.on("accountsChanged", this.handleAccountsChanged);
      } else {
        console.log("Please install MetaMask!");
      }
    },

    async handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
      } else if (accounts[0] !== this.address) {
        // Address must be converted to String
        this.address = accounts[0].toString();
      }
    },
    // Adds the binance chain to your metamask and procs a suggestion to switch chains
    async changeChain() {
      const provider = await detectEthereumProvider();
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x38`,
            chainName: "Binance Smart Chain Mainnet",
            nativeCurrency: {
              name: "BNB",
              symbol: "bnb",
              decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed1.ninicoin.io"],
            blockExplorerUrls: [`https://bscscan.com/`],
          },
        ],
      });
    },
    // Function to execute code on chain change
    handleChainChanged() {
      console.log("Chain changed to", this.chainId);
    },
    async getUserBalance() {
      try {
        const response = await this.stakingContract.methods
          .getUserBalance(this.address, this.cblt)
          .call({ from: this.address });

        this.cbltReward = response;
        console.log(this.cbltReward);

        let CBLTtoUSD = await this.stakingContract.methods
          .getEstimateUSD(
            (this.userData[1] / 1000000000000000000).toString(),
            this.cblt
          )
          .call();
        this.estimateReturnUSD = CBLTtoUSD;
      } catch (e) {
        console.log("Error, balance: ", e);
      }
    },
    async deposit(amount, tier) {
      try {
        const response = await this.stakingContract.methods
          .stakeEth(tier.toString(), this.cblt)
          .send({ from: this.address, value: (amount + 10).toString() });
        await this.getUserData();
        await this.getTokensInReserve();
      } catch (e) {
        console.log("Reverted because, ", e);
      }
    },
    async withdraw() {
      try {
        const response = await this.stakingContract.methods
          .withdrawEth(this.userData[0].toString())
          .send({
            from: this.address,
          });
        await this.getUserData();
      } catch (e) {
        console.log("Error, deposit: ", e);
      }
    },
    async setStakingStatus() {
      try {
        await this.stakingContract.methods.setStakingStatus(true).call();
      } catch (e) {
        console.log(e);
      }
    },

    async handleTierData() {
      let num = 0;
      for (let idx1 = 1; idx1 <= 5; idx1++) {
        for (let idx2 = 1; idx2 <= 5; idx2++) {
          try {
            const response = await this.stakingContract.methods
              .getTierCombination(idx2, idx1)
              .call();
            this.tierData[num] = response;
            num++;
          } catch (e) {
            console.log("tier data error", e);
          }
        }
      }
    },
    async tierCombination(amount, time) {
      try {
        const response = await this.stakingContract.methods
          .getTierInformation(amount.toString(), time.toString())
          .call();
        if (response[1] > 0) {
          this.stakeReady = true;
        } else {
          this.stakeReady = false;
        }
      } catch (e) {
        console.log("tier data error", e);
      }
    },
    async getUserData() {
      try {
        const results = await this.stakingContract.methods
          .getUser(this.address)
          .call();
        this.userData = results;
        console.log(this.userData);
        let tierCombination = await this.stakingContract.methods
          .getTierCombination(results[4], results[3])
          .call();
        await this.getUserBalance();

        let CBLTtoUSD = await this.stakingContract.methods
          .getEstimateUSD(
            Math.trunc(results[1] / 1000000000000000000).toString(),
            this.cblt
          )
          .call();

        let lotteryResult = await this.stakingContract.methods
          .lotteryWinner(this.address)
          .call();

        this.estimateReturnStakingUSD = CBLTtoUSD;
        this.interest = tierCombination[0];
        if (lotteryResult == true) {
          this.lotteryResult = "Yes";
          this.interest = this.interest * 2;
        }
        this.startStakingDate = parseInt(results[2] + "000");
        this.endStakingDate =
          parseInt(tierCombination[2] + "000") + parseInt(results[2] + "000");
      } catch (e) {
        console.log("borrow error", e);
      }
    },
    async getEstimatedReturn(amount, timeTier) {
      if (amount != 0) {
        try {
          const response = await this.stakingContract.methods
            .getTokenReturn(amount.toString(), timeTier, this.cblt)
            .call();
          this.estimatedReturn = response[1];
        } catch (e) {
          console.log("Error, reserver: ", e);
        }
      }
    },
    async withdrawReward() {
      try {
        const response = await this.stakingContract.methods
          .withdrawStaking(this.cblt)
          .send({
            from: this.address,
          });
        await this.getUserBalance();
      } catch (e) {
        console.log("Error, reserver: ", e);
      }
    },
    async getTokensInReserve() {
      try {
        const response = await this.stakingContract.methods
          .getTokenReserve(this.cblt)
          .call();
        this.tokenReserve = response;
      } catch (e) {
        console.log("Error, reserver: ", e);
      }
    },
  };
}
