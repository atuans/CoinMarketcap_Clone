//Get Wallet Balance and Token Price on all chains.
const web3ApiKey = 'dad6v1Sg9Y5EGgFqr6C0FctS3HuQHQAGbpX1n8zshT9GapEU5ZwFSW8jTUlGj67d';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': web3ApiKey
  }
};
// Chain and its wrapper token address data
const networkData = [
    {
        "networkName": "Ethereum",
        "chainId": "0x1",
        "wrappedTokenAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    },
    {
        "networkName": "Polygon",
        "chainId": "0x89",
        "wrappedTokenAddress": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
    },
    {
        "networkName": "Binance",
        "chainId": "0x38",
        "wrappedTokenAddress": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        "networkName": "Avalanche",
        "chainId": "0xa86a",
        "wrappedTokenAddress": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
    },
    {
        "networkName": "Fantom",
        "chainId": "0xfa",
        "wrappedTokenAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
    },
    {
        "networkName": "Cronos",
        "chainId": "0x19",
        "wrappedTokenAddress": "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23"
    }
]

const address = '0x4B24365C8B4fcf06096F87EE0542A92c158ce3A1';

networkData.forEach(async (curr) => {
  try {
    const resBalanceData = await fetch(`https://deep-index.moralis.io/api/v2/${address}/balance?chain=${curr.chainId}`, options);
    const resBalance = await resBalanceData.json();
    const resTokenPriceData = await fetch(`https://deep-index.moralis.io/api/v2/erc20/${curr.wrappedTokenAddress}/price?chain=${curr.chainId}`, options);
    const resTokenPrice = await resTokenPriceData.json();
    console.log(`
    Network Name - ${curr.networkName}
    Wallet Balance - ${resBalance.balance/1e18}
    Token Price - $${resTokenPrice.usdPrice.toLocaleString()}/${resTokenPrice.nativePrice.symbol}
`);
  } catch (err) {
    console.log(err)
  }
});
