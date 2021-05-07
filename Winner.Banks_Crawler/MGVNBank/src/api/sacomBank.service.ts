import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Common } from 'src/util/common';
import * as cheerio from 'cheerio';

@Injectable()
export class SacomBankService {// techcomBankService

    private bankName: string = "SacomBank";

    constructor() {

    }

    public async openBank(bank: Bank) {

        let bankURI = await Common.getBankURI(bank.BankName);
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.get(bankURI);
        await driver.manage().window().maximize();

        // 轉英文
        let eng = await driver.wait(until.elementLocated(By.css('#HREF_LOAD2')), 10000);
        eng.click();

        //填帳號、密碼，然後登入
        try {
            await this.autoAccount_PW(driver, bank);
        }
        catch (err) {
            // 不理你了，反正想辦法登入就對了
        }

    }

    private async autoAccount_PW(driver, bank) {

        let { LoginAccount, Password } = bank;

        let selector_accountInput = 'AuthenticationFG.USER_PRINCIPAL';
        let selector_passwordInput = 'AuthenticationFG.ACCESS_CODE';
        let selector_confirmCheckbox = 'AuthenticationFG.TARGET_CHECKBOX';

        //輸入帳號
        await driver.wait(until.elementLocated(By.id(selector_accountInput)), 100000);
        await driver.executeScript(`let acc = document.getElementById('${selector_accountInput}'); acc.value='${LoginAccount}';acc.placeHolder='placeholder';`);
        await Common.Delay(10); // 10秒內完成數字認證碼

        //輸入密碼
        // document.getElementById('AuthenticationFG\.ACCESS_CODE').value='Trong123';
        await driver.executeScript(`let pw=document.getElementById('${selector_passwordInput}');pw.value='${Password}';pw.placeholder=''`);

        //document.getElementById('AuthenticationFG.TARGET_CHECKBOX').checked=true

        await driver.wait(until.elementLocated(By.id(selector_confirmCheckbox)), 100000);
        await driver.executeScript(`document.getElementById('AuthenticationFG.TARGET_CHECKBOX').checked=true`);

        //login click        
        let loginBtn = await driver.wait(until.elementLocated(By.id('VALIDATE_STU_CREDENTIALS_UX')), 10000);
        loginBtn.click();


        //啟動定時器
        this.keepGoing(driver, bank);

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
        let tbodys = $('tbody.listrowwrapper');
        tbodys.each((index, element) => {

            let data: any = {};
            let tds = $(element).find('td');
            data.TransactionId = $(tds[0]).text().replace(/\n/g, "").trim();
            data.TrsnsactionDate = $(tds[1]).text().replace(/\n/g, "").replace('                    ', ' ').trim();
            data.text = $(tds[3]).text().replace(/\n/g, "").replace('                    ', ' ').trim();
            data.Debit = $(tds[5]).text().replace(/\n/g, "").trim();
            data.Credit = $(tds[6]).text().replace(/\n/g, "").trim();  // 入款

            if (data.Debit === '') {
                data.money = data.Credit;
            }
            else {
                data.money = '-'+data.Debit;
            }
            
            // 去 . 越南盾的 . 是千位分隔符
            data.money = data.money.replace(/\./g, '');
    
            let date = data.TrsnsactionDate.split(' ');
            let data_yyyyMMdd = date[0];
            let date_hhmmss = date[1];

            data_yyyyMMdd = data_yyyyMMdd.replace(/(\d\d)-(\d\d)-(\d\d\d\d)/, function (str, ...groups) {
                return `${groups[2]}-${groups[1]}-${groups[0]}`
            });
            data.TrsnsactionDate = `${data_yyyyMMdd} ${date_hhmmss}`;
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

        let isInAccounts = false;

        let interval = setInterval(async () => {
            try {
                if (isInAccounts == false) {

                    //#ID_RACTS
                    await driver.executeScript(`document.getElementById('Accounts--Cards_Account-Summary').click();`);
                    await Common.Delay(5);

                    //還要再點一下帳戶
                    //#HREF_PageConfigurationMaster_RACCTSW__1:AccountSummaryFG.OPR_ACCOUNT_NUMBER_ARRAY[0]
                    await driver.executeScript(`document.getElementById('HREF_PageConfigurationMaster_RACCTSW__1:AccountSummaryFG.OPR_ACCOUNT_NUMBER_ARRAY[0]').click();`);
                    await Common.Delay(5);
                    isInAccounts = true;
                }
                else {

                    // (date dd-MM-yyyy) from #PageConfigurationMaster_RACCTSW__1\:TransactionHistoryFG\.FROM_TXN_DATE
                    // (date dd-MM-yyyy) to   #PageConfigurationMaster_RACCTSW__1\:TransactionHistoryFG\.TO_TXN_DATE
                    console.log('isInAccounts = true ................');

                    //let searchBtn = await driver.wait(until.elementLocated(By.id('PageConfigurationMaster_RACCTSW__1:searchHeader')), 10000);
                    //searchBtn.click();

                    let from = moment().subtract(90, 'days').format('DD-MM-YYYY');
                    let to = moment().format('DD-MM-YYYY');

                    //日期:開始
                    await driver.executeScript(`document.getElementById('PageConfigurationMaster_RACCTSW__1:TransactionHistoryFG.FROM_TXN_DATE').value = '${from}';`);
                    //日期:結束
                    await driver.executeScript(`document.getElementById('PageConfigurationMaster_RACCTSW__1:TransactionHistoryFG.TO_TXN_DATE').value = '${to}';`);
                    //SEARCH BTN: input[id="PageConfigurationMaster_RACCTSW__1:SEARCH"]
                    await driver.executeScript(`document.getElementById('PageConfigurationMaster_RACCTSW__1:SEARCH').click();`);

                    await Common.Delay(10);

                    // 最新一頁的頁次
                    let pagelabelSelector = 'label.simple-text.pagination-status';
                    let pageLabel = await driver.wait(until.elementLocated(By.css(pagelabelSelector)), 100000);
                    let pageTextContent = await pageLabel.getAttribute('textContent');
                    let pageSize = 10 // 預設就是一頁10筆
                    let maxCounts = Number(pageTextContent.match(/\d{1,}$/)[0]);


                    let totalPage = 0;
                    if (maxCounts % pageSize === 0) {
                        totalPage = maxCounts / pageSize;
                    }
                    else {
                        totalPage = Math.floor(maxCounts / pageSize);  //除法記得有不能整除問題
                        totalPage = totalPage + 1;
                    }

                    console.log('maxCounts =', maxCounts, 'totalPage = ', totalPage);

                    await driver.executeScript(`document.getElementById('PageConfigurationMaster_RACCTSW__1:TransactionHistoryFG.OpTransactionListing_REQUESTED_PAGE_NUMBER').value='${totalPage}';`);
                    await driver.executeScript(`document.getElementById('PageConfigurationMaster_RACCTSW__1:Action.OpTransactionListing.GOTO_PAGE__').click()`);
                    //舊的元素資料還在，要等頁面刷
                    await Common.Delay(6);


                    // table: document.getElementById('HWListTable5134192').outerHTML;
                    let html = await driver.wait(until.elementLocated(By.css(`[id="HWListTable5134192"]`)), 10000).getAttribute('outerHTML');
                    let datas = this.processBankData(bank, html);

                    //console.log(this.bankName, '==>', datas);
                    Common.sendBankLastUpdateDateTimeToWinner(bank);

                    datas.forEach((data) => {

                        if (Common.last5Pattern().test(data.text)) {
                            data.last5 = Common.last5Pattern().exec(data.text)[1].replace(/\r/g, '').replace(/\n/g, '')
                            console.log(data);
                            Common.sendDataToWinner(
                                data.TrsnsactionDate                  // date:string
                                , ""                                  // bankName: string
                                , ""                                  // bankNumber: string
                                , data.last5                          // mark:string
                                , data.money                          // amount: string
                                , data.TransactionId                  // balance: string
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