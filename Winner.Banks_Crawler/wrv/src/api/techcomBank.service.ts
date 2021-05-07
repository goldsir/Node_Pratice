import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';
import * as cheerio from 'cheerio';

@Injectable()
export class TechcomBankService {// techcomBankService

    private bankName: string = "TechcomBank";

    constructor() { }

    public async openBank(bank: Bank) {

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();

        // 轉英文
        let eng = await driver.wait(until.elementLocated(By.css('#qw_top_brc > li:nth-child(1) > a')), 10000);
        await eng.click();

        //填帳號、密碼，然後登入
        await this.autoAccount_PW(driver, bank);

        //啟動定時器
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

        let selector_accountInput = '#signOnName';
        let selector_passwordInput = '#password';

        await this.setHTMLElementValue(driver, selector_accountInput, bank.LoginAccount);
        await this.setHTMLElementValue(driver, selector_passwordInput, bank.Password);

        let loginBtn = driver.wait(until.elementLocated(By.css('#qwfs_content > div:nth-child(6) > input')), 10000);
        await loginBtn.click();
    }
    private processBankData(bank: Bank, html) {

        let filePath = path.join(process.cwd(), 'dist', 'json', `${bank.BankName}_${bank.Account}.html`);
        fs.writeFile(
            filePath
            , html
            , 'utf-8'
            , function (err) {
            }
        );

        let datas = [];
        let $ = cheerio.load(html);
        let trs = $('tr');

        trs.each((index, element) => {

            let tds = $(element).find('td');
            let data: any = {};
            data.date = $(tds[0]).text().trim();
            data.desc = $(tds[1]).text().trim();
            data.money = $(tds[2]).text().trim();
            data.balance = $(tds[3]).text().trim();

            data.date = data.date.replace(/(\d\d)\/(\d\d)\/(\d\d\d\d)/, function (str, ...groups) {
                return `${groups[2]}-${groups[1]}-${groups[0]}`
            });

            data.money = data.money.replace(/,/g, '')
            data.money = Number(data.money);
            data.balance = data.balance.replace(/,/g, '')
            data.balance = Number(data.balance);
            datas.push(data);
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
                , JSON.stringify(datas)
                , 'utf-8'
                , function (err) {
                }
            );
        }

        console.log(datas);

        return datas;

    }

    private async keepGoing(driver, bank) {

        let isInAccounts = false;
        let is3Month = false;

        let interval = setInterval(async () => {
            try {
                if (isInAccounts == false) {
                    let accounts = await driver.wait(until.elementLocated(By.css('#qw_top_ul_menu > li:nth-child(2) > a')), 10000);
                    await accounts.click();
                    isInAccounts = true;

                }
                else {

                    let _monthRadio = await driver.executeScript(`return document.querySelectorAll("input[id='radio:tab1:QUICK.SEARCH.1']")[2]`);
                    await _monthRadio.click();

                    await Common.Delay(5);

                    let viewBtn = await driver.wait(until.elementLocated(By.css('#goButton > tbody > tr > td > table > tbody > tr > td:nth-child(1) > a')), 10000)
                    await viewBtn.click();


                    await Common.Delay(5);
                    let html = await driver.executeScript(`return document.querySelector('table.enquirydata.wrap_words').outerHTML`);

                    let datas = this.processBankData(bank, html);
                    console.log(this.bankName, '==>', datas);
                    Common.sendBankLastUpdateDateTimeToWinner(bank);

                    datas.forEach((data) => {

                        if (Common.last7Pattern().test(data.desc)) {
                            data.last7 = Common.last7Pattern().exec(data.desc)[1].replace(/\r/g, '').replace(/\n/g, '')

                            Common.sendDataToWinner(
                                data.date                             // date:string
                                , ""                                  // bankName: string
                                , ""                                  // bankNumber: string
                                , data.last7                          // mark:string
                                , data.money                          // amount: string
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
                if (/chrome not reachable/.test(err.message)) {
                    clearInterval(interval);
                    console.log(interval + '-- cleared');
                }
                isInAccounts = false;

            }
        }, 30 * 1000);
    }
}