pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


// this contract for swapping USDC

// Have Eth -> Send it to smartcontract and receive the USD amount corresponding

contract ShibaCoin is ERC20, Ownable {
    constructor() ERC20("ShibaCoin", "SBC") {}

    function mint(address to, uint256 amount) public payable {
        _mint(to, amount);
    }

    // receive function for receiving ethers
    receive() external payable{

    }
}
