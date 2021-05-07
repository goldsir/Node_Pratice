import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jCopy } from './util/jCopy';


import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

/*
  __dirname     實際上不是一個全局變量，而是每個模塊內部的。
  __dirname:    C:\Users\USER\Desktop\Winner.Banks_Crawler\wrv\dist
  process.cwd() C:\Users\USER\Desktop\Winner.Banks_Crawler\wrv
*/

// 慘: 要找時間去練一下自動化工具
/*
jCopy(
  path.join(process.cwd(), 'src', 'public')
  , path.join(process.cwd(), 'dist', 'public')
);
*/

/*
  jCopy(
    path.join(process.cwd(), 'dist', 'json')
    , path.join(process.cwd(), 'src', 'json') // 反過來好了，dist的才是線上用的，把dist丟回src備份
  );


  jCopy(
    path.join(process.cwd(), 'dist', 'public')
    , path.join(process.cwd(), 'src', 'public')
  );
*/

const title = `${String.fromCharCode(27)}]0;WRV - 銀行爬蟲${String.fromCharCode(7)}`;
process.stdout.write(title);