import { Controller, Get, Req, Res, Post, HttpStatus, Body, Param } from '@nestjs/common';
import { Common } from '../util/common';
import * as path from 'path';
import * as fs from 'fs';
import { AbcChinaBankService } from './abcChinaBank.service';
import { CmbcBankService } from './cmbcBank.service'
import { PBankService } from './pBank.service';
import { CITICBankService } from './citicBank.service'
import { ICBCBankService } from './icbcBank.service';


@Controller('/api/banks')
export class BanksController {

    constructor(
        private readonly abcChinaBankService: AbcChinaBankService
        , private readonly cmbcBankService: CmbcBankService
        , private readonly pBankService: PBankService
        , private readonly citicBankService: CITICBankService
        , private readonly icbcBankService: ICBCBankService
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
                , resultText: '无此银行资料'
            });
        }

        let driver = null;

        switch (params.BankName) {
            case 'AbcChinaBank':
                this.abcChinaBankService.openBank(bank); // 中国农业银行(没资料洗)
                break;
            case 'CmbcBank':
                this.cmbcBankService.openBank(bank); // 中国民生银行
                break;
            case 'PBank':
                this.pBankService.openBank(bank); // 交通银行(没资料)
                break;
            case 'ICBCBank':
                this.icbcBankService.openBank(bank); // 工商银行(ipconfig /flushdns)
                break;
            case 'CITCBank':
                this.citicBankService.openBank(bank); // 中信银行
                break;
            default:
                return res.json({
                    resultCode: 1
                    , resultText: '没有对应的银行处理函式'
                });
        }

        return res.json({
            resultCode: 0
            , resultMessage: '开网银中'
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

        //find() 方法会回传第一个满足所提供之测试函式的元素值。否则回传 undefined。
        let exists = banks.find((item) => {
            return item.BankName === body.BankName &&
                item.LoginAccount === body.LoginAccount
        });

        //不存在此项，则新增
        if (exists === undefined) {
            banks.push(body)
        }
        else {
            //find回传的是参考，是指向阵列内原本的元素，可以直接改
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