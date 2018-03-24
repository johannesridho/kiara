const getAllAccounts = (web3) => {
  return web3.eth.accounts
}

const getOwnerships = (web3, account) => {
  return web3.eth.getOwnerships(account)
}

const unlockAccount = (web3, acc, pass) => {
  return web3.personal.unlockAccount(acc, pass)
}

const lockAccount = (web3, acc, pass) => {
  return web3.personal.lockAccount(acc, pass)
}

const transact = (web3, acc1, acc2, value) => {
  const UNIT = 'ether'
  const txHash = web3.eth.sendTransaction({'to': acc1, 'from': acc2, 'value': web3.toWei(value, UNIT), 'gasLimit': 21000, 'gasPrice': 20000000})
  return txHash
}



module.exports = {
  getAllAccounts: getAllAccounts,
  getBalance: getBalance,
  getRSVFromSignedToken: getRSVFromSignedToken,
  sign: sign,
  lockAccount: lockAccount,
  transact: transact,
  unlockAccount: unlockAccount,
}
