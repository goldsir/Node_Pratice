import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
import * as request from 'request';
import { BanksController } from 'src/api/banks.controller';
import * as moment from 'moment';

export class Common {
    static Formatter_Moment_0 = "YYYY-MM-DD";
    static WinnerAPIBase = 'https://www.xz175.com/Japi'

    static MD5(plaintext): string {
        const cipher = crypto.createHash('md5');
        let md5 = cipher.update(plaintext, 'utf8').digest("hex");
        return md5;
    }

    static async getBanks(): Promise<Bank[]> {

        let banksFilePath = path.join(process.cwd(), 'dist', 'json', 'banks.json');
        let banks = await Common.readFile(banksFilePath);
        return JSON.parse(banks);
    }

    static async getBankURI(bankName): Promise<string> {

        let bankURIFilePath = path.join(process.cwd(), 'dist', 'json', 'bankURI.json');
        let bankURI = await Common.readFile(bankURIFilePath);
        bankURI = JSON.parse(bankURI);
        return bankURI[bankName] === undefined ? "" : bankURI[bankName];
    }


    static readFile(filePath: string): Promise<string> {

        return new Promise<string>((resolve, reject) => {

            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    console.log('讀取檔案錯誤，返回""', err);
                    return resolve('');
                }
                resolve(data);
            })
        });
    }

    // 延遲
    static Delay(seconds: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('');
            }, seconds * 1000);
        });
    }

    static sendBankLastUpdateDateTimeToWinner(bank: Bank) {

        return;  // api沒開

        var options = {
            'method': 'POST',
            'url': `${this.WinnerAPIBase}/ping`,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                "BankName": bank.BankName,
                "BankNumber": bank.Account,
                "PayName": bank.UserName,
                "Date": moment().format('YYYY-MM-DD hh:mm:ss')
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });
    }

    static sendDataToWinner(
        date: string
        , bankName: string
        , bankNumber: string
        , amount: string
        , balance: string
        , adminBankName: string
        , adminBankNumber: string
    ) {

        let url = `${this.WinnerAPIBase}/RemitMoney`
        let APIID = 'WRCBank';
        let key = 'EA165BCDF8533QD12';

        let vCode = this.MD5(
            APIID
            + date
            + bankName
            + bankNumber
            + amount
            + balance
            + adminBankName
            + adminBankNumber
            + key
        );

        var options = {
            'method': 'POST',
            'url': url,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            form: {
                'APIId': APIID,
                'Date': date,
                'BankName': bankName,
                'BankNumber': bankNumber,
                'Amount': amount,
                'Balance': balance,
                'AdminBankName': adminBankName,
                'AdminBankNumber': adminBankNumber,
                'VCode': vCode
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                return console.log(error);
            }
            console.log(body);
        });
    };
}