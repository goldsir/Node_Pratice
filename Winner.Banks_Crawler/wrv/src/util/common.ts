import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
import * as request from 'request';
import { BanksController } from 'src/api/banks.controller';
import * as moment from 'moment';

export class Common {
    static Formatter_Moment_0 = "YYYY-MM-DD";
    static WinnerAPIBase = 'https://wbet9.net/Japi'

    // 煩，這個還可能會變
    static last7Pattern() {
        return /A(\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*)A/;
    }

    static MD5(plaintext): string {
        const cipher = crypto.createHash('md5');
        let md5 = cipher.update(plaintext, 'utf8').digest("hex");
        return md5;
    }

    static getDateStr_FromDate(timestamp): string {
        let time = new Date(timestamp);
        let year = time.getFullYear();
        let month = String(time.getMonth() + 1); // month value: 0(一月) ~ 11(十二月)
        let date = String(time.getDate());
        let hour = String(time.getHours());
        let min = String(time.getMinutes());
        let second = String(time.getSeconds());

        if (Number.parseInt(month) < 10) {
            month = `0${month}`;
        }

        if (Number.parseInt(date) < 10) {
            date = `0${date}`;
        }

        if (Number.parseInt(hour) < 10) {
            hour = `0${hour}`;
        }

        if (Number.parseInt(min) < 10) {
            min = `0${min}`;
        }

        if (Number.parseInt(second) < 10) {
            second = `0${second}`;
        }

        return `${year}-${month}-${date} ${hour}:${min}:${second}`;
    }


    //把一天的時間單位按N分鐘切分出 start~end  
    static dateSplitByMin(date: string, min: number): Array<{ start: string, end: string }> {
        // date 是一個 yyyy-MM-dd 的字串
        let y = date.slice(0, 4); //不含end
        let m = date.slice(5, 7);
        let d = date.slice(8, 10);

        let count = (24 * 60) / min; // 算出一天全部有多少分鐘，再除掉min，得到迴圈計數器(以秒為單位)

        let list = [];
        for (let i = 0; i < count; i++) {
            // new Date(year, month, day, hour, minutes, seconds, milliseconds);
            let year = parseInt(y, 10);
            let month = parseInt(m, 10);
            let day = parseInt(d, 10);

            let start = new Date(year, month - 1, day, 0, 0, 0, 0);
            let end = new Date(year, month - 1, day, 0, 0, 0, 0);

            start.setSeconds(start.getSeconds() + i * min * 60); // setSeconds 沒傳回新的實例哦
            end.setSeconds(end.getSeconds() + (i + 1) * min * 60 - 1); // setSeconds 沒傳回新的實例哦

            list.push({
                start: this.getDateStr_FromDate(start),
                end: this.getDateStr_FromDate(end)
            });
        }

        return list;
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
        /*
        formData = formData || {
            'BankName': 'MBBank',
            'BankNumber': '8280103302007',
            'PayName': 'LÊ THỊ MINH PHƯƠNG',
            'Date': '2020-04-22 16:15:25'
        };
        */

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
        , mark: string
        , amount: string
        , balance: string
        , adminBankName: string
        , adminBankNumber: string
    ) {

        /*
         銀行轉帳API文件.docx
            https://drive.google.com/drive/folders/1oQUbtpfTPPzW7375KRL7Gc9Oy34rxsSf

            POST https://wbet9.net/Japi/RemitMoney
            API ID = WRVBank
            私鑰    = EA165BCDF8533QD12        
        */

        // date = date || "";
        // bankName = bankName || "";
        // bankNumber = bankNumber || "";
        // mark = mark || "";
        // amount = amount || "";
        // balance = balance || "";

        let url = `${this.WinnerAPIBase}/RemitMoney`
        let APIID = 'WRVBank';
        let key = 'EA165BCDF8533QD12';
        let vCode = this.MD5(
            APIID
            + date
            + bankName
            + bankNumber
            + mark
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
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'APIId': APIID,
                'Date': date,
                'BankName': bankName,
                'BankNumber': bankNumber,
                'Mark': mark,
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