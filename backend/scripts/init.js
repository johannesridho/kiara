const CONFIG = require("../modules/config.js")
const Web3 = require("web3")
const Web3Singleton = require("../modules/repositories/Web3Singleton.js")
const ContractObject = require("../modules/utils/ContractObject.js")

const SOL = './contracts/SmartContract.sol'
const CONTRACT_NAME = 'SmartContract'
const CONTRACT_ADDRESS = '0xdd6ab28f8622f5ac3a680a944b9cde92e131ed45'

const web3 = new Web3(new Web3.providers.HttpProvider(CONFIG.eth.host))
const contractObject = new ContractObject(web3, CONTRACT_NAME, SOL)
const adminAddr = web3.eth.accounts[0]
contractObject.getContractInstance(adminAddr, [10000000000])
  .then((contractInstance) => {
    // console.log(contractInstance)
  })