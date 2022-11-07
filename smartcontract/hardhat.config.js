require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || 'https://eth-goerli.g.alchemy.com/v2/NcKpdnlXLLTxgkSaaKCvimtHm57LmZ4T';
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || '13b1352c975f684da79775d2c28f02505a85074403a926e72fc49533f25f2ce6';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",        

  networks: {
      hardhat: {
          chainId: 1337,
          // on a test network, we dont need to define an accounts (20 fake accounts auto generated when you in a local hardhat network)
      },
       goerli:{
          url: GOERLI_RPC_URL,
          accounts:[GOERLI_PRIVATE_KEY],
       }        
  },

  solidity: "0.8.17",
};
