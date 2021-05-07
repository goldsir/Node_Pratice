import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';

@Injectable()
export class TPBankService {

    private bankName: string = "TPBank";
    constructor() {

    }

    public async openBank(bank: Bank) {

        //未完 乾

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();
        // 轉英文
        await driver.executeScript(`document.querySelector('img.lang-icon').click()`);
        await Common.Delay(3);

        // 輸入帳號
        let inputUsername = await driver.findElement(By.css('input[placeholder=Username]'));
        await inputUsername.sendKeys(bank.LoginAccount)

        // 輸入密碼
        let inputPassword = await driver.findElement(By.css('input[placeholder=Password]'));
        await inputPassword.sendKeys(bank.Password);
        await driver.executeScript(`document.querySelector('button.btn-login').click()`);
        await Common.Delay(3);

        this.keepGoing(driver, bank);

    }

    private async keepGoing(driver, bank) {

        let switchFlag = false;
        let interval = setInterval(async () => {

            try {
                if (switchFlag === false) {

                    //要移到交易明細頁
                    await driver.executeScript(`document.querySelector('span.text-link').click()`);
                    switchFlag = true;
                }
                else {

                }
            }
            catch (err) {
                console.log(err.message);
                switchFlag = false;
                if (/chrome not reachable/.test(err.message)) {
                    clearInterval(interval);
                    console.log(interval + '-- cleared');
                }
            }
        }, 30 * 1000);
    }
}