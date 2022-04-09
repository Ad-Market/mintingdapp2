const path = require("path");
const basePath = process.cwd();
const fs = require("fs");
const yesno = require('yesno');

const {
  fetchNoRetry,
} = require(`${basePath}/utils/functions/fetchWithRetry.js`);
let {
  CHAIN,
  GENERIC,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_MINT_START_DATE,
  PRESALE_WHITELISTED_ADDRESSES
} = require('../../src/config');

const deployContract = async () => {


  try {
    const url = `https://api.nftport.xyz/v0/contracts/collections`;
    const contract = {
      chain: CHAIN.toLowerCase(),
      name: CONTRACT_NAME,
      symbol: CONTRACT_SYMBOL,
      owner_address: OWNER_ADDRESS,
      metadata_updatable: METADATA_UPDATABLE,
      royalties_share: ROYALTY_SHARE,
      royalties_address: ROYALTY_ADDRESS,
      max_supply: MAX_SUPPLY,
      mint_price: MINT_PRICE,
      tokens_per_mint: TOKENS_PER_MINT,
      treasury_address: TREASURY_ADDRESS,
      public_mint_start_date: PUBLIC_MINT_START_DATE,
      presale_mint_start_date: PRESALE_MINT_START_DATE,
      base_uri: BASE_URI,
      prereveal_token_uri: PREREVEAL_TOKEN_URI,
      presale_whitelisted_addresses: PRESALE_WHITELISTED_ADDRESSES
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contract),
    };
    const response = await fetchNoRetry(url, options);
   console.log(response)
    if(response.response === "OK") {
      console.log(`Contract deployment started.`);
    } else {
      console.log(`Contract deployment failed`);
    }
    console.log(`Check /build/contract/_deployContractResponse.json for more information. Run "npm run get_contract" to get the contract details.`);
  } catch (error) {
    console.log(`CATCH: Contract deployment failed`, `ERROR: ${error}`);
  }
};

deployContract();
