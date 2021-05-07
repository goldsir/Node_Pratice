import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';
import * as cheerio from 'cheerio';

@Injectable()
export class CmbcBankService {// 中國農業銀行    

    constructor() {

    }

    public async openBank(bank: Bank) {

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('internet explorer').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();

        await Common.Delay(3);
        let username = await driver.wait(until.elementLocated(By.id('writeUserId')), 20000);
        await username.sendKeys(bank.LoginAccount);// 到底是證號還是啥小的 不知道


        this.keepGoing(driver, bank);
    }

    private async keepGoing(driver, bank) {

        let interval = setInterval(async () => {

            try {

                // 交易明細查詢     
                try {
                    await driver.executeScript(`document.querySelectorAll('a.v-binding')[1].click()`);
                    await Common.Delay(3);
                } catch (err) {
                    // leaf ActTrsQry
                    await driver.executeScript(`document.querySelector('a.leaf.ActTrsQry').click()`);
                    await Common.Delay(3);
                }
                // 近三個月內的記錄
                // 
                await driver.executeScript(`document.querySelectorAll('a.lanzi1')[6].click()`);
                await Common.Delay(3);

                let html = await driver.executeScript(`return document.getElementById('DataTable').outerHTML`);
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

    private processBankData(html: string) {

        let datas = []
        let $ = cheerio.load(html);
        let trs = $('tbody>tr');
        trs.each((index, tr) => {

            let data: any = {};
            let tds = $(tr).children('td');

            let date = $(tds[0]).text();
            let amount = $(tds[2]).text();   // $(tds[1]) 是display:none
            let balance = $(tds[4]).text();
            let payInfo = $(tds[6]).text();
            //console.log(payInfo);

            if (/转入\s\d/.test(amount)) {

                data.date = /\d{4}-\d{2}-\d{2}/.exec(date)[0];
                data.amount = amount.split(' ')[1].replace(/,/g, '')
                data.balance = balance.replace(/,/g, '');
                data.payName = /\D+/.exec(payInfo)[0].replace(/[\n\t]*/, '');
                data.payAccount = payInfo.replace(data.payName, '').replace(/[\n\t\s]*/g, '');
                datas.push(data);
            }
        });

        return datas;
    }

    private sendDataToWRCAPI(bank: Bank, datas) {

        datas = [

            {
                date: '2019-04-23',
                amount: '1100.00',
                balance: '1100.00',
                payName: '刘艳 ',
                payAccount: '6222620310010805437'
            },
            {
                date: '2019-04-24',
                amount: '387.87',
                balance: '387.87',
                payName: '胡水燕 ',
                payAccount: '6230520800016765274'
            },
            {
                date: '2019-04-24',
                amount: '788.00',
                balance: '1175.87',
                payName: '胡水燕 ',
                payAccount: '6230520800016765274'
            },
            {
                date: '2019-05-01',
                amount: '88.88',
                balance: '206.44',
                payName: '刘艳 ',
                payAccount: '6217732902307713'
            },
            {
                date: '2019-05-02',
                amount: '2587.00',
                balance: '2793.44',
                payName: '彭头英 ',
                payAccount: '6230520800019570572'
            },
            {
                date: '2019-05-02',
                amount: '287.00',
                balance: '430.44',
                payName: '彭头英 ',
                payAccount: '6230520800019570572'
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