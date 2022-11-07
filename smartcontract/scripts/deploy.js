
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const ShibaCoin = await hre.ethers.getContractFactory("ShibaCoin");
  const shibacoin = await ShibaCoin.deploy();
  const AXS = await hre.ethers.getContractFactory('AXS');
  const axs = await AXS.deploy();
  const Link = await hre.ethers.getContractFactory('Link');
  const link = await Link.deploy();
  const USDC = await hre.ethers.getContractFactory('USDC');
  const usdc = await USDC.deploy();

  await shibacoin.deployed();
  await axs.deployed();
  await link.deployed();
  await usdc.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} ShibaCoin deployed to ${shibacoin.address} AXS deployed to ${axs.address} Link deployed to ${link.address} USDC deployed to ${usdc.address}`
    ,
    

  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
