import { Controller, Get, Req, Res, Post, HttpStatus, Body, Param } from '@nestjs/common';
import { Common } from '../util/common';
import * as path from 'path';
import * as fs from 'fs';
import { VietcomBankService } from './vietcomBank.service';
import { ACBBankService } from './acbBank.service';
import { BIDVBankService } from './bidvBank.service';
import { TechcomBankService } from './techcomBank.service';
import { SacomBankService } from './sacomBank.service';

@Controller('/api/banks')
export class BanksController {

    constructor(
        private readonly vietcomBankService: VietcomBankService
        , private readonly acbBankService: ACBBankService
        , private readonly bidvBankService: BIDVBankService
        , private readonly techcomBankService: TechcomBankService
        , private readonly sacomBankService: SacomBankService
    ) {

    }

    @Get('/open/:BankName/:UserName/:LoginAccount')
    async open(@Req() req, @Res() res, @Param() params: Bank) {

        let banks = await Common.getBanks();
        let bank = banks.find(b => {
            return b.BankName === params.BankName
                && b.LoginAccount === params.LoginAccount
        });

        if (bank === undefined) {
            return res.json({
                resultCode: 1
                , resultText: '無此銀行資料'
            });
        }

        let driver = null;

        switch (params.BankName) {
            case 'VietcomBank':
                // vietcomBankService.ts
                this.vietcomBankService.openBank(bank);
                break;
            case 'ACBBank':
                this.acbBankService.openBank(bank);
                break;
            case 'BIDVBank':
                this.bidvBankService.openBank(bank);
                break;
            case 'SacomBank':
                this.sacomBankService.openBank(bank);
                break;
            case 'TechcomBank':
                this.techcomBankService.openBank(bank);
                break;
            default:
                return res.json({
                    resultCode: 1
                    , resultText: '沒有對應的銀行處理函式'
                });
        }

        return res.json({
            resultCode: 0
            , resultMessage: '開網銀中'
        });
    }

    @Get('/list')
    async bankList() {
        let filePath = path.join(process.cwd(), 'dist', 'json', 'banks.json');
        let json = await Common.readFile(filePath)
        return json;
    }

    @Post('/add')
    async addBank(@Req() req, @Res() res, @Body() body: Bank) {

        let filePath = path.join(process.cwd(), 'dist', 'json', 'banks.json');
        let _filePath = path.join(process.cwd(), 'src', 'json', 'banks.json');
        let banks: Bank[] = JSON.parse(await Common.readFile(filePath));

        //find() 方法會回傳第一個滿足所提供之測試函式的元素值。否則回傳 undefined。
        let exists = banks.find((item) => {
            return item.BankName === body.BankName &&
                item.LoginAccount === body.LoginAccount
        });

        //不存在此項，則新增
        if (exists === undefined) {
            banks.push(body)
        }
        else {
            //find回傳的是參考，是指向陣列內原本的元素，可以直接改
            exists = body;
        }

        banks = banks.sort((a, b) => {
            let keyA = a.UserName + a.BankName;
            let keyB = b.UserName + b.BankName;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        fs.writeFile(filePath, JSON.stringify(banks), function (err) {
            if (err) {
                console.error(err);
            }
        });

        fs.writeFile(_filePath, JSON.stringify(banks), function (err) {
            if (err) {
                console.error(err);
            }
        });

        res.status(HttpStatus.OK).json({
            "ResultCode": 0
            , "ResultText": 'OK'
            , "data": banks
        });
    }
}