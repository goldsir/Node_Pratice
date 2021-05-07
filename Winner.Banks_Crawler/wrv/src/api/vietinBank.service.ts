import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';
import * as cheerio from 'cheerio';

@Injectable()
export class VietinBankService {

    private bankName: string = "VietinBank";
    constructor() {

    }

    public async openBank(bank: Bank) {

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();

        await Common.Delay(3);
        await this.setHTMLElementValue(driver, 'txtUsername', bank.LoginAccount);
        await this.setHTMLElementValue(driver, 'txtPassword', bank.Password);
        driver.executeScript(`document.querySelector('input[type=button][value="Sign In"]').click()`);
        await Common.Delay(3);
        this.keepGoing(driver, bank);

    }

    private async setHTMLElementValue(driver, id, value) {


        try {
            await driver.executeScript(`document.getElementById('${id}').setAttribute('value', '${value}')`);
            await driver.executeScript(`document.getElementById('${id}').value='${value}'`);
        } catch (err) {
            console.log('設值失敗\r\n');
            console.log(err);
        }
    }

    private processBankData(bank: Bank, html) {

        let $ = cheerio.load(html);

        let datas = [];

        $('tbody>tr').each((index, element) => {

            let $tds = $(element).children('td');
            let $td0 = $($tds[0]);

            let datePart = $td0.text().substring(0, 10); // 30/06/2020
            let timePart = $td0.text().substring(10);    // 01:43:50
            let date = datePart.split('/')[2] + '-' + datePart.split('/')[1] + '-' + datePart.split('/')[0]

            let dateTime = date + ' ' + timePart;

            let $td1 = $($tds[1]);
            let transactionType = $td1.text();

            if (transactionType === 'Debit') {
                return; // 不處理出款
            }

            let $td2 = $($tds[2]);
            let description = $td2.children('a').text().replace(/\n/g, ' ').replace(/ {2,}/, ' ');

            let $td3 = $($tds[3]);
            let amount = $td3.text().replace(/ VND/, '');

            let $td4 = $($tds[4]);
            let balance = $td4.text().replace(/ VND/, '');

            let data = {
                dateTime, transactionType, description, amount, balance
            }

            // console.log(dateTime, transactionType, description, amount);        

            datas.push(data);

        });

        console.log(datas);
        return datas;
    }

    // await driver.get(`https://ebanking.vietinbank.vn/rcas/portal/web/retail/account-transaction-history`);

    private async keepGoing(driver, bank) {

        let interval = setInterval(async () => {

            try {

                await driver.get(`https://ebanking.vietinbank.vn/rcas/portal/web/retail/account-transaction-history`);
                await Common.Delay(3);

                let html = await driver.executeScript(`return document.getElementById('sstIframe').contentWindow.document.querySelector('table.table').outerHTML`);

                let datas = this.processBankData(bank, html);
                Common.sendBankLastUpdateDateTimeToWinner(bank);//回傳最後掃帳時間

                datas.forEach((data) => {

                    if (Common.last7Pattern().test(data.description)) {

                        data.last7 = Common.last7Pattern().exec(data.description)[1].replace(/\r/g, '').replace(/\n/g, '')

                        Common.sendDataToWinner(
                            data.dateTime                         // date:string
                            , ""                                  // bankName: string
                            , ""                                  // bankNumber: string
                            , data.last7                          // mark:string
                            , data.amount                         // amount: string
                            , data.balance                        // balance: string
                            , bank.BankName                       // adminBankName: string
                            , bank.Account                        // adminBankNumber: string
                        )

                    }

                });
            }
            catch (err) {
                console.log(err.message);
                if (/chrome not reachable/.test(err.message)) {
                    clearInterval(interval);
                    console.log(interval + '-- cleared');
                }
            }
        }, 30 * 1000);

    }
}