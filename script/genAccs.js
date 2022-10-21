
function main() {
    const fs = require('fs');
    const { ethers } = require("ethers");
    const provider = ethers.getDefaultProvider('https://rpc-mumbai.maticvigil.com/')
    var crypto = require('crypto');

    let farmAccs = {};
    
    Array(100).fill(0).forEach(() => {
        var privateKey = "0x" + (crypto.randomBytes(32).toString('hex'));
        let wallet = new ethers.Wallet(privateKey, provider)
        console.log(wallet.address)
        farmAccs[wallet.address] = privateKey;
    })
   
    try {
      fs.writeFileSync('./farmAccounts.json', JSON.stringify(farmAccs));
    } catch (err) {
      console.error(err);
    }
    
}

main()