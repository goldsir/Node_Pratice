import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';
import * as cheerio from 'cheerio';

@Injectable()
export class BIDVBankService {

    private bankName: string = "BIDVBank";

    constructor() { }

    public async openBank(bank: Bank) {

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();


        // 轉英文
        await driver.executeScript(`localization('en_US')`);
        await this.autoAccount_PW(driver, bank);
        this.keepGoing(driver, bank);
    }

    private async setHTMLElementValue(driver, selector, value) {
        try {
            await driver.executeScript(`document.querySelector('${selector}').setAttribute('value', '${value}')`);
            await driver.executeScript(`document.querySelector('${selector}').value='${value}'`);
        } catch (err) {
            console.log('設值失敗\r\n');
            console.log(err);
        }
    }

    private async autoAccount_PW(driver, bank) {

        let selector_accountInput = '#userNo';
        let selector_passwordInput = '#userPin';

        await this.setHTMLElementValue(driver, selector_accountInput, bank.LoginAccount);
        await this.setHTMLElementValue(driver, selector_passwordInput, bank.Password);
    }

    private processBankData(bank: Bank, dirtyData) {

        let datas = [];
        let $ = cheerio.load(dirtyData);

        $('div.cbx-form-wrap').find('table.x-grid3-row-table').each((index, element) => {
            let table = $(element);
            let tds = table.find('td');
            tds = tds.filter((index, element) => {
                return ($(element).css('display') !== 'none');
            });

            //這個結構是一個table裡面有只有一個td = 一筆資料，所以可以直接取出全部td
            let data: any = {};
            data.date = $(tds[0]).text().trim();
            data.amount = $(tds[1]).text().trim().replace(/,/g, '').replace(' ', '');
            data.amount = Number(data.amount);
            data.balance = $(tds[2]).text().trim();
            data.text = $(tds[3]).text().trim();
            datas.push(data);

        });

        datas = datas.map((data) => {

            data.balance = data.balance.replace(/,/g, '').replace(/VND/g, '').trim();
            data.balance = Number(data.balance);
            let date = data.date.split(' ');
            let data_yyyyMMdd = date[0];
            let date_hhmmss = date[1];

            // 27/02/2020
            data_yyyyMMdd = data_yyyyMMdd.replace(/(\d\d)\/(\d\d)\/(\d\d\d\d)/, function (str, ...groups) {
                return `${groups[2]}-${groups[1]}-${groups[0]}`
            });
            data.date = `${data_yyyyMMdd} ${date_hhmmss}`;

            return data;

        });

        if (datas != null && datas.length > 0) {
            let jResult = {
                "BankName": bank.BankName
                , "UserName": bank.UserName
                , "Account": bank.Account
                , "UpdateDateTime": moment().format('YYYY-MM-DD hh:mm:ss')
                , "Datas": datas
            }

            let filePath = path.join(process.cwd(), 'dist', 'json', `${bank.BankName}_${bank.Account}.json`);
            fs.writeFile(
                filePath
                , JSON.stringify(jResult)
                , 'utf-8'
                , function (err) {
                }
            );
        }

        console.log(datas);
        return datas;

    }

    private async keepGoing(driver, bank) {

        let switchFlag = false;  // 要放在 setInterval 的 回調函式之外: 閉包的威力

        let interval = setInterval(async () => {

            try {

                if (switchFlag === false) {
                    //轉去帳戶頁
                    // await driver.executeScript(`[...document.querySelectorAll('a')].find((e)=>e.innerText==='Accounts' && e.getAttribute('href')==='#' && e.className =='uraccounts').click();`);                     
                    await await driver.executeScript(`goToWorkSpaceById(workSpaceObject.WGT_ACCT_SUMMARY);`);
                    switchFlag = true;
                }
                else {

                    await driver.executeScript(`[...document.getElementsByTagName('center')].find((e)=>e.innerText==='Account statement').click();`);
                    await Common.Delay(5);

                    let html = await driver.executeScript('return document.documentElement.innerHTML');
                    let datas = this.processBankData(bank, html);

                    console.log(this.bankName, '==>', datas);
                    Common.sendBankLastUpdateDateTimeToWinner(bank);//回傳最後掃帳時間

                    datas.forEach((data) => {

                        if (Common.last7Pattern().test(data.text)) {
                            data.last7 = Common.last7Pattern().exec(data.text)[1].replace(/\r/g, '').replace(/\n/g, '')
                            Common.sendDataToWinner(
                                data.date                             // date:string
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

/*

$('div.cbx-form-wrap').find('table.x-grid3-row-table').each((index, element)=>{
    let table = $(element);
    let tds = table.find('td')
    tds = tds.filter((index, element)=>{
        return $(element).css('display') =='inline-block';
    });

    console.log(tds);
});

*/