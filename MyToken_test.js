const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TransactionTrackerNFT", function () {
  let TransactionTrackerNFT;
  let transactionTrackerNFT;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Deploy the contract before each test
    TransactionTrackerNFT = await ethers.getContractFactory("TransactionTrackerNFT");
    [owner, addr1] = await ethers.getSigners();
    transactionTrackerNFT = await TransactionTrackerNFT.deploy();
    await transactionTrackerNFT.deployed();
  });

  it("Should mint an NFT with the correct transaction count", async function () {
    // Fetch the transaction count for the owner address
    const txCount = await owner.getTransactionCount();
    
    // Mint an NFT with the fetched transaction count
    await transactionTrackerNFT.mintNFT(txCount);
    
    // Fetch the token URI of the minted NFT
    const tokenURI = await transactionTrackerNFT.tokenURI(1);
    
    // Generate the expected SVG and token URI
    const expectedSVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='white' /><text x='10' y='20' fill='black'>Transactions: ${txCount}</text></svg>`;
    const expectedJSON = {
      name: "Transaction Tracker NFT",
      description: "An NFT that tracks the number of transactions at the time of minting.",
      image: `data:image/svg+xml;base64,${Buffer.from(expectedSVG).toString('base64')}`
    };
    const expectedTokenURI = `data:application/json;base64,${Buffer.from(JSON.stringify(expectedJSON)).toString('base64')}`;

    // Verify that the token URI matches the expected token URI
    expect(tokenURI).to.equal(expectedTokenURI);
  });

  it("Should increment the token ID correctly", async function () {
    // Fetch the transaction counts for both addresses
    const txCount1 = await owner.getTransactionCount();
    const txCount2 = await addr1.getTransactionCount();

    // Mint NFTs for both addresses
    await transactionTrackerNFT.mintNFT(txCount1);
    await transactionTrackerNFT.connect(addr1).mintNFT(txCount2);

    // Verify that the correct owners are set for each token ID
    expect(await transactionTrackerNFT.ownerOf(1)).to.equal(owner.address);
    expect(await transactionTrackerNFT.ownerOf(2)).to.equal(addr1.address);
  });

  it("Should set the correct owner", async function () {
    // Verify that the contract owner is correctly set
    expect(await transactionTrackerNFT.owner()).to.equal(owner.address);
  });
});
