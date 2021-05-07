import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until, Actions } from 'selenium-webdriver';
import { Common } from 'src/util/common';
import * as cheerio from 'cheerio';

@Injectable()
export class VietcomBankService {

    private bankName: string = "VietcomBank";

    constructor() { }

    public async openBank(bank: Bank) {

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();

        let eng = await driver.wait(until.elementLocated(By.xpath('//*[@id="maincontent"]/ng-component/div[1]/div/footer/div/div[2]/div/div[2]/a/div/span')), 10000);
        await eng.click();


        try {
            let username = await driver.wait(until.elementLocated(By.id('username')), 10000);
            let password = await driver.wait(until.elementLocated(By.xpath('//*[@id="maincontent"]/ng-component/div[1]/div/div[3]/div/div/div/div/div/div[4]/form[1]/div/div[2]/div/div[1]/input')), 10000);
            await username.sendKeys(bank.LoginAccount);
            await password.sendKeys(bank.Password);
        } catch (error) {
            console.log(error);

        };


        this.keepGoing(driver, bank);
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

    private dateResort(date) {
        let dateArray = date.split('/');
        return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
    }

    private processBankData(bank: Bank, html) {

        let $ = cheerio.load(html);

        let divInfos = $('div.list-info-item > div.table');

        let datas = [];

        divInfos.each((index, div) => {

            let date = $(div).find('div.list-info-txt-sub.color-white-3').eq(0).text().trim();
            let referenceNumber = $(div).find('div.list-info-txt-sub.color-white-3').eq(1).text().trim();
            let text = $(div).find('div.list-info-txt-main.color-white').text().trim();
            let money = $(div).find('div.list-info-txt-main.color-green').text().trim();
            let money2 = money.replace(/[+VND, ]/g, '');

            date = this.dateResort(date);
            referenceNumber = referenceNumber.replace('Reference number: ', '').replace(/ /g, '');
            console.log(text);

            datas.push({
                "date": date
                , "transId": referenceNumber
                , "text": text
                , "money": money
                , "money2": money2
            })
        });

        console.log(datas);

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

        let interval = setInterval(async () => {

            try {
                // details: 
                let details = await driver.wait(until.elementLocated(By.xpath('//*[@id="maincontent"]/ng-component/div/div[4]/div[2]/div[1]/div[1]/div/div[2]/a')), 10000);
                await details.click();
                await Common.Delay(1);

                let detailsLook = await driver.wait(until.elementLocated(By.xpath('//*[@id="maincontent"]/ng-component/div/div[5]/ng-component/div/div/div[2]/div/div/div[2]/div[2]/a/div[2]')), 10000);
                await detailsLook.click();
                await Common.Delay(5);


                // 打開日期下拉       
                let dateCombobox = await driver.wait(until.elementLocated(By.xpath('//*[@id="ChiTietTaiKhoan"]/div/div/div[6]/div[1]/div/div/app-select2-common/ng-select2/span/span[1]/span')), 10000);
                let actions = driver.actions();
                await actions
                    .click(dateCombobox)
                    .keyDown(Key.DOWN)
                    .keyDown(Key.DOWN)
                    .keyDown(Key.RETURN)
                    .perform();

                // 查資料  
                let searchBtn = await driver.wait(until.elementLocated(By.xpath('//*[@id="ChiTietTaiKhoan"]/div/div/div[7]/div/div[2]/div/a/span')), 10000);
                await searchBtn.click();
                await Common.Delay(3);

                // Cash in (只看匯入的)
                await driver.executeScript(`document.querySelectorAll('a[href="#vao"]')[0].click()`);
                await Common.Delay(1);

                let html = await driver.executeScript(`return document.querySelector('div#vao').outerHTML`);
                console.log(html);

                let datas = this.processBankData(bank, html);
                console.log(this.bankName, '==>', datas);
                Common.sendBankLastUpdateDateTimeToWinner(bank);//回傳最後掃帳時間

                datas.forEach((data) => {

                    if (Common.last7Pattern().test(data.text)) {
                        data.last7 = Common.last7Pattern().exec(data.text)[1].replace(/\r/g, '').replace(/\n/g, '')
                        console.log('調用api: ', data);

                        Common.sendDataToWinner(
                            data.date                             // date:string
                            , ""                                  // bankName: string
                            , ""                                  // bankNumber: string
                            , data.last7                          // mark:string
                            , data.money2                         // amount: string
                            , data.transId                        // balance: string
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
        }, 20 * 1000);
    }
}