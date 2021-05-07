import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';
import * as cheerio from 'cheerio';

@Injectable()
export class CITICBankService {// 中信银行

    constructor() {

    }

    public async openBank(bank: Bank) {

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('internet explorer').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();
        await Common.Delay(3);

        this.keepGoing(driver, bank);
    }

    private async keepGoing(driver, bank) {

        let interval = setInterval(async () => {

            try {

                // 回首頁      
                await driver.executeScript(`backHomePage();`);
                await Common.Delay(3);

                // 明細查詢    
                await driver.executeScript(`document.querySelectorAll('a.f_r.newCardHref')[0].click()`);
                await Common.Delay(3);

                // 半年 
                await driver.executeScript(`document.getElementById("mainframe").contentWindow.document.getElementById("nearHalfYearTab").click()`);
                await Common.Delay(1);

                // 查詢
                await driver.executeScript(`document.getElementById("mainframe").contentWindow.document.querySelectorAll('div.button-center')[0].click()`);
                await Common.Delay(2);

                // type: 收入  
                await driver.executeScript(`document.getElementById("mainframe").contentWindow.document.getElementById("Credit").click()`);
                await Common.Delay(2);

                // 查詢結果  
                let html = await driver.executeScript(`return document.getElementById("mainframe").contentWindow.document.getElementById("resultTable1").outerHTML`);

                let datas = this.processBankData(html);
                this.sendDataToWRCAPI(bank, datas);
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

    private processBankData(html) {

        let $ = cheerio.load(html);
        let trs = $('tbody').first().find('tr');

        let datas = [];

        trs.each((index, tr) => {
            let data: any = {};
            let tds = $(tr).children('td');
            let date = $(tds[0]).text();
            let income = $(tds[1]).text();
            let balance = $(tds[3]).text();
            let payName = $(tds[4]).text();
            let payAccount = $(tds[5]).text().trim();

            if ('--' != income) {

                data.date = date.substring(0, 10);  // 不包含 endIndex
                data.amount = income.replace(/,/g, '').trim();
                data.balance = balance.replace(/,/g, '').trim();
                data.payName = payName.trim();
                data.payAccount = payAccount;
                if ('' !== payAccount) {
                    datas.push(data);
                }
            }
        });
    }

    private sendDataToWRCAPI(bank: Bank, datas) {

        datas = [
            {
                date: '2019-09-27',
                amount: '4714.78',
                balance: '4715.29 ',
                payName: '石磊',
                payAccount: '6217********8101'
            },
            {
                date: '2019-09-21',
                amount: '0.51',
                balance: '0.51',
                payName: '',
                payAccount: ''
            }
        ];

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