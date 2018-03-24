const Web3 = require('web3');
const CONFIG = require('../config')
const Web3Singleton = (function () {

  var web3Instance
  const web3 = new Web3()
  web3.setProvider(new Web3.providers.HttpProvider(CONFIG.eth.host))

  const init = () => {
    console.log('=== connecting '+CONFIG.eth.host)
    return {
      web3: web3,
      getAllAccounts: () => web3.eth.accounts,
      getOwnerships: (address) => web3.eth.getOwnerships(account),
      getTransaction: (txHash) => web3.eth.getTransaction(txHash),
    }
  }

  return {
    getInstance: () => {
    if (!web3Instance)
  web3Instance = init()
  return web3Instance
}
}
})()

module.exports = Web3Singleton
