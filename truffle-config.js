/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKey = process.env.PRIVATE_KEYS || "";

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  plugins: ["truffle-contract-size"],

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    main: {
      provider: function () {
        return new HDWalletProvider(
          privateKey, // Array of account private keys
          `https://main.infura.io/v3/${process.env.INFURA_API_KEY}` // Url to an Ethereum Node
        );
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 1,
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          privateKey, // Array of account private keys
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}` // Url to an Ethereum Node
        );
      },
      gas: 9000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 4,
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          privateKey, // Array of account private keys
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}` // Url to an Ethereum Node
        );
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 3,
    },
  },
  contracts_directory: "./contracts",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: ">=0.6.0 <0.9.0",
      parser: "solcjs", // Leverages solc-js purely for speedy parsing
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "istanbul", // Default: "istanbul"
      },
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "CHF",
      gasPrice: 21,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: ">=0.6.0 <0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false,
  },
};
