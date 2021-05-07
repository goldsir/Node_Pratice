import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { BanksController } from './api/banks.controller';
import { AbcChinaBankService } from './api/abcChinaBank.service'
import { CmbcBankService } from './api/cmbcBank.service'
import { PBankService } from './api/pBank.service';
import { ICBCBankService } from './api/icbcBank.service';
import { CITICBankService } from './api/citicBank.service'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public')
      , serveRoot: "/public"
    })
  ],
  controllers: [AppController, BanksController],
  providers: [
    AppService
    , AbcChinaBankService // 農業銀行
    , CmbcBankService     // 民生銀行
    , PBankService        // 交通銀行
    , ICBCBankService     // 工商銀行 愛存不存
    , CITICBankService    // 中信銀行
  ],
})
export class AppModule { }
