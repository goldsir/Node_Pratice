import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BanksController } from './api/banks.controller';
import { VietcomBankService } from './api/vietcomBank.service';
import { ACBBankService } from './api/acbBank.service';
import { BIDVBankService } from './api/bidvBank.service';
import { TechcomBankService } from './api/techcomBank.service';
import { SacomBankService } from './api/sacomBank.service';
import { TPBankService } from './api/tpBank.service';
import { VietinBankService } from './api/vietinBank.service';

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
    , VietcomBankService
    , ACBBankService
    , TechcomBankService
    , SacomBankService
    , BIDVBankService
    , TPBankService
    , VietinBankService
  ],
})
export class AppModule { }
