const config = require('./evo.config');

const { Builder, By, Key, until } = require('selenium-webdriver');

function delay(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('');
        }, seconds * 1000);
    });
}

(async function run() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {

        await driver.get(config.loginPage);
        driver.manage().window().maximize();

        let userNameInput = await driver.findElement(By.css('input[type=text]'));
        await userNameInput.sendKeys(config.username);

        let userPasswordInput = await driver.findElement(By.css('input[type=password]'));
        await userPasswordInput.sendKeys(config.userPassword);

        let submitBtn = await driver.findElement(By.css('input[type=submit]'));
        const actions = driver.actions({ async: true });
        await actions.move({ origin: submitBtn }).click().perform();
        await delay(10);

        // https://spadewinbet.uat1.evo-test.com/backoffice/#/ext/bo#/gat/view/1685ae79076109963a976404
        // https://spadewinbet.uat1.evo-test.com/backoffice/#/ext/bo#/gat/view/16863cfd0d875bf5c4706451

        // id
        let ids = ['1685ae79076109963a976404', '1685ae79076109963a976404', '1685ae79076109963a976404', '16863cfd0d875bf5c4706451'];
        let id = ids.shift();
        if (id != undefined) {

            await driver.get(config.gameResultPage);
            await delay(5);
            let gameIdInput = await driver.findElement(By.css('#mat-input-1'));
            await gameIdInput.sendKeys(id);

            let searchBtn = driver.findElement(By.xpath('/html/body/app-root/mat-drawer-container/mat-drawer-content/main/bo-game-search/div/button/span[1]'));
            const actions = driver.actions({ async: true });
            await actions.move({ origin: searchBtn }).click().perform();
        }


    } catch (err) {
        console.log(err);
    }
})();