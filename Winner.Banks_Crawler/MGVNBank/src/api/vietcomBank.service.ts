import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';

@Injectable()
export class VietcomBankService {

    private bankName: string = "VietcomBank";

    constructor() { }

    public async openBank(bank: Bank) {

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();

        // #linkLanguage
        let eng = await driver.wait(until.elementLocated(By.css('#linkLanguage')), 10000);
        await eng.click();

        this.autoAccount_PW(driver, bank);
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

        let { LoginAccount, Password } = bank;
        let selector_accountInput = '#LoginForm > div:nth-child(2) > input';
        let selector_passwordInput = '#LoginForm > div:nth-child(3) > input';

        this.setHTMLElementValue(driver, selector_accountInput, bank.LoginAccount);
        this.setHTMLElementValue(driver, selector_passwordInput, bank.Password);
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

    private processBankData(bank: Bank, dirtyData) {

        let allTRs = this.regAllExec(/<tr class="fix-tr">([\s\S]*?)<\/tr>/g, dirtyData)
        let datas = [];

        for (let trContent of allTRs) {

            //每個tr裡面有5個td要抓出來
            //console.log(trContent[1])

            //JS的正則表達式有雷，重複用會有lastIndex要歸0的問題
            let tds = this.regAllExec(/<td[^>]*>(.*?)<\/td>/g, trContent[1]);

            let data: any = {};
            try {
                data.date = tds[0][1];
                data.transId = tds[1][1];
                data.transId = data.transId.replace(/\s*/, '')
                data.plusOrSubtract = tds[2][1];
                data.money = tds[3][1];
                data.money2 = Number(data.plusOrSubtract + data.money.replace(/,/g, ''));
                data.text = tds[4][1];
                datas.push(data);

            } catch (err) {
                console.log(tds);
            }
            console.log(JSON.stringify(data) + '\r\n')
        }

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

        return datas;
    }

    private async keepGoing(driver, bank) {

        //帳戶列表
        let selector_accountList = '#fullSite > div.full-content.body-ctn > div.full-content.body-ct > div.left-content > div > div:nth-child(1) > ul > li:nth-child(1) > span > a';
        //帳戶列表-> ViewDetails
        let selector_viewDetails = '#FormDanhSachTaiKhoan > div > div.content > div > div.control-group.form-submit > div > button';
        //帳戶列表-> ViewDetails-> View
        let selector_view = 'btnxemsaoke';

        let selector_dataTable = '#tableGiaoDich > table:nth-child(5)'

        let switchFlag = false;

        let interval = setInterval(async () => {

            try {

                if (switchFlag === false) {

                    let accountList = await driver.wait(until.elementLocated(By.css(selector_accountList)), 10000);
                    await accountList.click();

                    let viewDetails = await driver.wait(until.elementLocated(By.css(selector_viewDetails)), 10000);
                    await viewDetails.click();

                    switchFlag = true;
                }
                else {

                    await driver.executeScript(`document.getElementById('${selector_view}').click()`);
                    let tabData = await driver.findElement(By.css(selector_dataTable)).getAttribute('innerHTML');

                    let datas = this.processBankData(bank, tabData);

                    console.log(this.bankName, '==>', datas);
                    Common.sendBankLastUpdateDateTimeToWinner(bank);//回傳最後掃帳時間

                    datas.forEach((data) => {
                        //有 #12345#格式才要處理
                        if (Common.last5Pattern().test(data.text)) {
                            data.last5 = Common.last5Pattern().exec(data.text)[1].replace(/\r/g, '').replace(/\n/g, '')
                            console.log('調用api: ', data);

                            Common.sendDataToWinner(
                                data.date                             // date:string
                                , ""                                  // bankName: string
                                , ""                                  // bankNumber: string
                                , data.last5                          // mark:string
                                , data.money2                         // amount: string
                                , data.transId                        // balance: string
                                , bank.BankName                       // adminBankName: string
                                , bank.Account                        // adminBankNumber: string
                            )
                        }
                    });
                }
            }
            catch (err) {
                switchFlag = false;
                console.log(err.message);
                if (/chrome not reachable/.test(err.message)) {
                    clearInterval(interval);
                    console.log(interval + '-- cleared');
                }
            }
        }, 30 * 1000);
    }
}