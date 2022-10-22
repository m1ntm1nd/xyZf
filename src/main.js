const {Builder, By, Key, until} = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');

const faucet = 'https://faucet.polygon.technology/';
const browser = 'chrome'
const pathToAdrrFile = './utils/farmAccounts.json';

async function click_btn(address) {
    let driver = await new Builder().forBrowser(browser).build();

    await driver.get(faucet);

    function iteration(driver) {
      setTimeout(() => {
        driver.findElement(By.xpath(`//*[@id="app"]/div/div/div[1]/div/div/div[1]/div/div/div/div[5]/div/div[2]/div/input`)).sendKeys(address, Key.RETURN)
      }, 2000)
      
      setTimeout(() => {
        driver.findElement(By.className('btn btn-primary btn-block')).click()
      }, 2500)

      setTimeout(() => {
        driver.findElement(By.xpath("//button[text()='Confirm']")).click()
      }, 3500)

      setTimeout(() => {
        driver.close();
      }, 4500)
    }

    iteration(driver);
};

async function nemain() {
  let farmAccs = {};

  try {
    let data = fs.readFileSync(pathToAdrrFile, 'utf8');
    farmAccs = JSON.parse(data);
  } catch (e) {}

  
  let addresses = Object.keys(farmAccs);
  let accNumber = process.argv[2];

  try {
    await click_btn(addresses[accNumber]);
  } catch (e) {
    console.log('error')
  }
}

nemain()
