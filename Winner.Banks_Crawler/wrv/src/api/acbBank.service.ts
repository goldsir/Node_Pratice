import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';

@Injectable()
export class ACBBankService {
    private bankName: string = "ACBBank";

    constructor() {

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
    public async openBank(bank: Bank) {
        let driver = await new Builder().forBrowser('chrome').build();

        let bankURI = await Common.getBankURI(bank.BankName);
        await driver.get(bankURI);
        await driver.manage().window().maximize();

        //切個英文比較有機會看得懂
        let eng = await driver.wait(until.elementLocated(By.xpath('//*[@id="wrapper"]/div/div[2]/div[1]/div[2]/a[4]')), 10000);
        await eng.click();

        this.autoAccount_PW(driver, bank);
        this.keepGoing(driver, bank);

    }

    private async autoAccount_PW(driver, bank) {

        let selector_accountInput = '#user-user';
        let _selector_accountInput = '#user-clear';
        let selector_passwordInput = '#password-password';
        let _selector_passwordInput = '#password-clear';


        let gotoLogin = await driver.wait(until.elementLocated(By.xpath('//*[@id="wrapper"]/div/div[2]/div[2]/div[1]/div[1]/a')), 10000);
        await gotoLogin.click();

        await driver.wait(until.elementLocated(By.css(selector_accountInput)), 10000);
        await driver.wait(until.elementLocated(By.css(selector_passwordInput)), 10000);

        await this.setHTMLElementValue(driver, selector_accountInput, bank.LoginAccount);
        await this.setHTMLElementValue(driver, selector_passwordInput, bank.Password);
        await this.setHTMLElementValue(driver, _selector_accountInput, bank.LoginAccount);
        await this.setHTMLElementValue(driver, _selector_passwordInput, bank.Password);
    }

    private async keepGoing(driver, bank) {

        let switchFlag = false;

        let interval = setInterval(async () => {

            try {

                if (switchFlag === false) {

                    let account = await driver.wait(until.elementLocated(By.xpath('//*[@id="table"]/tbody/tr[2]/td[1]/a')), 10000);
                    await account.click();
                    switchFlag = true;
                }
                else {

                    //let view = await driver.wait(until.elementLocated(By.xpath('//*[@id="wrapper"]/div/div[2]/div[2]/table/tbody/tr[5]/td/table/tbody/tr/td[1]/table/tbody/tr[4]/td/span/input[2]')), 10000);
                    //await view.click();

                    await driver.executeScript(`SubmitByMonth()`);
                    await Common.Delay(6);

                    let tabData = await driver.executeScript(`return document.getElementById('table1').innerHTML`);
                    let datas = this.processBankData(bank, tabData);

                    console.log(this.bankName, '==>', datas);
                    Common.sendBankLastUpdateDateTimeToWinner(bank);//回傳最後掃帳時間

                    datas.forEach((data) => {
                        if (Common.last7Pattern().test(data.Description)) {

                            data.last7 = Common.last7Pattern().exec(data.Description)[1].replace(/\r/g, '').replace(/\n/g, '')
                            data.Date = new Date().getFullYear() + '-' + data.Date.split('-')[0] + '-' + data.Date.split('-')[1];

                            Common.sendDataToWinner(
                                data.Date                             // date:string
                                , ""                                  // bankName: string
                                , ""                                  // bankNumber: string
                                , data.last7                          // mark:string
                                , data.Money                          // amount: string
                                , data.Blance                         // balance: string
                                , bank.BankName                       // adminBankName: string
                                , bank.Account                        // adminBankNumber: string
                            )
                        }
                    });
                }
            }
            catch (err) {
                console.log(err.message);
                if (/chrome not reachable/.test(err.message)) {
                    clearInterval(interval);
                    console.log(interval + '-- cleared');
                    switchFlag = false;
                }
            }
        }, 30 * 1000);

    }
    private processBankData(bank: Bank, dirtyData): any[] {
        //dirtyData = await pReadFile('./ACBBankData.txt');

        //稍微洗乾淨一點
        dirtyData = dirtyData
            .replace(/<!--[\s\S]*?-->/g, '\n    ')
            .replace(/&nbsp;/g, '')
            .replace(/<div class="td_desc">/g, '')
            .replace(/<\/div>/g, '')
            .replace(/<tr class="table-style tr-header">[\s\S]*?<\/tr>/g, '')
            ;

        //console.log(dirtyData);

        let allTRs = this.regAllExec(/<tr[^>]*?>([\s\S]*?)<\/tr>/g, dirtyData)
        let datas: any[] = [];
        for (let trContent of allTRs) {
            let tds = this.regAllExec(/<td[^>]*>(.*?)<\/td>/g, trContent[1]);
            let data: any = {};

            try {
                data.Date = tds[0][1];
                data.TransactionNumber = tds[1][1];
                data.Description = tds[2][1];
                data.Debit = tds[3][1];
                data.Credit = tds[4][1];
                data.Blance = tds[5][1];

                data.Debit = data.Debit.replace(/,/g, '');
                data.Credit = data.Credit.replace(/,/g, '');
                data.Blance = data.Blance.replace(/,/g, '');

                if (data.Debit == '') {//
                    data.Money = Number(data.Credit);
                } else {
                    data.Money = Number(data.Debit) * -1;
                }

                datas.push(data);


            } catch (err) {
                console.log(tds);
            }
        }

        let filePath = path.join(process.cwd(), 'dist', 'json', `${bank.BankName}_${bank.Account}.json`);
        if (datas != null && datas.length > 0) {
            let jResult = {
                "BankName": bank.BankName
                , "UserName": bank.UserName
                , "Account": bank.Account
                , "UpdateDateTime": moment().format('YYYY-MM-DD hh:mm:ss')
                , "Datas": datas
            }

            fs.writeFile(
                filePath
                , JSON.stringify(jResult)
                , 'utf-8'
                , function (err) {
                }
            );
        }
        //console.log(JSON.stringify(datas) + '\r\n');
        return datas;
    }

    private regAllExec(reg, str) {

        if (reg.global === false) {
            return reg.exec(str);
        }

        let result = [];
        let find = null;
        while (find = reg.exec(str)) {
            result.push(find);
        }
        return result;
    }
}