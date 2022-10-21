const { ethers } = require("ethers");
const fs = require('fs');

const targetAddress = '0x50b13d37B37f596260B6A8B75742CCfC86Aa8340'

const provider = ethers.getDefaultProvider('https://rpc-mumbai.maticvigil.com/')

async function nemain() {
    let farmAccs = {};
  
    try {
      let data = fs.readFileSync('./farmAccounts.json', 'utf8');
      farmAccs = JSON.parse(data);
      
    } catch (e) { }
     
    Object.keys(farmAccs).forEach(async(address) => await sendEther(address, farmAccs));
  }
  
  async function sendEther(userAddress, farmAccounts) {
    const balance = ethers.utils.formatEther(await provider.getBalance(userAddress));
    if (parseFloat(balance) > 0.05) {
      let wallet = new ethers.Wallet(farmAccounts[userAddress], provider)
      let tx = {
        to: targetAddress,
        value: ethers.utils.parseEther('0.197')
      }
  
      try {
      wallet.sendTransaction(tx).then((txObj) => {
        console.log('txHash', txObj.hash)
      })
      } catch(e) {
        console.log(`Error: ${e}\n\n`);
      }
    } else {
      console.log(`Ether not send. Balance: ${balance}\n`)
    }
  };
  
  nemain()
  