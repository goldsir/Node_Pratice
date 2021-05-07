import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

import * as path from 'path';
import { Common } from './util/common';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {

  }

  @Get()
  index(@Res() res) {
    res.status(302).redirect('/public/Index.html');
  }



}
