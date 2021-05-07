import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';
import * as cheerio from 'cheerio';

@Injectable()
export class AbcChinaBankService {// 中國農業銀行    

    constructor() {

    }

    public async openBank(bank: Bank) {

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('internet explorer').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();

        /*
        //切換至用戶名登錄表單
        await Common.Delay(3);
        await driver.executeScript(`document.getElementById('kBaobtn').click()`);

        let username = await driver.wait(until.elementLocated(By.id('username')), 10000);
        await username.sendKeys('fuckYou');// 到底是證號還是啥小的 不知道

        // PowerEnterDiv_userName_powerpass_1
        let pw = await driver.wait(until.elementLocated(By.id('PowerEnterDiv_userName_powerpass_1')), 10000);
        await pw.sendKeys('123');// 到底是證號還是啥小的 不知道
        */

        // 起~步~走
        this.keepGoing(driver, bank);
    }

    private async keepGoing(driver, bank) {

        let interval = setInterval(async () => {

            try {

                //首頁                
                await driver.executeScript(`document.querySelector('.active.index').click()`);

                await Common.Delay(2);
                //明細
                await driver.executeScript(`document.getElementById('contentFrame').contentWindow.toDetail('${bank.Account}')`);

                //近三個月: lastThreeMonthLink
                await Common.Delay(2);
                await driver.executeScript(`document.getElementById('contentFrame').contentWindow.document.getElementById('lastThreeMonthLink').click()`);

                //查詢: btn_query
                await Common.Delay(1);
                await driver.executeScript(`document.getElementById('contentFrame').contentWindow.document.getElementById('btn_query').click()`);

                await Common.Delay(3);

                //取表格html: tradeDetailTable
                let html = await driver.executeScript(`return document.getElementById('contentFrame').contentWindow.document.getElementById('tradeDetailTable').innerHTML`);
                console.log(html);
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