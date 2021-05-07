import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';
import * as cheerio from 'cheerio';

@Injectable()
export class PBankService {// 交通银行

    constructor() {

    }

    public async openBank(bank: Bank) {

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('internet explorer').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();

        await Common.Delay(3);
        await driver.executeScript(`
            document.getElementById('go-login-number').style.display='none';
            document.getElementById('go-login-qr').style.display='block';            
            document.getElementById('alias').value = '${bank.LoginAccount}'
        `);


        //this.keepGoing(driver, bank);
    }

    private async keepGoing(driver, bank) {

        let interval = setInterval(async () => {

            try {


            }
            catch (err) {
                console.log(err.message);

                if (/not reachable/.test(err.message)) {
                    clearInterval(interval);
                    console.log(interval + '-- cleared');
                }
            }

        }, 20 * 1000);
    }

    private processBankData(bank: Bank, html) {
    }

    private sendDataToWRCAPI(bank: Bank, datas) {

        datas = [];

        for (let data of datas) {

            Common.sendDataToWinner(
                data.date
                , data.payName
                , data.payAccount
                , data.amount
                , data.balance
                , bank.BankName_C
                , bank.Account
            );
        }
    }
}